import { PlanType } from "@/models/plan-models";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { usePlansStore } from "@/stores/plan-store";

interface SearchProps {
  plans: PlanType[];
}

export function Search({ plans = [] }: Readonly<SearchProps>) {
  const { setDisplayPlans } = usePlansStore();

  const hadnleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setDisplayPlans(
      plans.filter(
        (plan) =>
          plan.title.includes(value) || plan.description?.includes(value)
      )
    );
  };

  return (
    <form>
      <div className="relative">
        <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search"
          className="pl-8"
          defaultValue=""
          onChange={hadnleSearch}
        />
      </div>
    </form>
  );
}
