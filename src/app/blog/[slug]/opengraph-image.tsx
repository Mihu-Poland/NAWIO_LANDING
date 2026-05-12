import { ImageResponse } from "next/og";
import { getBlogPost, getCategoryLabel } from "@/lib/blog";

/**
 * Dynamiczny obraz Open Graph (1200×630) dla wpisu bloga — `next/og` / `@vercel/og`.
 *
 * @author Mihu
 */

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

/** Granat + złoty motyw zgodny z landingiem Nawio (inline styles — podzbiór CSS w OG). */
export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  const rawTitle = post?.title ?? "Blog Nawio";
  const title =
    rawTitle.length > 118 ? `${rawTitle.slice(0, 115).trim()}…` : rawTitle;
  const category = post ? getCategoryLabel(post.category) : "Blog";

  const titleFontSize = title.length > 72 ? "38px" : title.length > 48 ? "44px" : "52px";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0f1419",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 15% 40%, rgba(212, 175, 55, 0.12) 0%, transparent 55%), " +
            "radial-gradient(ellipse 70% 50% at 85% 15%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), " +
            "linear-gradient(165deg, #121a26 0%, #0c1118 100%)",
          padding: "56px 64px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #e8c547 0%, #c9a227 50%, #a68520 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                color: "#141820",
                fontWeight: 700,
                boxShadow: "0 4px 20px rgba(212, 175, 55, 0.25)",
              }}
            >
              N
            </div>
            <span
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "#f2f4f8",
                letterSpacing: "-0.03em",
              }}
            >
              Nawio
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(212, 175, 55, 0.12)",
              border: "1px solid rgba(212, 175, 55, 0.35)",
              borderRadius: "9999px",
              padding: "8px 18px",
              fontSize: "15px",
              color: "#e8d7a0",
              fontWeight: 600,
              maxWidth: "380px",
              textAlign: "right",
            }}
          >
            {category.length > 28 ? `${category.slice(0, 26)}…` : category}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            padding: "32px 0 28px",
          }}
        >
          <h1
            style={{
              fontSize: titleFontSize,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "17px", color: "rgba(255,255,255,0.45)" }}>
            nawio.pl/blog
          </span>
          <span style={{ fontSize: "15px", color: "rgba(212, 175, 55, 0.55)", fontWeight: 600 }}>
            PROWADZI. NIE RADZI.
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
