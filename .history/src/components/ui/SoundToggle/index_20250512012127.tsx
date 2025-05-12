"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const stored = localStorage.getItem("blueprintroute-muted");
    if (stored === "true") setIsMuted(true);
  }, []);

  // Listen for changes to localStorage
  useEffect(() => {
    if (!hasMounted) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "blueprintroute-muted") {
        setIsMuted(e.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [hasMounted]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newState = !prev;
      try {
        localStorage.setItem(
          "blueprintroute-muted",
          newState ? "true" : "false"
        );
        // Dispatch a storage event to notify other components
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: "blueprintroute-muted",
            newValue: newState ? "true" : "false",
            oldValue: prev ? "true" : "false",
            storageArea: localStorage,
          })
        );
      } catch (error) {
        console.error("Error setting localStorage:", error);
      }
      return newState;
    });
  };

  if (!hasMounted) return null;

  const button = (
    <button
      onClick={toggleMute}
      className="fixed top-4 left-4 z-[999999] bg-red-500 border-4 border-yellow-400 rounded-full p-4 shadow-2xl hover:scale-110 transition-transform cursor-pointer"
      style={{
        position: "fixed",
        zIndex: 999999,
        pointerEvents: "auto",
        isolation: "isolate",
      }}
      aria-label={isMuted ? "Enable sound" : "Disable sound"}
    >
      {isMuted ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );

  return createPortal(button, document.body, "sound-toggle-portal");
}
