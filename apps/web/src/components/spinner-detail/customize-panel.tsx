"use client";

import { ResetIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { SliderRow } from "@/components/ui/slider-row";
import { SIZES } from "@/lib/customization";
import { cn } from "@/lib/utils";
import { ColorPickerRow } from "./color-picker-row";
import { useCustomization } from "./spinner-customization";

export function CustomizePanel({ className }: { className?: string }) {
  const { customization, item, reset, setOption, update } = useCustomization();

  return (
    <div
      className={cn(
        "flex h-full w-full shrink-0 flex-col gap-2 rounded-xl bg-background p-2 sm:w-60",
        className
      )}
    >
      <SegmentedControl
        label="Size"
        onValueChange={(size) => update({ size })}
        options={SIZES}
        value={customization.size}
      />
      {item.options?.map((option) => (
        <SegmentedControl
          key={option.prop}
          label={option.label}
          onValueChange={(value) => setOption(option.prop, value)}
          options={option.values}
          value={customization.options[option.prop] ?? option.defaultValue}
        />
      ))}
      <ColorPickerRow
        color={customization.color}
        onChange={(color) => update({ color })}
        onOpacityChange={(opacity) => update({ opacity })}
        opacity={customization.opacity}
      />
      <SliderRow
        format={(value) => `${value}ms`}
        inverted
        label="Speed"
        max={item.speed.max}
        min={item.speed.min}
        onChange={(speedMs) => update({ speedMs })}
        step={10}
        value={customization.speedMs}
      />
      <SliderRow
        format={(value) => `${value}%`}
        label="Opacity"
        max={100}
        min={0}
        onChange={(opacity) => update({ opacity })}
        step={1}
        value={customization.opacity}
      />
      <div className="mt-auto flex justify-center">
        <Button onClick={reset} type="button" variant="ghost">
          <ResetIcon className="size-4 shrink-0" />
          Reset
        </Button>
      </div>
    </div>
  );
}
