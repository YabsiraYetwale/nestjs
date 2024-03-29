import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';

const Navbar = () => {
  return (
    <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-20 top-0'> 
      <div className='container flex items-center justify-between'>
        <Link href='/' className='flex gap-2 items-center text-blue-500 '>
          <span className='sm:flex hidden items-center'>
          <p className='text-[30px] text-green-500'>Invoice</p>
          <p className='text-[20px]'>System</p>
          </span>
          <HandMetal />
        </Link>
        <Link className={buttonVariants()} href='/sign-in'>
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

