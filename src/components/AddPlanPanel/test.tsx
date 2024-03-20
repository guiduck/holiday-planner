import { render, screen, fireEvent, act } from "@testing-library/react";
import { AddPlan } from "./index";

describe("AddPlan", () => {
  it("renders the component", () => {
    render(<AddPlan />);
    expect(screen.getByText("Create a new Plan")).toBeInTheDocument();
  });

  it("displays error message for required fields", async () => {
    render(<AddPlan />);

    await act(async () => {
      fireEvent.click(screen.getByText("Submit"));
    });

    expect(
      screen.getByText("This field is required", { exact: false })
    ).toBeInTheDocument();
  });
});
