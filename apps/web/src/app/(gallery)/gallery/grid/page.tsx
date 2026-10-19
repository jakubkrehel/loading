import {
  type EasingProps,
  SPINNERS,
  type SpinnerName,
  type SpinnerProps,
} from "loading-dev";
import type { ComponentType } from "react";

const PICKS: SpinnerName[] = [
  "arc",
  "blocks",
  "trace",
  "cascade",
  "eclipse",
  "loading",
  "classic",
  "flip",
  "clock",
  "morph",
  "wave",
  "orbit",
];

const EASED = new Set<SpinnerName>(["arc", "clock", "trace"]);

export default function Grid() {
  return (
    <main className="flex min-h-dvh items-center justify-center">
      <div className="grid grid-cols-4">
        {PICKS.map((name) => {
          const Spinner = SPINNERS[name] as ComponentType<
            SpinnerProps & EasingProps
          >;
          return (
            <div className="flex size-24 items-center justify-center" key={name}>
              <Spinner
                easing={EASED.has(name) ? "stacked" : undefined}
                size={32}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
