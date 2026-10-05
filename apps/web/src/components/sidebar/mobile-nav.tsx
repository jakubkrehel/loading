"use client";

import { Dialog } from "@base-ui/react/dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { Logo } from "@/components/ui/logo";
import { NavigationMobileIcon } from "@/components/ui/navigation-mobile-icon";
import { Text } from "@/components/ui/text";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/lib/navigation";
import { useBreakpointChange } from "@/lib/use-breakpoint-change";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useBreakpointChange(() => setOpen(false));

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <header className="flex h-16 items-center justify-between gap-2 px-5 sm:px-6 md:hidden">
        <Logo />
        <Dialog.Trigger
          render={
            <IconButton
              aria-label="Open navigation"
              className="-mr-2"
              rounded
              variant="ghost"
            >
              <NavigationMobileIcon isExpanded={open} />
            </IconButton>
          }
        />
      </header>

      <Dialog.Portal keepMounted>
        <Dialog.Popup className="fixed inset-0 z-50 flex flex-col bg-surface px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] outline-hidden transition-opacity duration-100 ease-out data-closed:opacity-0 data-starting-style:opacity-0 sm:px-6">
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>

          <div className="flex h-16 shrink-0 items-center justify-between">
            <Logo />
            <Dialog.Close
              render={
                <IconButton
                  aria-label="Close navigation"
                  className="-mr-2"
                  rounded
                  variant="ghost"
                >
                  <NavigationMobileIcon isExpanded={open} />
                </IconButton>
              }
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
            <nav className="pb-4">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Dialog.Close
                      nativeButton={false}
                      render={
                        <Text
                          aria-current={
                            pathname === item.href ? "page" : undefined
                          }
                          as={Link}
                          className="flex h-12 w-full items-center text-content"
                          href={item.href}
                          size="xl"
                          weight="medium"
                        >
                          {item.label}
                        </Text>
                      }
                    />
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto border-border border-t pt-4">
              <ul className="flex flex-col">
                {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                  <li key={label}>
                    <Text
                      as="a"
                      className="flex h-10 w-full items-center gap-3 text-content-subtle"
                      href={href}
                      rel="noreferrer"
                      size="base"
                      target="_blank"
                      weight="medium"
                    >
                      <Icon className="size-5 shrink-0" />
                      {label}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
