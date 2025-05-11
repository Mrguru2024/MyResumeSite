import { render, screen } from "@testing-library/react";
import Experience from "./index";

describe("Experience", () => {
  it("renders the experience section and all roles", () => {
    render(<Experience />);
    expect(screen.getByText(/Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Full Stack Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Locksmith Lead/i)).toBeInTheDocument();
    expect(screen.getByText(/Low Voltage Specialist/i)).toBeInTheDocument();
  });

  it("renders timeline dots and cards in order", () => {
    render(<Experience />);
    const roles = screen.getAllByRole("heading", { level: 3 });
    expect(roles[0]).toHaveTextContent("Full Stack Developer");
    expect(roles[1]).toHaveTextContent("Locksmith Lead");
    expect(roles[2]).toHaveTextContent("Low Voltage Specialist");
  });

  it("has accessible section and headings", () => {
    render(<Experience />);
    expect(
      screen.getByRole("region", { name: /Experience/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Experience/i, level: 2 })
    ).toBeInTheDocument();
  });
});
