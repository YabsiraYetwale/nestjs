import React from "react";
import Customers from "@/components/customers/Customers";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {useTranslations,useLocale } from 'next-intl';
import Goup from "@/components/customers/Goup";

export default function CustomersPage() {
  const t = useTranslations('Navigation');
  const tr = useTranslations('Customers');

  const localActive = useLocale();

 
  return (
    <>
    <div className="flex flex-col justify-evenly">
    <div className="flex sm:gap-[9rem] gap-[15rem]">
    <PageTitle title={tr('title')} />
    <Button className="bg-blue-600 hover:bg-blue-500 w-[100px] h-[35px] relative top-[4px] left-[-90px]">
      <Link href={`/${localActive}/customers/addCustomer`}>{t('add')}</Link>
    </Button>
    
  </div>
    <Customers/>
    </div>
    <Goup/>
    
    </>
  );
}

