"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Action, FilterState } from "@/type/global.type";

export default function FilterSidebar({
  state,
  dispatch,
  categories,
}: {
  state: FilterState;
  dispatch: React.Dispatch<Action>;
  categories: string[];
}) {
  return (
    <div className="p-4 border rounded-2xl shadow-sm space-y-6">
      <h2 className="text-xl font-semibold">Filters</h2>

      <div>
        <p className="text-sm mb-2">Search</p>
        <Input
          placeholder="Search products..."
          value={state.search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "SET_SEARCH", payload: e.target.value })
          }
        />
      </div>
      <div>
        <p className="text-sm mb-2">Category</p>
        <Select
          value={state.category}
          onValueChange={(val) =>
            dispatch({ type: "SET_CATEGORY", payload: val as string })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat: string) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => dispatch({ type: "RESET" })}
      >
        Reset Filters
      </Button>
    </div>
  );
}
