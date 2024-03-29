"use client"
import React, { useState } from 'react';
import {ChevronUp,ChevronDown} from "lucide-react";
const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded-md mb-2">
      <div
        className="flex flex-col items-center justify-between p-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <span className="text-gray-500">
          {isOpen ? <ChevronUp/> : <ChevronDown/>}
        </span>
    {isOpen &&
     <>
     <h3 className="text-lg font-semibold">title</h3>
     <h3 className="text-lg font-semibold">title</h3>
     </>}
      </div>
    </div>
  );
};

export default AccordionItem;