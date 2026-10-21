import type { ReactNode } from "react";

type DottedLeaderRowProps = {
  left: ReactNode;
  right: ReactNode;
};

export function DottedLeaderRow({ left, right }: DottedLeaderRowProps) {
  return (
    <div className="flex items-end gap-3">
      <span className="shrink-0">{left}</span>
      <span
        aria-hidden
        className="mb-[0.45em] min-w-6 flex-1 border-b border-dotted border-input"
      />
      <span className="shrink-0 text-right">{right}</span>
    </div>
  );
}
