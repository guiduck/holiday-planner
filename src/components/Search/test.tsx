import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "./index";

describe("Search", () => {
  test("should render without errors", () => {
    const mockOnSearch = jest.fn();
    render(<Search onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText("Search");

    expect(searchInput).toBeInTheDocument();
  });

  test("should call onSearch with the input value", () => {
    const mockOnSearch = jest.fn();
    render(<Search onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });
});
