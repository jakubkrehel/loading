import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useId } from "react";
import { BUTTON_BASE, buttonVariants } from "@/components/ui/button-styles";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const INTERFACES_URL = "https://interfaces.dev/?utm_source=loading.dev";

export function InterfacesCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl bg-surface p-1.5 shadow-custom",
        className
      )}
    >
      <div className="flex flex-col gap-2 px-2 pt-2 pb-1.5">
        <Text
          as="span"
          className="flex items-center gap-2 text-content"
          size="sm"
          weight="medium"
        >
          <InterfacesLogo className="size-5 shrink-0" />
          Interfaces
        </Text>
        <Text as="span" className="text-content-subtle" size="sm">
          Interested in learning more about design engineering? Check out my
          magazine, Interfaces.
        </Text>
      </div>
      <a
        className={cn(
          BUTTON_BASE,
          buttonVariants.secondary,
          "h-8 w-full gap-1.5 rounded-md pr-1.5 pl-2.5 font-medium text-sm"
        )}
        href={INTERFACES_URL}
        rel="noreferrer"
        target="_blank"
      >
        Start reading
        <ChevronRightIcon aria-hidden="true" className="size-4" />
      </a>
    </div>
  );
}

const logoShade = (percent: number) =>
  `color-mix(in oklab, var(--color-content) ${percent}%, var(--color-surface))`;

function InterfacesLogo({ className }: { className?: string }) {
  const gradientId = useId();

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={gradientId}
          x1="0"
          x2="0"
          y1="0"
          y2="32"
        >
          <stop offset="0%" stopColor={logoShade(12)} />
          <stop offset="50%" stopColor={logoShade(50)} />
          <stop offset="100%" stopColor={logoShade(16)} />
        </linearGradient>
      </defs>
      <path
        d="M4 12.002C4 10.9797 4.67166 10.0789 5.65144 9.78706L13.9764 7.30769C15.4583 6.86635 16.9472 7.97645 16.9472 9.52265V25.4675C16.9472 26.4898 16.2755 27.3907 15.2958 27.6825L6.97077 30.1619C5.4889 30.6032 4 29.4931 4 27.9469V12.002Z"
        fill={logoShade(12)}
      />
      <path
        d="M9.57353 6.53417C9.57353 5.51185 10.2452 4.61101 11.225 4.3192L19.55 1.83983C21.0318 1.3985 22.5207 2.5086 22.5207 4.05479V19.9997C22.5207 21.022 21.8491 21.9228 20.8693 22.2146L12.5443 24.694C11.0624 25.1353 9.57353 24.0252 9.57353 22.479V6.53417Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M15.0528 12.002C15.0528 10.9797 15.7245 10.0789 16.7042 9.78706L25.0292 7.30769C26.5111 6.86636 28 7.97646 28 9.52265V25.4675C28 26.4898 27.3283 27.3907 26.3486 27.6825L18.0236 30.1619C16.5417 30.6032 15.0528 29.4931 15.0528 27.9469V12.002Z"
        fill={logoShade(22)}
      />
    </svg>
  );
}
