import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "./index";

describe("Hero", () => {
  it("renders the hero section with correct content", () => {
    render(<Hero />);

    // Check for main heading with proper heading level
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toHaveTextContent(/Anthony "Mrguru" Feaster/i);

    // Check for subtitle with proper heading level
    const subtitle = screen.getByRole("heading", { level: 2 });
    expect(subtitle).toHaveTextContent(
      /Full Stack Developer \| Locksmith Lead \| Low Voltage Specialist/i,
    );

    // Check for tagline with proper aria-label
    const tagline = screen.getByLabelText(
      /I fix. I code. I lead. I build what's needed./i,
    );
    expect(tagline).toBeInTheDocument();

    // Check for CTA button with proper role and name
    const ctaButton = screen.getByRole("button", { name: /Begin Journey/i });
    expect(ctaButton).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    render(<Hero />);

    // Check for semantic HTML structure
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();

    // Check for proper section landmark
    expect(screen.getByRole("region")).toBeInTheDocument();

    // Check for proper button attributes
    const ctaButton = screen.getByRole("button", { name: /Begin Journey/i });
    expect(ctaButton).toHaveAttribute("type", "button");
    expect(ctaButton).toHaveAttribute("data-journey-button");

    // Check for proper image attributes
    const profileImage = screen.getByRole("img", {
      name: /Anthony 'Mrguru' Feaster profile photo/i,
    });
    expect(profileImage).toHaveAttribute("alt");
    expect(profileImage).toHaveAttribute("width");
    expect(profileImage).toHaveAttribute("height");
  });

  it("has proper keyboard navigation", () => {
    render(<Hero />);

    // Check if button is focusable
    const ctaButton = screen.getByRole("button", { name: /Begin Journey/i });
    ctaButton.focus();
    expect(ctaButton).toHaveFocus();
  });
});
