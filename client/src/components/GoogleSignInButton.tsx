import { FC, ReactNode } from 'react';
import { Button } from './ui/button';

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => console.log('login with google');

  return (
    <Button onClick={loginWithGoogle} className='w-full bg-blue-600 hover:bg-blue-500'>
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
