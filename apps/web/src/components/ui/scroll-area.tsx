import { ScrollArea } from "@base-ui/react/scroll-area";

export function ScrollAreaScrollbar() {
  return (
    <ScrollArea.Scrollbar
      className="my-1 me-px w-1.5 opacity-0 transition-opacity duration-100 ease-out data-hovering:opacity-100 data-scrolling:opacity-100"
      orientation="vertical"
    >
      <ScrollArea.Thumb className="w-full rounded-full bg-content-subtle/40" />
    </ScrollArea.Scrollbar>
  );
}
