import { useTranslations,useLocale } from 'next-intl';
import Link from 'next/link';
import LocalSwitcher from './local-switcher';


export default function Header() {
  const t = useTranslations('Navigation');
  const localActive = useLocale();



  return (
    <header className='p-4'>
      <nav className='flex items-center justify-between'>
        <Link href={`/${localActive}/home`}>{t('customers')}</Link>
        <LocalSwitcher />
      </nav>
    </header>
  );
}
