import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Skills from "./index";

describe("Skills", () => {
  it("renders the skills section and all skills by default", () => {
    render(<Skills />);

    // Check for section heading with proper heading level
    const sectionHeading = screen.getByRole("heading", { level: 2 });
    expect(sectionHeading).toHaveTextContent(/Skills/i);

    // Check for proper section landmark
    const section = screen.getByRole("region", { name: /Skills/i });
    expect(section).toBeInTheDocument();

    // Check for filter buttons
    const filterButtons = screen.getAllByRole("button", {
      name: /All|Software|Field Technician|Low Voltage/i,
    });
    expect(filterButtons.length).toBeGreaterThan(0);

    // Check for skill cards
    const skillCards = screen.getAllByRole("button", {
      name: /View details for/i,
    });
    expect(skillCards.length).toBeGreaterThan(0);

    // Check for specific skills
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/Node.js/i)).toBeInTheDocument();
    expect(screen.getByText(/Locksmithing/i)).toBeInTheDocument();
  });

  it("filters skills by category", () => {
    render(<Skills />);

    // Get all filter buttons
    const filterButtons = screen.getAllByRole("button", {
      name: /All|Software|Field Technician|Low Voltage/i,
    });

    // Click Field Technician filter
    fireEvent.click(screen.getByRole("button", { name: /Field Technician/i }));

    // Check if only field technician skills are shown
    expect(screen.getByText(/Locksmithing/i)).toBeInTheDocument();
    expect(screen.queryByText(/React/i)).not.toBeInTheDocument();

    // Check if filter button has active state
    const activeFilter = screen.getByRole("button", {
      name: /Field Technician/i,
    });
    expect(activeFilter).toHaveAttribute("aria-pressed", "true");
  });

  it("opens and closes the skill modal on card click", () => {
    render(<Skills />);

    // Click a skill card
    const skillCard = screen.getByRole("button", {
      name: /View details for React/i,
    });
    fireEvent.click(skillCard);

    // Check if modal is opened with correct content
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText(/Modern UI development/i)).toBeInTheDocument();

    // Check if modal has proper heading
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      /React/i,
    );

    // Close modal
    const closeButton = screen.getByRole("button", { name: /Close/i });
    fireEvent.click(closeButton);

    // Check if modal is closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has accessible roles and labels", () => {
    render(<Skills />);

    // Check for proper button roles and labels
    expect(screen.getByRole("button", { name: /All/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /View details for React/i }),
    ).toBeInTheDocument();

    // Check for proper list structure
    const skillLists = screen.getAllByRole("list");
    expect(skillLists.length).toBeGreaterThan(0);

    // Check for proper list items
    const skillItems = screen.getAllByRole("listitem");
    expect(skillItems.length).toBeGreaterThan(0);
  });

  it("has proper keyboard navigation", () => {
    render(<Skills />);

    // Check if filter buttons are focusable
    const filterButton = screen.getByRole("button", { name: /All/i });
    filterButton.focus();
    expect(filterButton).toHaveFocus();

    // Check if skill cards are focusable
    const skillCard = screen.getByRole("button", {
      name: /View details for React/i,
    });
    skillCard.focus();
    expect(skillCard).toHaveFocus();

    // Test keyboard interaction with modal
    fireEvent.keyDown(skillCard, { key: "Enter" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /Close/i });
    fireEvent.keyDown(closeButton, { key: "Enter" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
