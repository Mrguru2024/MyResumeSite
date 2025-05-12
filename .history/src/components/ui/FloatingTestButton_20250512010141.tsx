"use client";
import React from "react";

export default function FloatingTestButton() {
  return (
    <button
      style={{
        position: "fixed",
        top: 24,
        left: 24,
        zIndex: 2147483647,
        background: "blue",
        color: "white",
        pointerEvents: "auto",
        fontSize: 24,
        padding: "16px 32px",
      }}
      onClick={() => alert("Top-level React button clicked")}
    >
      Top-level React Button
    </button>
  );
}
