import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Alert } from "./index";

describe("Alert component", () => {
  it("renders the alert when show prop is true", () => {
    render(<Alert show={true} message="Test message" type="success" />);

    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();
  });

  it("does not render the alert when show prop is false", () => {
    render(<Alert show={false} message="Test message" type="success" />);

    const alertElement = screen.queryByTestId("alert");
    expect(alertElement).not.toBeInTheDocument();
  });

  it("renders the correct alert type", () => {
    render(<Alert show={true} message="Test message" type="error" />);

    const errorIcon = screen.getByTestId("error");
    expect(errorIcon).toBeInTheDocument();
  });

  it("displays the alert message", () => {
    render(<Alert show={true} message="Test message" type="success" />);

    const alertMessage = screen.getByText("Test message");
    expect(alertMessage).toBeInTheDocument();
  });

  it("hides the alert after the specified time", async () => {
    render(
      <Alert show={true} message="Test message" time={2000} type="success" />
    );

    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();

    await waitFor(
      () => {
        expect(alertElement).not.toBeInTheDocument();
      },
      { timeout: 2500 }
    );
  });
});
