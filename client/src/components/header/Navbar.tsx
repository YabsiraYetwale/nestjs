import Link from "next/link";
import { HandMetal} from "lucide-react";
import { Notification } from "../Notification";
import CurrentUser from "./User";
import { useTranslations} from 'next-intl';

const Navbar = () => {
  const t = useTranslations('Logo');

  return (
    <div>
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-20 top-0">
      <div className="container flex items-center justify-between gap-[57rem]">
        <Link href="/" className="flex gap-2 items-center text-blue-500 ">
          <h1 className="3xl font-semibold">
            <div
              className="sm:flex hidden
     p-2 bg-opacity-20 text-lg lg:text-2xl font-bold justify-center drop-shadow-md"
            >
              <span className="text-green-500 dark:text-green-400  ">
              {t('title1')} 
              </span>
              <span className="text-blue-500 dark:text-yellow-400">{t('title2')} </span>
            </div>
          </h1>
          <HandMetal />
        </Link>
        {/* <LocalSwitcher /> */}
         <CurrentUser/>
      </div>
    </div>
    <div className="absolute z-20 left-[25rem] top-[140px]">
    <Notification/>
    </div>
    </div>
  );
};

export default Navbar;
