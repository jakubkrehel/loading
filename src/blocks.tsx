import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { animation, SIZE, stagger } from "./motion";
import type { SpinnerProps } from "./types";

export type BlocksSweep = "columns" | "diagonal" | "rows";

export const DEFAULT_BLOCKS_SWEEP: BlocksSweep = "diagonal";

export interface BlocksProps extends SpinnerProps {
  sweep?: BlocksSweep;
}

const SIDE = 3;

interface Cell {
  col: number;
  row: number;
}

const CELLS: Cell[] = Array.from({ length: SIDE * SIDE }, (_, index) => ({
  col: index % SIDE,
  row: Math.floor(index / SIDE),
}));

const SWEEPS: Record<
  BlocksSweep,
  { count: number; place: (cell: Cell) => number }
> = {
  columns: { count: SIDE, place: ({ col }) => col },
  diagonal: { count: SIDE * 2 - 1, place: ({ col, row }) => row + col },
  rows: { count: SIDE, place: ({ row }) => row },
};

const css = `
.ld-blocks {
  display: grid;
  grid-template-columns: repeat(${SIDE}, 1fr);
  grid-template-rows: repeat(${SIDE}, 1fr);
  gap: calc(${SIZE} * 0.1);
  width: ${SIZE};
  height: ${SIZE};
}

.ld-blocks-cell {
  background: currentColor;
  border-radius: calc(${SIZE} * 0.0625);
  ${animation("blocks", "ld-blocks-sweep", "ease-in-out")}
}
${Object.entries(SWEEPS)
  .map(
    ([sweep, { count }]) => `
.ld-blocks-cell-${sweep} {
  animation-delay: ${stagger("blocks", count)};
}
`
  )
  .join("")}
@keyframes ld-blocks-sweep {
  0%,
  70%,
  100% {
    transform: scale(1);
  }
  35% {
    transform: scale(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-blocks-cell {
    transform: scale(0.8);
  }
}
`;

export function Blocks({ sweep = DEFAULT_BLOCKS_SWEEP, ...rest }: BlocksProps) {
  const { place } = SWEEPS[sweep];
  return (
    <>
      <SpinnerStyle name="blocks">{css}</SpinnerStyle>
      <div {...spinnerRoot("blocks", rest)}>
        {CELLS.map((cell) => (
          <div
            className={`ld-blocks-cell ld-blocks-cell-${sweep}`}
            key={`${cell.col}-${cell.row}`}
            style={step(place(cell))}
          />
        ))}
      </div>
    </>
  );
}
