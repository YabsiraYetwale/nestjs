import React from "react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ForgotLayout = ({ children }: Props) => {
  return <div className="flex justify-center">{children}</div>;
};

export default ForgotLayout;
