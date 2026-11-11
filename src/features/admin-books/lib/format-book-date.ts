const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatBookDate(value: string | null): string {
  if (!value) return "—";
  return dateFormatter.format(new Date(value));
}
