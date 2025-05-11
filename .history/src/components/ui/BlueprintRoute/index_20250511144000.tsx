"use client";
import { useEffect, useState } from "react";

export default function BlueprintRoute() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="w-full h-full bg-gradient-to-b from-background-dark to-background-black opacity-50" />
    </div>
  );
}
