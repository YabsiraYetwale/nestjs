
import { useTranslations,useLocale } from 'next-intl';
import Link from 'next/link';
import { CardContent} from "@/components/Card";


export default function Path() {
  const t = useTranslations('Navigation');
  const tr = useTranslations('Dashboard');
  const localActive = useLocale();



  return (
    <CardContent className="flex flex-col justify-between">
          <section className="flex flex-col gap-5">
            <h2 className="font-bold">{tr('quickaccess')}</h2>
            <div className="flex flex-col gap-3 text-blue-600">
            <Link href={`/${localActive}/invoices/addInvoice`} className="hover:underline">{t('newInvoice')}</Link>
            <Link href={`/${localActive}/customers`} className="hover:underline">{t('manageCustomers')}</Link>
            <Link href={`/${localActive}/invoices`} className="hover:underline">{t('viewStatus')}</Link>
            </div>
          </section>
        </CardContent>
  ); 
}
