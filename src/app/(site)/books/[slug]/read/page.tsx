import { Suspense } from "react";

import { BookReaderPage } from "@/features/books";

export const metadata = {
  title: "Reading room",
  robots: { index: false, follow: false },
};

async function ReaderContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BookReaderPage slug={slug} />;
}

export default function BookReaderRoute({
  params,
}: PageProps<"/books/[slug]/read">) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1240px] px-6 py-16 text-caption text-muted-foreground">
          Opening the edition…
        </div>
      }
    >
      <ReaderContent params={params} />
    </Suspense>
  );
}
