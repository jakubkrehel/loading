"use client";

import { SPINNERS } from "loading-dev";
import { useEffect, useState } from "react";

const ENTRIES = Object.entries(SPINNERS);

const LINK =
  "cursor-pointer text-content-subtle text-sm transition-colors duration-200 ease-out hover-hover:hover:text-content";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [name, Spinner] = ENTRIES[index];

  const step = (delta: number) =>
    setIndex((current) => (current + delta + ENTRIES.length) % ENTRIES.length);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const delta = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
      if (delta && !event.repeat) {
        event.preventDefault();
        setIndex(
          (current) => (current + delta + ENTRIES.length) % ENTRIES.length
        );
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="flex min-h-dvh flex-col px-6 py-10">
      <div className="flex flex-1 items-center justify-center">
        <Spinner
          className={name === "loading" ? "text-orange" : undefined}
          key={name}
          size={96}
        />
      </div>
      <nav className="flex items-center justify-between">
        <button className={LINK} onClick={() => step(-1)} type="button">
          Previous
        </button>
        <button className={LINK} onClick={() => step(1)} type="button">
          Next
        </button>
      </nav>
    </main>
  );
}
