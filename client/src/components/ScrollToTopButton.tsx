"use client";

import { ArrowUp } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const ScrollToTopButton = () => {
  return (
    <Button
      onClick={() => window.scrollTo(0, 0)}
      className="fixed bottom-10 right-10 rounded-full bg-blue-500 w-[40px] h-[40px] hover:bg-blue-400"
    >
      <p>
        <ArrowUp />
      </p>
    </Button>
  );
};

export default ScrollToTopButton;
