import { render } from "@testing-library/react";
import { Spinner } from "./index";

describe("Spinner", () => {
  it("renders without errors", () => {
    render(<Spinner />);
  });

  it("renders with custom className", () => {
    const className = "custom-class";
    const { container } = render(<Spinner className={className} />);
    const spinner = container.querySelector(".custom-class");
    expect(spinner).toBeInTheDocument();
  });
});
