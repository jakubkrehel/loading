"use client";

import { Slider } from "@base-ui/react/slider";
import { useEffect, useRef, useState } from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const FOCUS_RING =
  "has-focus-visible:outline-2 has-focus-visible:outline-content has-focus-visible:outline-offset-2";

const TICKS = Array.from({ length: 9 }, (_, index) => index);

export function SliderRow({
  format,
  inverted = false,
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  format: (value: number) => string;
  inverted?: boolean;
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  const position = (amount: number) => (inverted ? max + min - amount : amount);
  const [isHandleOverText, setIsHandleOverText] = useState(false);
  const labelRef = useRef<HTMLSpanElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const labelElement = labelRef.current;
    const valueElement = valueRef.current;
    if (!(track && labelElement && valueElement)) {
      return;
    }

    const measure = () => {
      const handle = handleRef.current?.getBoundingClientRect();
      if (handle) {
        setIsHandleOverText(
          [labelElement, valueElement].some((element) => {
            const text = element.getBoundingClientRect();
            return handle.right >= text.left && handle.left <= text.right;
          })
        );
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(labelElement);
    observer.observe(valueElement);
    return () => observer.disconnect();
  }, [value]);

  return (
    <Slider.Root
      className={cn("group relative rounded-lg", FOCUS_RING)}
      max={max}
      min={min}
      onValueChange={(next) => onChange(position(next))}
      step={step}
      thumbAlignment="edge"
      value={position(value)}
    >
      <Slider.Control
        className="relative h-8 pointer-coarse:h-10 w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-lg bg-background"
        ref={trackRef}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-around opacity-0 transition-opacity duration-200 ease-out hover-hover:group-hover:opacity-100 group-data-dragging:opacity-100 motion-reduce:transition-none"
        >
          {TICKS.map((tick) => (
            <span className="h-1.75 w-px rounded-full bg-border" key={tick} />
          ))}
        </span>
        <Slider.Indicator className="absolute inset-y-0 bg-background" />
        <Slider.Thumb
          aria-label={label}
          className="z-10 h-4 w-0.75 outline-none"
          getAriaValueText={(_formatted, raw) => format(position(raw))}
          ref={handleRef}
        >
          <span
            aria-hidden="true"
            className={cn(
              "block size-full scale-[0.8] rounded-full opacity-0 transition-[opacity,scale,background-color] duration-300 ease-out motion-reduce:transition-none",
              isHandleOverText
                ? "bg-content-subtle/50 group-data-dragging:scale-[0.92] group-data-dragging:opacity-55"
                : "bg-content-subtle group-data-dragging:scale-100 group-data-dragging:opacity-80"
            )}
          />
        </Slider.Thumb>
        <span
          className="pointer-events-none absolute inset-y-0 left-2 z-20 flex items-center"
          ref={labelRef}
        >
          <Text
            as="span"
            className="select-none text-content-subtle transition-colors duration-150 hover-hover:group-hover:text-content group-data-dragging:text-content"
            size="sm"
            weight="medium"
          >
            {label}
          </Text>
        </span>
        <span
          className="pointer-events-none absolute inset-y-0 right-2 z-20 flex select-none items-center font-paper-mono text-[12px] text-content-subtle transition-colors duration-200 ease-out hover-hover:group-hover:text-content group-data-dragging:text-content"
          ref={valueRef}
        >
          {format(value)}
        </span>
      </Slider.Control>
    </Slider.Root>
  );
}
