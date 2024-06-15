"use client";
import Dash from "@/components/home/Home";
import Path from "@/components/home/Path";
import Recent from "@/components/home/Recent";
import PageTitle from "@/components/PageTitle";

import useCompanyStore from "@/state-management/selected_company/store";
import NoCompany from "@/components/NoCompany";

const Dashboard = () => {

  const { selectedCompanyId } = useCompanyStore();

  const doesHaveCompany = true;
  if (!doesHaveCompany) return <NoCompany />;


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
};

export default Dashboard;
