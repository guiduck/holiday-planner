import { render, screen, fireEvent } from "@testing-library/react";
import PlanCard from "./index";
import { mockedPlans } from "@/mocks/plan-mock";

describe("PlanCard", () => {
  const onSelectPlan = jest.fn();

  test("renders plan title", () => {
    render(
      <PlanCard
        plan={mockedPlans[2]}
        selectedPlan={mockedPlans[0]}
        onSelectPlan={onSelectPlan}
        testId="plan-card"
      />
    );
    const titleElement = screen.getByText(mockedPlans[2].title);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders plan description", () => {
    render(
      <PlanCard
        plan={mockedPlans[2]}
        selectedPlan={mockedPlans[0]}
        onSelectPlan={onSelectPlan}
        testId="plan-card"
      />
    );
    const descriptionElement = screen.getByText(mockedPlans[2].description);
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders participants badge", () => {
    render(
      <PlanCard
        plan={mockedPlans[2]}
        selectedPlan={mockedPlans[0]}
        onSelectPlan={onSelectPlan}
        testId="plan-card"
      />
    );
    const participantsBadge = screen.getByText(
      `${mockedPlans[2].participants.slice(0, 3).join(", ")}`
    );
    expect(participantsBadge).toBeInTheDocument();
  });

  test("renders locations badge", () => {
    render(
      <PlanCard
        plan={mockedPlans[2]}
        selectedPlan={mockedPlans[0]}
        onSelectPlan={onSelectPlan}
        testId="plan-card"
      />
    );
    const locationsBadge = screen.getByText(
      `${mockedPlans[2].locations.slice(0, 3).join(", ")}`
    );
    expect(locationsBadge).toBeInTheDocument();
  });

  test("calls onSelectPlan when button is clicked", () => {
    const select = jest.fn();
    render(
      <PlanCard
        plan={mockedPlans[2]}
        selectedPlan={mockedPlans[0]}
        onSelectPlan={select}
        testId="plan-card"
      />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(select).toHaveBeenCalledWith(mockedPlans[2]);
  });
});
