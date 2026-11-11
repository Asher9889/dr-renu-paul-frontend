"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Archive, Send, Trash2, Undo2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAdminBookError } from "../api/get-admin-book-error";
import { adminBooksContent } from "../content/admin-books-content";
import { useChangeAdminBookStatus } from "../hooks/use-change-admin-book-status";
import { useDeleteAdminBook } from "../hooks/use-delete-admin-book";
import { useSaveAdminBook } from "../hooks/use-save-admin-book";
import { buildBookPayload } from "../lib/build-book-payload";
import { getBookFormValues, getEmptyBookFormValues } from "../lib/book-form-values";
import {
  getBookPublishIssues,
  isBookReadyToPublish,
  isReaderPrepared,
} from "../lib/publish-readiness";
import { slugify } from "../lib/slugify";
import { bookFormSchema, type BookFormValues } from "../schema/book-form.schema";
import type { AdminBookDetail, BookStatusAction } from "../types/book";
import { BookCoverField } from "./book-cover-field";
import { BookEbookField } from "./book-ebook-field";
import { BookProcessingPanel } from "./book-processing-panel";

type BookFormProps = {
  book?: AdminBookDetail;
};

const fieldNames = [
  "title",
  "slug",
  "subtitle",
  "author",
  "description",
  "category",
  "tags",
  "language",
  "totalPages",
  "freePreviewPages",
  "price",
  "currency",
  "cover",
  "ebook",
] as const;

export function BookForm({ book }: BookFormProps) {
  const copy = adminBooksContent.editor;
  const toasts = copy.toasts;
  const router = useRouter();
  const [currentBook, setCurrentBook] = useState<AdminBookDetail | null>(book ?? null);
  const [serverIssues, setServerIssues] = useState<Array<{ field: string; message: string }>>([]);

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: book ? getBookFormValues(book) : getEmptyBookFormValues(),
    mode: "onTouched",
  });

  const saveMutation = useSaveAdminBook();
  const statusMutation = useChangeAdminBookStatus();
  const deleteMutation = useDeleteAdminBook();
  const values = form.watch();
  const processing = currentBook?.processing ?? null;
  const readerPrepared = isReaderPrepared(processing);
  const readyToPublish = isBookReadyToPublish(values);
  const isPublished = currentBook?.status === "PUBLISHED";
  const isArchived = currentBook?.status === "ARCHIVED";
  const isBusy = saveMutation.isPending || statusMutation.isPending || deleteMutation.isPending;

  // The edit page polls while the worker renders pages. Keep status fresh
  // without resetting fields the editor is currently changing.
  useEffect(() => {
    if (!book) return;
    setCurrentBook(book);
    if (book.processing.status === "READY" && book.totalPages > 0) {
      form.setValue("totalPages", book.totalPages, { shouldDirty: false });
    }
  }, [book, form]);

  function applyServerError(error: unknown, fallback: string) {
    const parsed = getAdminBookError(error);
    setServerIssues(parsed.issues);
    for (const issue of parsed.issues) {
      if (fieldNames.includes(issue.field as (typeof fieldNames)[number])) {
        form.setError(issue.field as (typeof fieldNames)[number], { type: "server", message: issue.message });
      }
    }
    toast.error(fallback, { description: parsed.message });
  }

  function handleTitleChange(title: string, onChange: (value: string) => void) {
    const previousAutoSlug = slugify(form.getValues("title"));
    const currentSlug = form.getValues("slug");
    onChange(title);
    if (!currentBook && (!currentSlug || currentSlug === previousAutoSlug)) {
      form.setValue("slug", slugify(title).slice(0, 160).replace(/-+$/g, ""), {
        shouldDirty: true,
        shouldValidate: form.formState.isSubmitted,
      });
    }
  }

  async function submitForm(publish: boolean) {
    if (publish) {
      // The reader preparation check is applied after saving: a brand-new
      // upload is normally still queued at this point.
      const issues = getBookPublishIssues(values);
      if (issues.length > 0) {
        toast.error(copy.issuesTitle, { description: issues.join(" ") });
        return;
      }
    }

    setServerIssues([]);

    await form.handleSubmit(async (formValues) => {
      const payload = buildBookPayload(formValues);
      const wasCreating = !currentBook;
      let savedBook = currentBook;

      try {
        savedBook = await saveMutation.mutateAsync({ id: currentBook?.id, payload });
      } catch (error) {
        applyServerError(error, publish ? toasts.publishError : toasts.saveError);
        return;
      }

      setCurrentBook(savedBook);
      form.reset(getBookFormValues(savedBook));

      if (wasCreating) router.replace(`/admin/books/${savedBook.id}`);

      if (!publish) {
        toast.success(wasCreating ? toasts.draftCreated : toasts.changesSaved);
        return;
      }

      if (!isReaderPrepared(savedBook.processing)) {
        toast.info(toasts.preparing, {
          description: copy.form.publishPreparing,
        });
        return;
      }

      try {
        const publishedBook = await statusMutation.mutateAsync({ id: savedBook.id, action: "publish" });
        setCurrentBook(publishedBook);
        form.reset(getBookFormValues(publishedBook));
        toast.success(toasts.published);
      } catch (error) {
        applyServerError(error, toasts.publishError);
      }
    })();
  }

  function changeStatus(action: Exclude<BookStatusAction, "publish">) {
    if (!currentBook) return;
    statusMutation.mutate(
      { id: currentBook.id, action },
      {
        onSuccess: (updatedBook) => {
          setCurrentBook(updatedBook);
          form.reset(getBookFormValues(updatedBook));
          setServerIssues([]);
          toast.success(action === "unpublish" ? toasts.unpublished : toasts.archived);
        },
        onError: (error) => applyServerError(error, action === "unpublish" ? toasts.unpublishError : toasts.archiveError),
      },
    );
  }

  function deleteBook() {
    if (!currentBook) return;
    deleteMutation.mutate(currentBook.id, {
      onSuccess: () => {
        toast.success(toasts.deleted);
        router.replace("/admin/books");
      },
      onError: (error) => applyServerError(error, toasts.deleteError),
    });
  }

  return (
    <div className="mx-auto w-full max-w-[1240px] px-6 py-10 md:py-14">
      <div className="flex items-center justify-between gap-4">
        <Link className="inline-flex items-center gap-2 text-micro uppercase text-muted-foreground transition-colors hover:text-foreground" href="/admin/books">
          <ArrowLeft className="size-3.5" />
          {copy.backLabel}
        </Link>
        {currentBook ? (
          <span className="text-micro uppercase text-muted-foreground">{currentBook.status}</span>
        ) : null}
      </div>

      <header className="mt-8 border-b border-border pb-10">
        <SectionEyebrow text={currentBook ? copy.editEyebrow : copy.newEyebrow} />
        <h1 className="mt-4 text-heading">
          {currentBook ? copy.editTitleLead : copy.newTitleLead}{" "}
          <em className="font-display italic text-primary">{currentBook ? copy.editTitleItalic : copy.newTitleItalic}</em>
        </h1>
        <p className="mt-4 max-w-xl text-caption text-muted-foreground">
          {currentBook ? copy.editDescription : copy.newDescription}
        </p>
      </header>

      {isArchived ? (
        <p className="mt-6 border border-border bg-secondary px-4 py-3 text-caption text-muted-foreground">{copy.archivedNotice}</p>
      ) : isPublished ? (
        <p className="mt-6 border border-gold/35 bg-gold/5 px-4 py-3 text-caption text-gold">{copy.publishedNotice}</p>
      ) : null}

      {serverIssues.length > 0 ? (
        <ul className="mt-6 list-disc space-y-1 border border-destructive/40 bg-destructive/5 px-8 py-4 text-sm text-destructive">
          {serverIssues.map((issue) => <li key={`${issue.field}-${issue.message}`}>{issue.message}</li>)}
        </ul>
      ) : null}

      <Form {...form}>
        <form className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <section aria-labelledby="details-heading">
              <SectionEyebrow text={copy.detailsEyebrow} />
              <h2 className="mt-3 font-display text-subheading" id="details-heading">The edition</h2>

              <div className="mt-6 grid gap-6">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-micro uppercase text-muted-foreground">{copy.titleLabel}</FormLabel>
                    <FormControl>
                      <Input placeholder={copy.titlePlaceholder} {...field} onChange={(event) => handleTitleChange(event.target.value, field.onChange)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField control={form.control} name="author" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-micro uppercase text-muted-foreground">{copy.authorLabel}</FormLabel>
                      <FormControl><Input placeholder={copy.authorPlaceholder} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-micro uppercase text-muted-foreground">{copy.categoryLabel}</FormLabel>
                      <FormControl><Input placeholder={copy.categoryPlaceholder} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="subtitle" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-micro uppercase text-muted-foreground">{copy.subtitleLabel}</FormLabel>
                    <FormControl><Input placeholder={copy.subtitlePlaceholder} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="slug" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-micro uppercase text-muted-foreground">{copy.slugLabel}</FormLabel>
                    <FormControl>
                      <div className="flex items-center border border-input bg-background focus-within:ring-2 focus-within:ring-ring">
                        <span className="border-r border-border px-3 text-caption text-muted-foreground">{copy.slugPrefix}</span>
                        <Input className="border-0 focus-visible:ring-0" placeholder={copy.slugPlaceholder} {...field} />
                      </div>
                    </FormControl>
                    <p className="text-caption text-muted-foreground">{copy.slugHelper}</p>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-micro uppercase text-muted-foreground">{copy.descriptionLabel}</FormLabel>
                    <FormControl><Textarea className="min-h-32" placeholder={copy.descriptionPlaceholder} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="tags" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-micro uppercase text-muted-foreground">{copy.tagsLabel}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={copy.tagsPlaceholder}
                        value={field.value.join(", ")}
                        onChange={(event) => field.onChange(event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="language" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-micro uppercase text-muted-foreground">{copy.languageLabel}</FormLabel>
                    <FormControl><Input placeholder={copy.languagePlaceholder} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </section>

            <section aria-labelledby="files-heading">
              <SectionEyebrow text={copy.filesEyebrow} />
              <h2 className="mt-3 font-display text-subheading" id="files-heading">The files</h2>
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                <FormField control={form.control} name="cover" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <BookCoverField
                        altError={form.formState.errors.cover?.alt?.message}
                        altFallback={values.title || "Book cover"}
                        invalid={Boolean(form.formState.errors.cover)}
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="ebook" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <BookEbookField invalid={Boolean(form.formState.errors.ebook)} onChange={field.onChange} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              {currentBook ? <BookProcessingPanel book={currentBook} /> : null}
            </section>

            <section aria-labelledby="access-heading">
              <SectionEyebrow text={copy.commercialEyebrow} />
              <h2 className="mt-3 font-display text-subheading" id="access-heading">Access & price</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <FormField control={form.control} name="totalPages" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-micro uppercase text-muted-foreground">{copy.totalPagesLabel}</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={Boolean(values.ebook)} placeholder={copy.totalPagesPlaceholder} {...field} onChange={(event) => field.onChange(Number(event.target.value))} />
                    </FormControl>
                    <p className="text-caption text-muted-foreground">
                      {values.ebook ? copy.totalPagesDetectedHelper : copy.totalPagesHelper}
                    </p>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="freePreviewPages" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-micro uppercase text-muted-foreground">{copy.freePreviewPagesLabel}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={copy.freePreviewPagesPlaceholder} {...field} onChange={(event) => field.onChange(Number(event.target.value))} />
                    </FormControl>
                    <p className="text-caption text-muted-foreground">{copy.freePreviewHelper}</p>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-micro uppercase text-muted-foreground">{copy.priceLabel}</FormLabel>
                    <FormControl><Input type="number" step="0.01" placeholder={copy.pricePlaceholder} {...field} onChange={(event) => field.onChange(Number(event.target.value))} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="currency" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-micro uppercase text-muted-foreground">{copy.currencyLabel}</FormLabel>
                    <FormControl><Input maxLength={3} placeholder={copy.currencyPlaceholder} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-4 border border-border bg-card p-6">
              <div className="grid grid-cols-3 gap-3 border-b border-border pb-5 text-center">
                <div>
                  <p className="font-display text-title tabular-nums">{values.freePreviewPages}</p>
                  <p className="text-micro uppercase text-muted-foreground">{copy.stats.previewLabel}</p>
                </div>
                <div>
                  <p className="font-display text-title tabular-nums">{values.totalPages}</p>
                  <p className="text-micro uppercase text-muted-foreground">{copy.stats.totalLabel}</p>
                </div>
                <div>
                  <p className="font-display text-title tabular-nums">{values.price}</p>
                  <p className="text-micro uppercase text-muted-foreground">{copy.stats.priceLabel}</p>
                </div>
              </div>

              <Button className="w-full" disabled={isBusy} onClick={() => submitForm(false)} type="button" variant="outline">
                {saveMutation.isPending ? copy.savingLabel : currentBook ? copy.form.saveChanges : copy.form.saveDraft}
              </Button>

              {currentBook?.status !== "ARCHIVED" ? (
                isPublished ? (
                  <Button className="w-full" disabled={isBusy} onClick={() => changeStatus("unpublish")} type="button" variant="secondary">
                    <Undo2 data-icon="inline-start" />
                    {copy.form.unpublish}
                  </Button>
                ) : (
                  <Button className="w-full" disabled={isBusy || !readyToPublish} onClick={() => submitForm(true)} type="button">
                    <Send data-icon="inline-start" />
                    {copy.form.publish}
                  </Button>
                )
              ) : null}

              {currentBook && currentBook.status !== "ARCHIVED" ? (
                <Button className="w-full" disabled={isBusy} onClick={() => changeStatus("archive")} type="button" variant="ghost">
                  <Archive data-icon="inline-start" />
                  {copy.form.archive}
                </Button>
              ) : null}

              {currentBook ? (
                <Button className="w-full" disabled={isBusy} onClick={deleteBook} type="button" variant="ghost">
                  <Trash2 data-icon="inline-start" />
                  {copy.form.delete}
                </Button>
              ) : null}

              {!readyToPublish && !isPublished ? (
                <p className="text-caption text-muted-foreground">{copy.form.publishBlocked}</p>
              ) : null}

              {readyToPublish && !isPublished && currentBook && !readerPrepared ? (
                <p className="text-caption text-muted-foreground">{copy.form.publishWaiting}</p>
              ) : null}
            </div>
          </aside>
        </form>
      </Form>
    </div>
  );
}
