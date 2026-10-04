import type { CopyStatus } from "@/lib/use-copy";

export function CopyAnnouncement({
  messages,
  status,
}: {
  messages: Record<Exclude<CopyStatus, "idle">, string>;
  status: CopyStatus;
}) {
  return (
    <span className="sr-only" role="status">
      {status === "idle" ? "" : messages[status]}
    </span>
  );
}
