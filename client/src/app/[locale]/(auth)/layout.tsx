import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className=" h-full flex flex-col items-center justify-center">
      <div className="w-[350px] h-[500px] px-10 py-8 flex rounded-lg shadow-md bg-white">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
