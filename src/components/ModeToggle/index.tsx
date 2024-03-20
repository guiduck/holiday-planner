"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  const selectTheme = (theme: string) => {
    setTheme(theme);
    window.location.reload();
  };

  return (
    <div className="absolute top-0 left-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => selectTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => selectTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => selectTheme("blue")}>
            Blue
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => selectTheme("green")}>
            Green
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => selectTheme("orange")}>
            Orange
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
