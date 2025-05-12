import { render, screen, fireEvent } from "@testing-library/react";
import { About } from "./index";

describe("About Component", () => {
  it("renders the about card with title", () => {
    render(<About />);
    expect(screen.getByText("Anthony 'Mrguru' Feaster")).toBeInTheDocument();
  });

  it("shows initial front card content", () => {
    render(<About />);
    expect(
      screen.getByText("Click to learn more about my journey"),
    ).toBeInTheDocument();
  });

  it("flips card when clicked", () => {
    render(<About />);
    const card = screen.getByText("Anthony 'Mrguru' Feaster").closest("div");
    fireEvent.click(card!);

    // Check for content that should be visible after flip
    expect(
      screen.getByText(/A versatile professional with expertise spanning/),
    ).toBeInTheDocument();
  });
});
