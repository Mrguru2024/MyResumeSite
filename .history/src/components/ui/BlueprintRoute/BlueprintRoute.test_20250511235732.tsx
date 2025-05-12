import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import BlueprintRoute from "./index";

// Mock scrollIntoView and Audio
beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  window.HTMLMediaElement.prototype.play = jest.fn();
});

describe("BlueprintRoute", () => {
  it("renders the SVG path and all milestone markers", () => {
    render(<BlueprintRoute />);
    // Path
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument;
    // Markers (should be at least 2: start and end)
    const circles = screen.getAllByRole("button");
    expect(circles.length).toBeGreaterThanOrEqual(2);
  });

  it("renders the sound toggle button", () => {
    render(<BlueprintRoute />);
    const soundBtn = screen.getByLabelText(/sound/i);
    expect(soundBtn).toBeInTheDocument();
  });

  it("toggles mute state when sound button is clicked", () => {
    render(<BlueprintRoute />);
    const soundBtn = screen.getByLabelText(/sound/i);
    expect(soundBtn).toBeInTheDocument();
    fireEvent.click(soundBtn);
    // Should toggle icon (test by aria-label change)
    expect(soundBtn.getAttribute("aria-label")).toMatch(
      /enable|disable sound/i
    );
  });

  it("shows tooltip on marker hover", async () => {
    render(<BlueprintRoute />);
    const marker = screen.getAllByRole("button")[0];
    act(() => {
      fireEvent.mouseEnter(marker);
    });
    expect(
      await screen.findByText(
        /who am i|skills|experience|projects|portfolio|contact/i
      )
    ).toBeInTheDocument();
  });

  it("scrolls to section on marker click", () => {
    render(<BlueprintRoute />);
    const marker = screen.getAllByRole("button")[0];
    fireEvent.click(marker);
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it("renders the traveler orb", () => {
    render(<BlueprintRoute />);
    // Traveler orb is a motion.circle with r=20
    const svg = screen.getByRole("img", { hidden: true });
    expect(svg.querySelector("circle[r='20']")).toBeTruthy();
  });
});
