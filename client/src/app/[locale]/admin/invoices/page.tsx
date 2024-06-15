import React from "react";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Invoices from "./Invoices";

export default function InvoicePage() {
  return (
    <>
      <Invoices />
      <ScrollToTopButton />
    </>
  );
}
