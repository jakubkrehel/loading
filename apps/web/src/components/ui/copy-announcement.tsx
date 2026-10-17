export function CopyAnnouncement({ children }: { children: string }) {
  return (
    <span className="sr-only" role="status">
      {children}
    </span>
  );
}
