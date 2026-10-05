export const buttonVariants = {
  ghost:
    "bg-transparent text-content-subtle hover-hover:hover:not-disabled:bg-background hover-hover:hover:not-disabled:text-content",
  primary: "bg-content text-surface",
  secondary:
    "bg-modal text-content shadow-custom hover-hover:hover:not-disabled:bg-modal-hovered",
  tertiary:
    "bg-background text-content-subtle hover-hover:hover:not-disabled:bg-background-hovered hover-hover:hover:not-disabled:text-content",
};

export type ButtonVariant = keyof typeof buttonVariants;

export const BUTTON_BASE =
  "group flex shrink-0 cursor-pointer items-center justify-center transition-[scale,background-color,color] duration-200 ease-out active:scale-[0.97] will-change-transform";

export const FIELD_BUTTON =
  "group flex h-8 w-full cursor-pointer items-center gap-2 rounded-lg border border-border text-left transition-colors duration-200 ease-out";
