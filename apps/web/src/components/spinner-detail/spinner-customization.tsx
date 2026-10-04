"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import type { SpinnerItem, SpinnerOptions } from "@/lib/catalog";
import { type Customization, initialCustomization } from "@/lib/customization";

interface CustomizationContextValue {
  customization: Customization;
  item: SpinnerItem;
  paused: boolean;
  reset: () => void;
  setOption: <K extends keyof SpinnerOptions>(
    prop: K,
    value: NonNullable<SpinnerOptions[K]>
  ) => void;
  togglePaused: () => void;
  update: (patch: Partial<Customization>) => void;
}

const CustomizationContext = createContext<CustomizationContextValue | null>(
  null
);

export function CustomizationProvider({
  children,
  item,
}: {
  children: ReactNode;
  item: SpinnerItem;
}) {
  const [customization, setCustomization] = useState(() =>
    initialCustomization(item)
  );
  const [paused, setPaused] = useState(false);

  const value: CustomizationContextValue = {
    customization,
    item,
    paused,
    reset: () => setCustomization(initialCustomization(item)),
    setOption: (prop, option) =>
      setCustomization((previous) => ({
        ...previous,
        options: { ...previous.options, [prop]: option },
      })),
    togglePaused: () => setPaused((previous) => !previous),
    update: (patch) =>
      setCustomization((previous) => ({ ...previous, ...patch })),
  };

  return (
    <CustomizationContext.Provider value={value}>
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization(): CustomizationContextValue {
  const value = useContext(CustomizationContext);
  if (!value) {
    throw new Error(
      "useCustomization must be used inside a CustomizationProvider"
    );
  }
  return value;
}
