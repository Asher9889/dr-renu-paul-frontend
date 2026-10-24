import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { cn } from "@/lib/utils";

type AdminPageHeaderProps = {
  eyebrow: string;
  titleLead: string;
  titleItalic: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
};

export function AdminPageHeader({
  eyebrow,
  titleLead,
  titleItalic,
  description,
  children,
  className,
}: AdminPageHeaderProps) {
  return (
    <header
      className={cn(
        "grid gap-8 border-b border-border pb-10 md:grid-cols-12 md:gap-12 md:pb-14",
        className,
      )}
    >
      <div className="md:col-span-7">
        <SectionEyebrow text={eyebrow} />
        <h1 className="mt-4 text-heading">
          {titleLead}{" "}
          <em className="font-display italic text-primary">{titleItalic}</em>
        </h1>
      </div>
      <div className="flex flex-col justify-end gap-6 md:col-span-5">
        <p className="max-w-md text-caption text-muted-foreground">
          {description}
        </p>
        {children}
      </div>
    </header>
  );
}
