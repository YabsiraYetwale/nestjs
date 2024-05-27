import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className='bg-slate-200 lg:p-10 sm:p-10 p-5 rounded-md lg:w-[50%] w-[65%] absolute lg:left-[400px] sm:left-[240px]'>{children}</div>;
};

export default AuthLayout;
