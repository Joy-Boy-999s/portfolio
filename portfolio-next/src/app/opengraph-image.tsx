import { ImageResponse } from "next/og";

export const alt =
  "B. Neeraj Kumar (JoyBoy) — Full Stack Developer | React, NestJS, Spring Boot, Node.js";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 0%, #0b3b2e 0%, #04040a 55%, #04040a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#10b981",
              boxShadow: "0 0 20px #10b981",
            }}
          />
          <div
            style={{
              fontSize: 26,
              color: "#10b981",
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Available for opportunities
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            B. Neeraj Kumar
          </div>
          <div
            style={{
              fontSize: 44,
              color: "#a1a1aa",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span style={{ color: "#10b981" }}>JoyBoy</span>
            <span style={{ color: "#3f3f46" }}>•</span>
            <span>Full Stack Developer</span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              marginTop: 12,
            }}
          >
            {["React", "Next.js", "NestJS", "Spring Boot", "Node.js", "TypeScript"].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    display: "flex",
                    padding: "10px 22px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.04)",
                    fontSize: 26,
                    color: "#e4e4e7",
                  }}
                >
                  {tech}
                </div>
              ),
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "#71717a",
          }}
        >
          <div style={{ display: "flex", gap: 32 }}>
            <div style={{ display: "flex" }}>github.com/Joy-Boy-999s</div>
            <div style={{ display: "flex" }}>linkedin.com/in/b-neeraj-kumar</div>
          </div>
          <div style={{ display: "flex", color: "#10b981", fontWeight: 600 }}>
            bneerajkumar.dev
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
