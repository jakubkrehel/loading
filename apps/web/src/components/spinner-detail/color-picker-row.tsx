"use client";

import { useRef } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import {
  CONTROL_SURFACE,
  ControlLabel,
  ControlValue,
} from "@/components/ui/control";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import { useInheritedColor } from "@/lib/use-inherited-color";
import { cn } from "@/lib/utils";
import { PercentInput } from "./percent-input";

const FIELD =
  "flex h-8 pointer-coarse:h-10 items-center gap-2 rounded-lg bg-popover-hovered px-2 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-popover-content has-[input:focus-visible]:outline-offset-0";
const FIELD_INPUT =
  "min-w-0 flex-1 bg-transparent font-mono text-popover-content text-xs outline-none";

export function ColorPickerRow({
  color,
  onChange,
  onOpacityChange,
  opacity,
}: {
  color: string | null;
  onChange: (color: string) => void;
  onOpacityChange: (percent: number) => void;
  opacity: number;
}) {
  const swatchRef = useRef<HTMLSpanElement>(null);
  const inheritedColor = useInheritedColor(swatchRef);
  const pickerColor = color ?? inheritedColor;

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          CONTROL_SURFACE,
          "group flex w-full shrink-0 items-center justify-between px-2 transition-colors duration-200 ease-out data-popup-open:inset-ring data-popup-open:inset-ring-border data-popup-open:bg-background-hovered"
        )}
      >
        <ControlLabel>Color</ControlLabel>
        <span className="flex items-center gap-2">
          <ControlValue className="uppercase">{pickerColor}</ControlValue>
          <span
            aria-hidden="true"
            className="size-4 rounded-sm border border-border bg-current text-content"
            ref={swatchRef}
            style={color ? { backgroundColor: color } : undefined}
          />
        </span>
      </PopoverTrigger>
      {pickerColor !== null && (
        <PopoverContent
          align="end"
          aria-label="Choose a color"
          className="flex flex-col gap-2 rounded-2xl p-2"
        >
          <HexColorPicker
            className="color-picker"
            color={pickerColor}
            onChange={onChange}
          />
          <div className="flex w-50 gap-2">
            <div className={cn(FIELD, "min-w-0 flex-1")}>
              <Text as="span" className="text-popover-content-subtle" size="sm">
                #
              </Text>
              <HexColorInput
                aria-label="Hex color"
                className={cn(FIELD_INPUT, "text-right uppercase")}
                color={pickerColor}
                onChange={onChange}
              />
            </div>
            <div className={cn(FIELD, "w-15.5")}>
              <PercentInput
                className={FIELD_INPUT}
                label="Opacity"
                onChange={onOpacityChange}
                value={opacity}
              />
            </div>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
