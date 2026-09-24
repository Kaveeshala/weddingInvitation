import { notFound } from "next/navigation";
import { Metadata } from "next";
import { dbConnect } from "@/lib/mongodb";
import Guest from "@/models/Guest";
import InviteIntroClient from "@/components/invitation/InviteIntroClient";

interface InvitePageProps {
  params: Promise<{
    token: string;
  }>;
}

export async function generateMetadata({ params }: InvitePageProps): Promise<Metadata> {
  const { token } = await params;

  if (token === "preview") {
    return {
      title: "Wedding Invitation - Preview",
    };
  }

  await dbConnect();
  const guest = await Guest.findOne({ token }).lean();

  if (!guest) {
    return {
      title: "Invitation Not Found",
    };
  }

  // Use the Sinhala name if available, otherwise fallback to English name
  const displayName = guest.sinhalaName || guest.name;
  
  const title = `ආදරණීය ${displayName} ❤️`;
  const description = "අපගේ ජීවිතයේ සොඳුරුම දවසක් වන විවාහ මංගල්‍යය වෙනුවෙන් ඔබට ආදරයෙන් ආරාධනා කර සිටිමු. 💍✨\n\nවිවාහ ආරාධනා පත්‍රය 💌👇\nඔබගේ පැමිණීම අපගේ විශේෂ දිනය තවත් සුන්දර කරනු ඇත.\n\nආදරයෙන්,\n❤️ Dewmi & Daham";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/images/couple_poruwa.jpeg",
          width: 1200,
          height: 1200,
          alt: "Wedding Invitation",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/couple_poruwa.jpeg"],
    },
  };
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { token } = await params;

  if (token === "preview") {
    return <InviteIntroClient token="preview" />;
  }

  await dbConnect();

  const guest = await Guest.findOne({ token }).lean();

  if (!guest) {
    notFound();
  }

  return <InviteIntroClient token={token} />;
}