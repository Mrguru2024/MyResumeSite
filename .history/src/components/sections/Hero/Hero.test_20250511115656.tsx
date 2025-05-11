import { render, screen } from "@testing-library/react";
import { Hero } from "./index";

describe("Hero Component", () => {
  const mockProps = {
    title: 'Anthony "Mrguru" Feaster',
    subtitle: "I fix. I code. I lead. I build what's needed.",
  };

  it("renders the hero section with title and subtitle", () => {
    render(<Hero {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.subtitle)).toBeInTheDocument();
  });

  it("renders the begin journey button", () => {
    render(<Hero {...mockProps} />);

    expect(screen.getByText("Begin Journey")).toBeInTheDocument();
  });
});
