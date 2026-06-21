import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const hasScore = searchParams.has("score")
    const score = hasScore ? searchParams.get("score") : "0"

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #0f172a 0%, #064e3b 50%, #0f172a 100%)",
            fontFamily: "sans-serif",
            padding: "40px",
          }}
        >
          {/* Abstract background elements */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              left: "-100px",
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-150px",
              right: "-50px",
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "24px",
              padding: "40px 60px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
              <h1 style={{ fontSize: "42px", fontWeight: "bold", color: "white", marginLeft: "16px", margin: "0" }}>
                Carbon Wise
              </h1>
            </div>

            <h2 style={{ fontSize: "36px", fontWeight: "normal", color: "#94a3b8", margin: "0 0 24px 0" }}>
              My Annual Carbon Footprint
            </h2>

            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span style={{ fontSize: "120px", fontWeight: "900", color: "#10b981", lineHeight: "1" }}>
                {score}
              </span>
              <span style={{ fontSize: "36px", fontWeight: "bold", color: "#cbd5e1", marginLeft: "16px" }}>
                Tonnes
              </span>
            </div>
            
            <p style={{ fontSize: "24px", color: "#64748b", marginTop: "32px", marginBottom: "0" }}>
              Calculate yours at carbonwise.app
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
