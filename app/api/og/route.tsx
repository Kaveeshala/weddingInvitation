import { ImageResponse } from 'next/og';
import { dbConnect } from "@/lib/mongodb";
import Guest from "@/models/Guest";
import { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    let displayName = "අමුත්තා"; // fallback
    if (token && token !== "preview") {
      await dbConnect();
      const guest = await Guest.findOne({ token }).lean();
      if (guest) {
        displayName = guest.sinhalaName || guest.name;
      }
    }

    // Read font and image from local file system for reliability
    const fontPath = join(process.cwd(), 'public/fonts/NotoSansSinhala-Regular.ttf');
    const fontData = await readFile(fontPath);

    const bgPath = join(process.cwd(), 'public/images/couple_poruwa.jpeg');
    const bgData = await readFile(bgPath);
    const bgBase64 = bgData.toString('base64');
    const bgDataUrl = `data:image/jpeg;base64,${bgBase64}`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end", // text banner at bottom
            backgroundImage: `url(${bgDataUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Text Overlay Banner */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              width: "100%",
              padding: "40px 60px",
              borderTop: "8px solid #d4af37", // Gold border
              boxShadow: "0 -20px 40px rgba(0,0,0,0.3)",
            }}
          >
            <span
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: "#1a1a1a",
                fontFamily: '"Noto Sans Sinhala"',
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              ආදරණීය {displayName} ❤️
            </span>
            <span
              style={{
                fontSize: 32,
                color: "#4a4a4a",
                fontFamily: '"Noto Sans Sinhala"',
                textAlign: "center",
                maxWidth: "900px",
                lineHeight: 1.4,
              }}
            >
              අපගේ ජීවිතයේ සොඳුරුම දවසක් වන විවාහ මංගල්‍යය වෙනුවෙන් ඔබට ආදරයෙන් ආරාධනා කර සිටිමු.
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Noto Sans Sinhala",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.error("Error generating OG image", e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
