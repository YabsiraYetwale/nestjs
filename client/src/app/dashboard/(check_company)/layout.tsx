import NoCompany from "@/components/NoCompany";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

import React from "react";

const layout = ({ children }: Props) => {
  const doesHaveCompany = true;

  if (!doesHaveCompany) return <NoCompany />;
  return <>{children}</>;
};

export default layout;
