import React from "react";
import { render, screen } from "@testing-library/react";
import Experience from "./Experience";

describe("Experience", () => {
  it("renders the experience section and all roles", () => {
    render(<Experience />);

    // Check for section heading
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /Experience/i,
    });
    expect(heading).toBeInTheDocument();

    // Check for all role headings
    const roleHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(roleHeadings).toHaveLength(8); // Adjust this number based on your actual roles

    // Check for specific roles
    expect(
      screen.getByText("Electronic Repair Technician & Locksmith"),
    ).toBeInTheDocument();
    expect(screen.getByText("Web Development Project")).toBeInTheDocument();
    expect(
      screen.getByText("Low Voltage/Network Installation Technician"),
    ).toBeInTheDocument();
  });

  it("renders timeline dots and cards in order", () => {
    render(<Experience />);

    // Check for timeline dots
    const dots = screen.getAllByRole("presentation");
    expect(dots).toHaveLength(8); // Adjust this number based on your actual roles

    // Check for role cards in order
    const roleCards = screen.getAllByRole("article");
    expect(roleCards).toHaveLength(8); // Adjust this number based on your actual roles

    // Verify the order of roles
    const roleHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(roleHeadings[0]).toHaveTextContent(
      "Electronic Repair Technician & Locksmith",
    );
    expect(roleHeadings[1]).toHaveTextContent("Web Development Project");
    expect(roleHeadings[2]).toHaveTextContent(
      "Low Voltage/Network Installation Technician",
    );
  });

  it("has accessible section and headings", () => {
    render(<Experience />);

    // Check for proper section landmark
    const section = screen.getByRole("region", { name: /Experience/i });
    expect(section).toBeInTheDocument();

    // Check for proper heading structure
    const mainHeading = screen.getByRole("heading", { level: 2 });
    expect(mainHeading).toHaveTextContent("Experience");

    const roleHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(roleHeadings.length).toBeGreaterThan(0);
  });

  it("has proper timeline structure", () => {
    render(<Experience />);

    // Check for timeline container
    const timeline = screen.getByTestId("timeline-container");
    expect(timeline).toBeInTheDocument();

    // Check for timeline dots
    const dots = screen.getAllByRole("presentation");
    expect(dots.length).toBeGreaterThan(0);

    // Check for proper date formatting
    const dates = screen.getAllByText(
      /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/,
    );
    expect(dates.length).toBeGreaterThan(0);
  });
});
