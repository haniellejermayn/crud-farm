import React from "react";
import { Search } from "lucide-react";
import { Card } from "./Card";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <Card className="p-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border-none focus:ring-0 text-sm text-gray-700 placeholder-gray-400 rounded-lg"
        />
      </div>
    </Card>
  );
};
