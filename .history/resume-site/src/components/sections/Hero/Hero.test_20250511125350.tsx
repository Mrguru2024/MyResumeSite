import { render, screen } from "@testing-library/react";
import Hero from "./index";

describe("Hero", () => {
  it("renders the hero section with correct content", () => {
    render(<Hero />);

    // Check for main heading
    expect(screen.getByText(/Anthony "Mrguru" Feaster/i)).toBeInTheDocument();

    // Check for subtitle
    expect(
      screen.getByText(
        /Full Stack Developer \| Locksmith Lead \| Low Voltage Specialist/i,
      ),
    ).toBeInTheDocument();

    // Check for tagline
    expect(
      screen.getByText(/I fix. I code. I lead. I build what's needed./i),
    ).toBeInTheDocument();

    // Check for CTA button
    expect(
      screen.getByRole("button", { name: /Begin Journey/i }),
    ).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    render(<Hero />);

    // Check for semantic HTML structure
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
