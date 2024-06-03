import Dash from "@/components/home/Home";
import Path from "@/components/home/Path";
import Recent from "@/components/home/Recent";
import PageTitle from "@/components/PageTitle";
import {useTranslations} from 'next-intl';

export default function Home() {


  const tr = useTranslations('Dashboard')

return (
  <>
   <div className="flex flex-col gap-5  w-full">
      <PageTitle title={tr("title")} />
   <Dash/>
   <section className="grid  lg:grid-cols-2 grid-cols-1 gap-4 gap-4 transition-all">
   <Recent/>
   <Path/>
   </section>
   </div>
   </>
  );
}
