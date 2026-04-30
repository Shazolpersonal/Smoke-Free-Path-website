import { ImageResponse } from "next/og";

// Static export-safe: Next.js generates /icon.png at build time.
export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 64, height: 64 };

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F5132",
          color: "#E7C878",
          fontSize: 46,
          fontWeight: 700,
          borderRadius: "22%",
        }}
      >
        <span
          style={{
            fontFamily: "serif",
            letterSpacing: "-0.02em",
            marginTop: "-4px",
          }}
        >
          ধ
        </span>
      </div>
    ),
    size
  );
}
