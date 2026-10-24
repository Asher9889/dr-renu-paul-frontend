import { BlogAppointmentCard } from "@/features/blog/components/blog-appointment-card";
import { BlogAuthorCard } from "@/features/blog/components/blog-author-card";
import { BlogTableOfContents } from "@/features/blog/components/blog-table-of-contents";
import type {
  BlogAuthor,
  BlogDetailContent,
  BlogTocItem,
} from "@/features/blog/types/blog";

type BlogSidebarProps = {
  author: BlogAuthor;
  headings: BlogTocItem[];
  content: BlogDetailContent;
};

export function BlogSidebar({
  author,
  headings,
  content,
}: BlogSidebarProps) {
  return (
    <div className="sticky top-28 space-y-8">
      <BlogAuthorCard
        author={author}
        key={author.avatar.url}
        label={content.authorLabel}
      />

      <div className="border border-border bg-card p-6">
        <BlogTableOfContents items={headings} label={content.tocLabel} />
      </div>

      <BlogAppointmentCard content={content.appointment} />
    </div>
  );
}
