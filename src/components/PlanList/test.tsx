import { render, screen } from "@testing-library/react";
import { PlanList } from "./index";
import { mockedPlans } from "@/mocks/plan-mock";

describe("PlanList", () => {
  const onSelectPlan = jest.fn();

  it("renders component without errors", () => {
    const { container } = render(
      <PlanList
        items={mockedPlans}
        selectedPlan={mockedPlans[0]}
        onSelectPlan={onSelectPlan}
      />
    );
    expect(container.children[0]).toBeInTheDocument();
  });

  it("displays the selected plan with the correct styling", () => {
    render(
      <PlanList
        items={mockedPlans}
        selectedPlan={mockedPlans[0]}
        onSelectPlan={onSelectPlan}
      />
    );
    const selectedPlanElement = screen.getByText(mockedPlans[0].date);
    expect(selectedPlanElement).toHaveClass("text-foreground text-lg");
  });
});
