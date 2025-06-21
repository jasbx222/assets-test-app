"use client";
import React from "react";
import { Search } from "lucide-react"; 

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  plaecholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <div dir="rtl" className="relative dark:bg-navy-800  w-full max-w-md mx-auto mb-6">
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <Search className="text-gray-400 dark:text-white/90 w-5 h-5" />
      </div>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "ابحث..."}
        className="w-full py-2 pr-10 pl-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition duration-300"
      />
    </div>
  );
};

export default SearchInput;
