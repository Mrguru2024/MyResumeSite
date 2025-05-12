import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import About from "./index";

describe("About", () => {
  it("renders the about section with correct content", () => {
    render(<About />);

    // Check for section heading with proper heading level
    const sectionHeading = screen.getByRole("heading", { level: 2 });
    expect(sectionHeading).toHaveTextContent(/About Me/i);

    // Check for name with proper heading level
    const nameHeading = screen.getByRole("heading", { level: 3 });
    expect(nameHeading).toHaveTextContent(/Anthony "Mrguru" Feaster/i);

    // Check for summary text with proper aria-label
    const summaryText = screen.getByText(
      /A versatile professional bridging the gap between technology and hands-on expertise./i,
    );
    expect(summaryText).toBeInTheDocument();

    // Check for proper section landmark
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("flips the card when clicked", () => {
    render(<About />);

    // Initially, the back content should not be visible
    expect(screen.queryByText(/Professional Summary/i)).not.toBeInTheDocument();

    // Click the card
    const card = screen.getByRole("button", { name: /About card front/i });
    fireEvent.click(card);

    // After clicking, the back content should be visible
    expect(screen.getByText(/Professional Summary/i)).toBeInTheDocument();
    expect(
      screen.getByText(/As a Full Stack Developer and Field Technician/i),
    ).toBeInTheDocument();

    // Check if aria-pressed state changes
    expect(card).toHaveAttribute("aria-pressed", "true");
  });

  it("has correct accessibility attributes", () => {
    render(<About />);

    // Check for semantic HTML structure
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();

    // Check for proper button attributes
    const card = screen.getByRole("button");
    expect(card).toHaveAttribute("type", "button");
    expect(card).toHaveAttribute("aria-pressed", "false");
    expect(card).toHaveAttribute("aria-label", "About card front");

    // Check for proper image attributes
    const profileImage = screen.getByRole("img", {
      name: /Anthony 'Mrguru' Feaster profile photo/i,
    });
    expect(profileImage).toHaveAttribute("alt");
    expect(profileImage).toHaveAttribute("width");
    expect(profileImage).toHaveAttribute("height");
    expect(profileImage).toHaveAttribute("priority");
  });

  it("has proper keyboard navigation", () => {
    render(<About />);

    // Check if card is focusable
    const card = screen.getByRole("button");
    card.focus();
    expect(card).toHaveFocus();

    // Test keyboard interaction
    fireEvent.keyDown(card, { key: "Enter" });
    expect(card).toHaveAttribute("aria-pressed", "true");
  });
});
