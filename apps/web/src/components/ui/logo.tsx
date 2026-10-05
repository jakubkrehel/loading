import { Loading } from "loading-dev";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SEGMENTS = [
  { opacity: 1, x: 12, y: 6 },
  { opacity: 0.9, x: 10, y: 2 },
  { opacity: 0.8, x: 6, y: 0 },
  { opacity: 0.7, x: 2, y: 2 },
  { opacity: 0.6, x: 0, y: 6 },
  { opacity: 0.5, x: 2, y: 10 },
  { opacity: 0.4, x: 6, y: 12 },
  { opacity: 0.3, x: 10, y: 10 },
];

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("size-full", className)}
      fill="currentColor"
      viewBox="0 0 15 15"
    >
      {SEGMENTS.map(({ opacity, x, y }) => (
        <g
          key={`${x}-${y}`}
          opacity={opacity}
          transform={`translate(${x} ${y})`}
        >
          <rect height="1" width="1" x="0" y="0" />
          <rect height="1" width="1" x="2" y="0" />
          <rect height="1" width="1" x="0" y="2" />
          <rect height="1" width="1" x="2" y="2" />
        </g>
      ))}
    </svg>
  );
}

export function Logo({
  className,
  playOnHover = false,
}: {
  className?: string;
  playOnHover?: boolean;
}) {
  return (
    <Link
      aria-label="Home"
      className={cn(
        "group grid size-7.5 shrink-0 rounded-sm text-orange *:col-start-1 *:row-start-1",
        className
      )}
      href="/"
    >
      <LogoMark
        className={cn(
          playOnHover &&
            "transition-opacity duration-200 ease-out motion-safe:hover-hover:group-hover:opacity-0 motion-safe:hover-hover:group-hover:duration-0"
        )}
      />
      {/* Hidden until hover, so each hover restarts the animation from the top.
          Entering swaps instantly; leaving crossfades back to the mark, with
          the discrete transition keeping the spinner displayed while it fades. */}
      {playOnHover && (
        <Loading
          className="hidden opacity-0 transition-[display,opacity] transition-discrete duration-200 ease-out motion-safe:hover-hover:group-hover:block motion-safe:hover-hover:group-hover:opacity-100 motion-safe:hover-hover:group-hover:duration-0"
          size={30}
        />
      )}
    </Link>
  );
}
