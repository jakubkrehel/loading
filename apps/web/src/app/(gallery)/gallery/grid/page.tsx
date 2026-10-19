import { SPINNERS, type SpinnerName } from "loading-dev";

const PICKS: SpinnerName[] = [
  "gather",
  "cascade",
  "eclipse",
  "classic",
  "loading",
  "flip",
  "morph",
  "wave",
  "orbit",
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
              <Spinner size={52} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
