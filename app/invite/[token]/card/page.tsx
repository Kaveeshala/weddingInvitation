import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import Guest from "@/models/Guest";
import InvitationPageClient from "@/components/invitation/InvitationPageClient";

interface InviteCardPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function InviteCardPage({
  params,
}: InviteCardPageProps) {
  const { token } = await params;

  if (token === "preview") {
    return (
      <InvitationPageClient
        guest={{
          name: "",
          token: "preview",
          partySize: 2,
          rsvpStatus: "invited",
        }}
      />
    );
  }

  await dbConnect();

  const guest = await Guest.findOne({ token }).lean();

  if (!guest) {
    notFound();
  }

  return (
    <InvitationPageClient
      guest={{
        name: guest.name,
        token: guest.token,
        partySize: guest.partySize,
        rsvpStatus: guest.rsvpStatus,
      }}
    />
  );
}