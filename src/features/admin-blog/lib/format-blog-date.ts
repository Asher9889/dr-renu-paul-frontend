const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "UTC",
});

export function formatBlogDate(
  isoDate: string,
  options?: { withTime?: boolean },
): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return options?.withTime
    ? dateTimeFormatter.format(date)
    : dateFormatter.format(date);
}
