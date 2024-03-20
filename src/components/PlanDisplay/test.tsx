import { render, screen } from "@testing-library/react";
import { PlanDisplay } from "./index";

describe("PlanDisplay", () => {
  test('renders "without crashing', () => {
    const { container } = render(<PlanDisplay />);
    expect(container.children[0]).toBeInTheDocument();
  });

  test('renders "Select a plan" message when showAddPlan and selectedPlan are false', () => {
    render(<PlanDisplay />);
    const selectPlanMessage = screen.getByText("Select a plan");
    expect(selectPlanMessage).toBeInTheDocument();
  });

  test("renders AddPlan component when showAddPlan is true and selectedPlan is false", () => {
    jest.mock("@/stores/modal-control.ts", () => ({
      useModalStore: () => ({ showAddPlan: true }),
    }));

    render(<PlanDisplay testId="add-plan-component" />);
    const addPlanComponent = screen.getByTestId("add-plan-component");
    expect(addPlanComponent).toBeInTheDocument();
  });
});
