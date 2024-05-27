import Dash from "@/components/home/Home";
import Path from "@/components/home/Path";
import Recent from "@/components/home/Recent";
import PageTitle from "@/components/PageTitle";

export default function Home() {

return (
  <>
   <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
   <Dash/>
   <section className="grid  lg:grid-cols-2 grid-cols-1 gap-4 gap-4 transition-all">
   <Recent/>
   <Path/>
   </section>
   </div>
   </>
  );
}
