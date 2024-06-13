"use client";

import { Trash } from "lucide-react";
import React from "react";

interface Props {
  onClear: () => Promise<void>;
}

const ClearButton = ({ onClear }: Props) => {
  return (
    <button
      onClick={onClear}
      className="flex gap-1 w-28 h-12 text-md items-center justify-center bg-red-50 rounded-lg hover:bg-red-100 duration-200 "
    >
      <Trash size={20} className="text-red-500" /> Clear All
    </button>
  );
};

export default ClearButton;
