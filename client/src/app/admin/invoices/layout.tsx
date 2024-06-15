import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const InvoiceLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center px-5 lg:px-0 pt-10">
      {children}
    </div>
  );
};

export default InvoiceLayout;
