/**
 * Formatuje datę ISO do postaci np. „12 maja 2026”.
 *
 * @author Mihu
 */
export function formatPolishDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
