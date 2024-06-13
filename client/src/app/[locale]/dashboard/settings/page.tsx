import PageTitle from "@/components/PageTitle";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Settings from "@/components/settings/Settings";
import {useTranslations} from 'next-intl';

export default function SettingsPage() {
  const tr = useTranslations('Settings');

  return (
    <ProtectedRoute>
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title={tr("title")} />
      <Settings/>
    </div>
    </ProtectedRoute>
  );
}
