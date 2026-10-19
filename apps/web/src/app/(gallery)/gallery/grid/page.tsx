import {
  type EasingProps,
  SPINNERS,
  type SpinnerName,
  type SpinnerProps,
} from "loading-dev";
import type { ComponentType } from "react";

const PICKS: SpinnerName[] = [
  "trace",
  "cascade",
  "eclipse",
  "classic",
  "loading",
  "flip",
  "morph",
  "wave",
  "orbit",
];

const EASED = new Set<SpinnerName>(["trace"]);

export default function Grid() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-white">
      <div className="grid grid-cols-3">
        {PICKS.map((name) => {
          const Spinner = SPINNERS[name] as ComponentType<
            SpinnerProps & EasingProps
          >;
          return (
            <div className="flex h-28 w-40 items-center justify-center" key={name}>
              <Spinner
                easing={EASED.has(name) ? "stacked" : undefined}
                size={name === "trace" ? 44 : 52}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
