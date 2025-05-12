import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import About from "./index";

describe("About", () => {
  it("renders the about section with correct content", () => {
    render(<About />);

    // Check for section heading
    expect(screen.getByText(/About Me/i)).toBeInTheDocument();

    // Check for name
    expect(screen.getByText(/Anthony "Mrguru" Feaster/i)).toBeInTheDocument();

    // Check for summary text
    expect(
      screen.getByText(
        /A versatile professional bridging the gap between technology and hands-on expertise./i,
      ),
    ).toBeInTheDocument();
  });

  it("flips the card when clicked", () => {
    render(<About />);

    // Initially, the back content should not be visible
    expect(screen.queryByText(/Professional Summary/i)).not.toBeInTheDocument();

    // Click the card
    const card = screen.getByRole("button");
    fireEvent.click(card);

    // After clicking, the back content should be visible
    expect(screen.getByText(/Professional Summary/i)).toBeInTheDocument();
    expect(
      screen.getByText(/As a Full Stack Developer and Field Technician/i),
    ).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    render(<About />);

    // Check for semantic HTML structure
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });
});
