import { ImageResponse } from "next/og";

// Static export-safe: this runs at build time and emits a real PNG file
// at /opengraph-image.png, which Next.js automatically references in <head>.
export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt =
  "ধোঁয়া-মুক্ত পথ - তিনটি অ্যাপ। ৪১ দিনের যাত্রা। সারাজীবনের স্বাধীনতা।";

export default async function Image() {
  // Fetch a Bengali font so the PNG renders Bangla correctly (next/og
  // has no Bengali glyphs in its default font).
  const hindSiliguriData = await fetch(
    "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@700&display=swap"
  ).then(async (res) => {
    const css = await res.text();
    const match = css.match(/src: url\((.+?)\) format/);
    if (!match) return null;
    return fetch(match[1]).then((r) => r.arrayBuffer());
  });

  const notoBengaliData = await fetch(
    "https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@500&display=swap"
  ).then(async (res) => {
    const css = await res.text();
    const match = css.match(/src: url\((.+?)\) format/);
    if (!match) return null;
    return fetch(match[1]).then((r) => r.arrayBuffer());
  });

  const fonts: Array<{
    name: string;
    data: ArrayBuffer;
    weight: 500 | 700;
    style: "normal";
  }> = [];
  if (hindSiliguriData) {
    fonts.push({
      name: "HindSiliguri",
      data: hindSiliguriData,
      weight: 700,
      style: "normal",
    });
  }
  if (notoBengaliData) {
    fonts.push({
      name: "NotoBengali",
      data: notoBengaliData,
      weight: 500,
      style: "normal",
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundImage:
            "linear-gradient(135deg, #0A2C29 0%, #0E4037 55%, #1A5C4B 100%)",
          padding: "72px 88px",
          position: "relative",
        }}
      >
        {/* Decorative gold halo top-right */}
        <div
          style={{
            position: "absolute",
            top: "-180px",
            right: "-180px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(231,200,120,0.28) 0%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Decorative gold ring bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-120px",
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            border: "2px solid rgba(201,169,110,0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            border: "1px solid rgba(201,169,110,0.18)",
          }}
        />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              border: "3px solid #C9A96E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Gold plus/cross mark — safe, no font dependency */}
            <div
              style={{
                position: "absolute",
                width: "24px",
                height: "3px",
                background: "#C9A96E",
                borderRadius: "2px",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "3px",
                height: "24px",
                background: "#C9A96E",
                borderRadius: "2px",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span
              style={{
                fontFamily: "HindSiliguri, sans-serif",
                fontSize: "26px",
                color: "#C9A96E",
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              ধোঁয়া-মুক্ত পথ
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "rgba(246,241,228,0.7)",
                letterSpacing: "0.15em",
                fontWeight: 500,
              }}
            >
              SMOKE-FREE PATH
            </span>
          </div>
        </div>

        {/* Main heading */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <span
            style={{
              fontFamily: "HindSiliguri, sans-serif",
              fontSize: "76px",
              color: "#F6F1E4",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            শেষ সিগারেট আজই হোক।
          </span>
          <span
            style={{
              fontFamily: "HindSiliguri, sans-serif",
              fontSize: "76px",
              color: "#E7C878",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            নতুন জীবন আগামীকাল।
          </span>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(201,169,110,0.3)",
            paddingTop: "24px",
          }}
        >
          <span
            style={{
              fontFamily: "NotoBengali, sans-serif",
              fontSize: "26px",
              color: "rgba(246,241,228,0.88)",
              fontWeight: 500,
            }}
          >
            ৩টি অ্যাপ • ৪১ দিনের যাত্রা • সারাজীবনের স্বাধীনতা
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 22px",
              background: "#E7C878",
              color: "#0A2C29",
              borderRadius: "999px",
              fontFamily: "HindSiliguri, sans-serif",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            ৳৩৬৯
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  );
}
