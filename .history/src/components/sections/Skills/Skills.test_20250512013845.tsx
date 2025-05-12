import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Skills from "./index";

describe("Skills", () => {
  it("renders the skills section and all skills by default", () => {
    render(<Skills />);
    expect(screen.getByText(/Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/Node.js/i)).toBeInTheDocument();
    expect(screen.getByText(/Locksmithing/i)).toBeInTheDocument();
  });

  it("filters skills by category", () => {
    render(<Skills />);
    fireEvent.click(screen.getByRole("button", { name: /Field Technician/i }));
    expect(screen.getByText(/Locksmithing/i)).toBeInTheDocument();
    expect(screen.queryByText(/React/i)).not.toBeInTheDocument();
  });

  it("opens and closes the skill modal on card click", () => {
    render(<Skills />);
    fireEvent.click(
      screen.getByRole("button", { name: /View details for React/i }),
    );
    expect(screen.getByText(/Modern UI development/i)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/Close/i));
    expect(
      screen.queryByText(/Modern UI development/i),
    ).not.toBeInTheDocument();
  });

  it("has accessible roles and labels", () => {
    render(<Skills />);
    expect(screen.getByRole("button", { name: /All/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /View details for React/i }),
    ).toBeInTheDocument();
  });
});
