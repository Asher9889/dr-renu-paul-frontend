const blogDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatBlogDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return { iso: value, label: value };
  }

  return {
    iso: value,
    label: blogDateFormatter.format(date),
  };
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
