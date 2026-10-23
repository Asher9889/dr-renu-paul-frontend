import Image from "next/image";

import type { BlogAuthor } from "@/features/blog/types/blog";

type BlogAuthorCardProps = {
  author: BlogAuthor;
  label: string;
};

export function BlogAuthorCard({ author, label }: BlogAuthorCardProps) {
  return (
    <div className="flex items-start gap-4">
      <Image
        alt={author.avatar.alt}
        className="size-11 shrink-0 rounded-sm border border-border object-cover"
        height={44}
        src={author.avatar.src}
        width={44}
      />

      <div>
        <p className="text-micro font-medium uppercase text-gold">{label}</p>
        <p className="mt-1 font-display text-title">{author.name}</p>
        <p className="mt-1 text-caption text-muted-foreground">
          {author.role}
        </p>
      </div>
    </div>
  );
}
