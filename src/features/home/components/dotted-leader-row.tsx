import type { ReactNode } from "react";

import { DrawRule } from "@/motion";

type DottedLeaderRowProps = {
  left: ReactNode;
  right: ReactNode;
  delay?: number;
};

export function DottedLeaderRow({
  left,
  right,
  delay = 0,
}: DottedLeaderRowProps) {
  return (
    <div className="flex items-end gap-3">
      <span className="shrink-0">{left}</span>
      <DrawRule
        className="mb-[0.45em] min-w-6 flex-1 border-b border-dotted border-input"
        delay={delay}
      />
      <span className="shrink-0 text-right">{right}</span>
    </div>
  );
}
