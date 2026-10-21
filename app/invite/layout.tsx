import { ReactNode } from "react";
import { InvitationAudioProvider } from "@/components/invitation/InvitationAudioContext";
import MusicToggle from "@/components/invitation/MusicToggle";

export default function InviteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <InvitationAudioProvider>
      {children}
      <MusicToggle />
    </InvitationAudioProvider>
  );
}
