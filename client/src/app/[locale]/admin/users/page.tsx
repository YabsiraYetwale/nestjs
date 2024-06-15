
import PageTitle from "@/components/PageTitle";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {useTranslations,useLocale } from 'next-intl';
import Goup from "@/components/users/Goup";
import Users from "@/components/users/Users";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";


export default function UsersPage() {
  const t = useTranslations('Navigation');
  const tr = useTranslations('Users');
  const localActive=useLocale()
 
  return (
    <>
    {/* <ProtectedRoute> */}
    <div className="flex justify-evenly">
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title={tr('title')} />
      {/* {user && <DataTable columns={columns} data={user} />} */}
    </div>
    <Button className="bg-blue-600 hover:bg-blue-500 w-[100px] h-[35px] relative top-[4px] left-[-90px]">
         <Link href={`/${localActive}/users/addUser`}>
         {t('add')}
        </Link>
        </Button>
    </div>
    <Users/>
    <Goup/>
    {/* </ProtectedRoute> */}
 </>
  );
}
