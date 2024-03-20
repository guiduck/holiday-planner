import { Search as SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

interface SearchProps {
  onSearch?: (query: string) => void;
}

export function Search({ onSearch }: Readonly<SearchProps>) {
  const hadnleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onSearch?.(value);
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
