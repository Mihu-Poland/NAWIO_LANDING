import { getCategoryLabel, type BlogCategory } from "@/lib/blog";

/**
 * Etykieta kategorii wpisu na blogu — stonowane kolory pod ciemny motyw Nawio.
 *
 * @author Mihu
 */
export function CategoryBadge({ category }: { category: BlogCategory }) {
  const colorMap: Record<BlogCategory, string> = {
    dokumenty:
      "border-[#3b82f6]/35 bg-[#3b82f6]/10 text-[#93c5fd]",
    terminy:
      "border-[#f59e0b]/35 bg-[#f59e0b]/10 text-[#fcd34d]",
    krs:
      "border-[#a855f7]/35 bg-[#a855f7]/10 text-[#e9d5ff]",
    zus:
      "border-[#22c55e]/35 bg-[#22c55e]/10 text-[#bbf7d0]",
    us:
      "border-[#ef4444]/35 bg-[#ef4444]/10 text-[#fecaca]",
    poradnik:
      "border-[#14b8a6]/35 bg-[#14b8a6]/10 text-[#99f6e4]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colorMap[category]}`}
    >
      {getCategoryLabel(category)}
    </span>
  );
}
