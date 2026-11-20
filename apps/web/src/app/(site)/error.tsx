"use client";

import { useEffect, useState } from "react";

const RELOADED_AT_KEY = "chunk-reloaded-at";
const RELOAD_COOLDOWN_MS = 10_000;

function isChunkLoadError(error: unknown) {
  return (
    error instanceof Error &&
    (error.name === "ChunkLoadError" ||
      error.message.startsWith("Failed to load chunk"))
  );
}

function canReload() {
  try {
    const reloadedAt = Number(sessionStorage.getItem(RELOADED_AT_KEY));
    return Date.now() - reloadedAt > RELOAD_COOLDOWN_MS;
  } catch {
    return false;
  }
}

export default function SiteError({ error }: { error: unknown }) {
  const [reloading] = useState(() => isChunkLoadError(error) && canReload());

  useEffect(() => {
    if (!(reloading && canReload())) {
      return;
    }
    sessionStorage.setItem(RELOADED_AT_KEY, String(Date.now()));
    window.location.reload();
  }, [reloading]);

  if (!reloading) {
    throw error;
  }

  return null;
}
