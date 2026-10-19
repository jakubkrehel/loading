import { SPINNERS, type SpinnerName } from "loading-dev";

const Clock = SPINNERS.clock;

const PICKS: SpinnerName[] = [
  "leap",
  "clock",
  "eclipse",
  "classic",
  "loading",
  "orbit",
  "morph",
  "gather",
  "flip",
];

export default function Grid() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-white dark:bg-transparent">
      <div className="grid grid-cols-3">
        {PICKS.map((name) => {
          const Spinner = SPINNERS[name];
          return (
            <div
              className="flex h-28 w-40 items-center justify-center"
              key={name}
            >
              {name === "clock" ? (
                <Clock easing="stacked" size={52} />
              ) : (
                <Spinner size={name === "gather" ? 46 : 52} />
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
