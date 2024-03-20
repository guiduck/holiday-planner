import { render, screen } from "@testing-library/react";
import { ModeToggle } from "./index";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(() => ({
    setTheme: jest.fn(),
  })),
}));

describe("ModeToggle", () => {
  it("renders the toggle button", () => {
    render(<ModeToggle />);
    const toggleButton = screen.getByRole("button", { name: /Toggle theme/i });
    expect(toggleButton).toBeInTheDocument();
  });
});
