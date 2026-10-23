import { cn } from "@/lib/utils";

type SectionEyebrowProps = {
  text: string;
  className?: string;
};

export function SectionEyebrow({ text, className }: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "text-micro font-medium uppercase text-gold",
        className,
      )}
    >
      {text}
    </p>
  );
}
