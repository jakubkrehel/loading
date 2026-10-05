import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootDocument } from "@/app/root-document";
import "@/styles/globals.css";

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: "loading.dev › Gallery",
};

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return (
    <RootDocument className="bg-background-subtle">{children}</RootDocument>
  );
}
