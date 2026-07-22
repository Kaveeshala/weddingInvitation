import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import Guest from "@/models/Guest";
import InviteIntroClient from "@/components/invitation/InviteIntroClient";

interface InvitePageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { token } = await params;

  await dbConnect();

  const guest = await Guest.findOne({ token }).lean();

  if (!guest) {
    notFound();
  }

  return <InviteIntroClient token={token} />;
}