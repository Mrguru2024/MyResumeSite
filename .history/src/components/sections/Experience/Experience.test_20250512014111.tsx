import React from "react";
import { render, screen } from "@testing-library/react";
import Experience from "./index";

describe("Experience", () => {
  it("renders the experience section and all roles", () => {
    render(<Experience />);

    // Check for section heading with proper heading level
    const sectionHeading = screen.getByRole("heading", { level: 2 });
    expect(sectionHeading).toHaveTextContent(/Experience/i);

    // Check for proper section landmark
    const section = screen.getByRole("region", { name: /Experience/i });
    expect(section).toBeInTheDocument();

    // Check for all role headings with proper heading level
    const roleHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(roleHeadings).toHaveLength(6); // Total number of roles

    // Check for specific roles
    expect(
      screen.getByText(/Electronic Repair Technician & Locksmith/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Web Development Project/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Low Voltage\/Network Installation Technician/i),
    ).toBeInTheDocument();
  });

  it("renders timeline dots and cards in order", () => {
    render(<Experience />);

    // Get all role headings
    const roles = screen.getAllByRole("heading", { level: 3 });

    // Check order of roles
    expect(roles[0]).toHaveTextContent(
      "Electronic Repair Technician & Locksmith",
    );
    expect(roles[1]).toHaveTextContent("Web Development Project");
    expect(roles[2]).toHaveTextContent(
      "Low Voltage/Network Installation Technician",
    );
    expect(roles[3]).toHaveTextContent(
      "Locksmith | Mobile Locksmith Technician",
    );
    expect(roles[4]).toHaveTextContent(
      "Technical Repair and Inventory Specialist",
    );
    expect(roles[5]).toHaveTextContent("Floor Tech Supervisor");
  });

  it("has accessible section and headings", () => {
    render(<Experience />);

    // Check for proper section landmark
    const section = screen.getByRole("region", { name: /Experience/i });
    expect(section).toBeInTheDocument();

    // Check for proper heading structure
    const mainHeading = screen.getByRole("heading", {
      name: /Experience/i,
      level: 2,
    });
    expect(mainHeading).toBeInTheDocument();

    // Check for proper list structure
    const lists = screen.getAllByRole("list");
    expect(lists).toHaveLength(6); // One list per role

    // Check for proper list items
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(0);
  });

  it("has proper timeline structure", () => {
    render(<Experience />);

    // Check for timeline container
    const timeline = screen.getByRole("list");
    expect(timeline).toHaveAttribute("aria-label", "Experience Timeline");

    // Check for timeline dots
    const timelineDots = screen.getAllByRole("presentation");
    expect(timelineDots.length).toBeGreaterThan(0);

    // Check for proper date formatting
    const dates = screen.getAllByText(
      /January|February|March|April|May|June|July|August|September|October|November|December/i,
    );
    expect(dates.length).toBeGreaterThan(0);
  });
});
