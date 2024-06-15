import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const RoleLayout = ({ children }: Props) => {
  return <div className="w-full flex justify-center">{children}</div>;
};

export default RoleLayout;
