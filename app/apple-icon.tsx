import { ImageResponse } from "next/og";

// Apple touch icon — 180×180 PNG generated at build time.
// `force-static` is required under `output: "export"` (Cloudflare Pages).
export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 180, height: 180 };

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0F5132 0%, #0A3B25 60%, #062A1A 100%)",
          color: "#E7C878",
          fontSize: 128,
          fontWeight: 700,
          position: "relative",
        }}
      >
        {/* Decorative gold ring */}
        <div
          style={{
            position: "absolute",
            inset: "14px",
            borderRadius: "50%",
            border: "2px solid rgba(231,200,120,0.35)",
          }}
        />
        <span
          style={{
            fontFamily: "serif",
            marginTop: "-6px",
            textShadow: "0 2px 8px rgba(0,0,0,0.25)",
          }}
        >
          ধ
        </span>
      </div>
    ),
    size
  );
}
