"use client";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

type AdminUiProviderProps = {
  children: React.ReactNode;
};

export function AdminUiProvider({ children }: AdminUiProviderProps) {
  return (
    <TooltipProvider delayDuration={200}>
      {children}
      <Toaster position="bottom-right" />
    </TooltipProvider>
  );
}
