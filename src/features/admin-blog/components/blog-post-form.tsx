"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getAdminBlogError } from "@/features/admin-blog/api/get-admin-blog-error";
import { BlogCoverField } from "@/features/admin-blog/components/blog-cover-field";
import { BlogPostActionsCard } from "@/features/admin-blog/components/blog-post-actions-card";
import { BlogPostFormHeader } from "@/features/admin-blog/components/blog-post-form-header";
import { BlogPublishChecklist } from "@/features/admin-blog/components/blog-publish-checklist";
import { BlogPublishIssuesDialog } from "@/features/admin-blog/components/blog-publish-issues-dialog";
import { BlogTagField } from "@/features/admin-blog/components/blog-tag-field";
import { ConfirmBlogPostAction } from "@/features/admin-blog/components/confirm-blog-post-action";
import { adminBlogContent } from "@/features/admin-blog/content/admin-blog-content";
import { useChangeBlogPostStatus } from "@/features/admin-blog/hooks/use-change-blog-post-status";
import { useDeleteBlogPost } from "@/features/admin-blog/hooks/use-delete-blog-post";
import { useSaveBlogPost } from "@/features/admin-blog/hooks/use-save-blog-post";
import { buildBlogPostPayload } from "@/features/admin-blog/lib/build-blog-post-payload";
import {
  getBlogPostFormValues,
  getEmptyBlogPostFormValues,
} from "@/features/admin-blog/lib/blog-post-form-values";
import {
  getPublishChecklist,
  isReadyToPublish,
} from "@/features/admin-blog/lib/publish-readiness";
import { slugify } from "@/features/admin-blog/lib/slugify";
import {
  blogPostFormSchema,
  type BlogPostFormValues,
} from "@/features/admin-blog/schema/blog-post-form.schema";
import type { AdminBlogPostDetail } from "@/features/admin-blog/types/blog";

const BlogEditor = dynamic(
  () =>
    import("@/features/admin-blog/components/blog-editor").then(
      (module) => module.BlogEditor,
    ),
  {
    ssr: false,
    loading: () => (
      <div aria-hidden className="min-h-96 border-y border-border" />
    ),
  },
);

type BlogPostFormProps = {
  post?: AdminBlogPostDetail;
};

type ConfirmAction = "unpublish" | "archive" | "delete";

const formFieldNames = [
  "title",
  "slug",
  "excerpt",
  "content",
  "cover",
  "tags",
  "featured",
] as const;

export function BlogPostForm({ post }: BlogPostFormProps) {
  const content = adminBlogContent.editor;
  const toasts = adminBlogContent.toasts;
  const router = useRouter();
  const [currentPost, setCurrentPost] = useState<AdminBlogPostDetail | null>(post ?? null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const [publishIssuesOpen, setPublishIssuesOpen] = useState(false);
  const [serverIssues, setServerIssues] = useState<Array<{ field: string; message: string }>>([]);

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: post ? getBlogPostFormValues(post) : getEmptyBlogPostFormValues(),
    mode: "onTouched",
  });

  const saveMutation = useSaveBlogPost();
  const statusMutation = useChangeBlogPostStatus();
  const deleteMutation = useDeleteBlogPost();

  const values = form.watch();
  const checklist = getPublishChecklist(values);
  const readyToPublish = isReadyToPublish(checklist);
  const isPublished = currentPost?.status === "published";
  const isBusy =
    saveMutation.isPending ||
    statusMutation.isPending ||
    deleteMutation.isPending;

  function applyServerError(error: unknown, fallbackMessage: string) {
    const parsed = getAdminBlogError(error);
    setServerIssues(parsed.issues);

    for (const issue of parsed.issues) {
      const field = issue.field as (typeof formFieldNames)[number];
      if (formFieldNames.includes(field)) {
        form.setError(field, { type: "server", message: issue.message });
      }
    }

    toast.error(fallbackMessage, { description: parsed.message });
  }

  function handleTitleChange(title: string, onChange: (value: string) => void) {
    const previousAutoSlug = slugify(form.getValues("title"));
    const currentSlug = form.getValues("slug");

    onChange(title);

    if (!currentPost && (!currentSlug || currentSlug === previousAutoSlug)) {
      form.setValue("slug", slugify(title).slice(0, 160).replace(/-+$/g, ""),
        {
          shouldDirty: true,
          shouldValidate: form.formState.isSubmitted,
        },
      );
    }
  }

  async function submitForm(publish: boolean) {
    if (!readyToPublish && (publish || isPublished)) {
      setPublishIssuesOpen(true);
      return;
    }

    setServerIssues([]);

    await form.handleSubmit(async (formValues) => {
      const payload = buildBlogPostPayload(formValues);
      const existingPost = currentPost;
      const shouldSave = !existingPost || form.formState.isDirty;

      let savedPost = existingPost;

      if (shouldSave) {
        try {
          savedPost = await saveMutation.mutateAsync({
            id: existingPost?.id,
            payload,
          });
        } catch (error) {
          applyServerError(
            error,
            publish ? toasts.publishError : toasts.saveError,
          );
          return;
        }

        if (!savedPost) {
          return;
        }

        setCurrentPost(savedPost);
        form.reset(getBlogPostFormValues(savedPost));
      }

      if (!savedPost) {
        return;
      }

      if (!publish) {
        toast.success(
          existingPost ? toasts.changesSaved : toasts.draftCreated,
        );
        if (!existingPost) {
          router.replace(`/admin/blogs/${savedPost.id}`);
        }
        return;
      }

      try {
        const publishedPost = await statusMutation.mutateAsync({
          id: savedPost.id,
          action: "publish",
        });
        setCurrentPost(publishedPost);
        form.reset(getBlogPostFormValues(publishedPost));
        toast.success(toasts.published);
      } catch (error) {
        applyServerError(error, toasts.publishError);
      }

      if (!existingPost) {
        router.replace(`/admin/blogs/${savedPost.id}`);
      }
    })();
  }

  function changeStatus(action: "unpublish" | "archive") {
    if (!currentPost) {
      return;
    }

    statusMutation.mutate(
      { id: currentPost.id, action },
      {
        onSuccess: (updatedPost) => {
          setCurrentPost(updatedPost);
          form.reset(getBlogPostFormValues(updatedPost));
          setServerIssues([]);
          toast.success(
            action === "unpublish"
              ? toasts.unpublished
              : toasts.archived,
          );
        },
        onError: (error) => {
          const parsed = getAdminBlogError(error);
          toast.error(
            action === "unpublish"
              ? toasts.unpublishError
              : toasts.archiveError,
            { description: parsed.message },
          );
        },
      },
    );
  }

  function deletePost() {
    if (!currentPost) {
      return;
    }

    deleteMutation.mutate(currentPost.id, {
      onSuccess: () => {
        toast.success(toasts.deleted);
        router.push("/admin/blogs");
      },
      onError: (error) => {
        const parsed = getAdminBlogError(error);
        toast.error(toasts.deleteError, {
          description: parsed.message,
        });
      },
    });
  }

  const coverErrors = form.formState.errors.cover;

  return (
    <div className="mx-auto w-full max-w-[1240px] px-6 py-10 md:py-14">
      <BlogPostFormHeader
        content={content}
        labels={adminBlogContent.statusLabels}
        post={currentPost}
      />

      {serverIssues.length > 0 ? (
        <div
          className="mt-8 border border-destructive/40 bg-destructive/5 p-4"
          role="alert"
        >
          <p className="text-micro font-medium uppercase text-destructive">
            {content.issuesTitle}
          </p>
          <ul className="mt-2 space-y-1 text-caption text-foreground/80">
            {serverIssues.map((issue) => (
              <li key={`${issue.field}-${issue.message}`}>
                {issue.message}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Form {...form}>
        <form
          className="mt-10 md:mt-12"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            void submitForm(false);
          }}
        >
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="space-y-12 lg:col-span-2">
              <section aria-labelledby="note-details-heading">
                <SectionEyebrow text={content.detailsEyebrow} />
                <div className="mt-6 space-y-7">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-micro uppercase text-muted-foreground">
                          {content.titleLabel}
                        </FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            className="h-auto rounded-none border-0 border-b border-input bg-transparent px-0 py-2 font-display text-subheading leading-tight focus-visible:border-ring focus-visible:ring-0"
                            maxLength={200}
                            onChange={(event) =>
                              handleTitleChange(
                                event.target.value,
                                field.onChange,
                              )
                            }
                            placeholder={content.titlePlaceholder}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-micro uppercase text-muted-foreground">
                          {content.slugLabel}
                        </FormLabel>
                        <div className="flex items-baseline gap-2 border-b border-input focus-within:border-ring">
                          <span className="text-caption text-muted-foreground">
                            {content.slugPrefix}
                          </span>
                          <FormControl>
                            <Input
                              autoCapitalize="none"
                              autoComplete="off"
                              className="h-10 flex-1 rounded-none border-0 bg-transparent px-0 focus-visible:ring-0"
                              maxLength={160}
                              onBlur={() => {
                                const normalized = slugify(field.value);
                                if (normalized !== field.value) {
                                  field.onChange(normalized);
                                }
                                field.onBlur();
                              }}
                              onChange={field.onChange}
                              placeholder={content.slugPlaceholder}
                              spellCheck={false}
                              value={field.value}
                            />
                          </FormControl>
                        </div>
                        <p className="text-micro uppercase text-muted-foreground/70">
                          {content.slugHelper}
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-micro uppercase text-muted-foreground">
                          {content.excerptLabel}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-28 rounded-none border-0 border-b border-input bg-transparent px-0 py-2 focus-visible:ring-0"
                            maxLength={200}
                            onChange={field.onChange}
                            placeholder={content.excerptPlaceholder}
                            value={field.value}
                          />
                        </FormControl>
                        <div className="flex items-baseline justify-between gap-4">
                          <p className="text-micro uppercase text-muted-foreground/70">
                            {content.excerptHelper}
                          </p>
                          <span className="text-micro uppercase tabular-nums text-muted-foreground/70">
                            {field.value.length}/200
                          </span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <section aria-labelledby="note-body-heading">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="text-micro uppercase text-muted-foreground"
                        htmlFor="note-body"
                        id="note-body-heading"
                      >
                        {content.contentLabel}
                      </FormLabel>
                      <BlogEditor
                        content={content}
                        id="note-body"
                        onChange={field.onChange}
                        value={field.value}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
            </div>

            <aside className="space-y-8">
              <section aria-labelledby="publication-heading">
                <SectionEyebrow text={content.publication.eyebrow} />
                <h2 className="sr-only" id="publication-heading">
                  {content.publication.eyebrow}
                </h2>

                <div className="mt-6 space-y-8">
                  <FormField
                    control={form.control}
                    name="cover"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <BlogCoverField
                          altFallback={adminBlogContent.image.missingAlt}
                          content={content.cover}
                          fieldErrors={{
                            alt: coverErrors?.alt?.message,
                            caption: coverErrors?.caption?.message,
                          }}
                          invalid={Boolean(fieldState.error)}
                          onChange={field.onChange}
                          toasts={adminBlogContent.toasts}
                          value={field.value}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <BlogTagField
                          content={content.tags}
                          error={fieldState.error?.message}
                          invalid={Boolean(fieldState.error)}
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex items-start justify-between gap-4 border-t border-border pt-6">
                        <div className="space-y-1">
                          <FormLabel className="text-micro uppercase text-muted-foreground">
                            {content.publication.featuredLabel}
                          </FormLabel>
                          <p className="text-caption text-muted-foreground">
                            {content.publication.featuredHelper}
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-8">
                  <BlogPublishChecklist
                    content={content.publication}
                    items={checklist}
                  />
                </div>
              </section>

              <BlogPostActionsCard
                content={content}
                isDirty={form.formState.isDirty}
                isPublishing={statusMutation.isPending}
                isSaving={saveMutation.isPending}
                labels={adminBlogContent.statusLabels}
                onArchive={() => setConfirmAction("archive")}
                onDelete={() => setConfirmAction("delete")}
                onPublish={() => void submitForm(true)}
                onSave={() => void submitForm(false)}
                onUnpublish={() => setConfirmAction("unpublish")}
                post={currentPost}
              />
            </aside>
          </div>
        </form>
      </Form>

      <BlogPublishIssuesDialog
        dialogs={content.dialogs}
        items={checklist}
        onOpenChange={setPublishIssuesOpen}
        open={publishIssuesOpen}
        publication={content.publication}
      />

      <ConfirmBlogPostAction
        cancelLabel={content.dialogs.cancel}
        confirmLabel={content.dialogs.unpublishConfirm}
        description={content.dialogs.unpublishDescription}
        onConfirm={() => changeStatus("unpublish")}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        open={confirmAction === "unpublish"}
        title={content.dialogs.unpublishTitle}
      />

      <ConfirmBlogPostAction
        cancelLabel={content.dialogs.cancel}
        confirmLabel={content.dialogs.archiveConfirm}
        description={content.dialogs.archiveDescription}
        onConfirm={() => changeStatus("archive")}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        open={confirmAction === "archive"}
        title={content.dialogs.archiveTitle}
      />

      <ConfirmBlogPostAction
        cancelLabel={content.dialogs.cancel}
        confirmLabel={content.dialogs.deleteConfirm}
        description={content.dialogs.deleteDescription}
        destructive
        onConfirm={deletePost}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        open={confirmAction === "delete"}
        title={content.dialogs.deleteTitle}
      />

      {isBusy ? (
        <span aria-live="polite" className="sr-only">
          {content.savingLabel}
        </span>
      ) : null}
    </div>
  );
}
