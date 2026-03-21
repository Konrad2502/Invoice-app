
export function formatDueDate(dateIso: string): string {
  const d = new Date(dateIso);

  if (Number.isNaN(d.getTime())) return dateIso; 

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}