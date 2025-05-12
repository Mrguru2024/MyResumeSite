import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("opens and closes the skill modal on card click", async () => {
    render(<Skills />);

    // Click a skill card
    const skillCard = screen.getByRole("button", {
      name: /View details for React/i,
    });
    fireEvent.click(skillCard);

    // Check if modal is opened with correct content
    const modal = await screen.findByRole("dialog");
    expect(modal).toBeInTheDocument();
    expect(
      within(modal).getByText(/Modern UI development/i),
    ).toBeInTheDocument();

    // Check if modal has proper heading
    expect(within(modal).getByRole("heading", { level: 3 })).toHaveTextContent(
      /React/i,
    );

    // Close modal
    const closeButton = within(modal).getByRole("button", { name: /Close/i });
    fireEvent.click(closeButton);

    // Wait for modal to be removed
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
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

  it("has proper keyboard navigation", async () => {
    render(<Skills />);

    // Tab to filter button
    await userEvent.tab();
    const filterButton = screen.getByRole("button", { name: /All/i });
    expect(filterButton).toHaveFocus();

    // Tab to skill card
    await userEvent.tab();
    const skillCard = screen.getByRole("button", {
      name: /View details for React/i,
    });
    expect(skillCard).toHaveFocus();

    // Press Enter to open modal
    await userEvent.keyboard("{Enter}");
    const modal = await screen.findByRole("dialog");
    expect(modal).toBeInTheDocument();

    // Tab to close button
    await userEvent.tab();
    const closeButton = within(modal).getByRole("button", { name: /Close/i });
    expect(closeButton).toHaveFocus();
    // Press Enter to close modal
    await userEvent.keyboard("{Enter}");
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  });
});
