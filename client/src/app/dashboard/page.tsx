import NoCompany from "@/components/NoCompany";
import QuickAccess from "@/components/QuickAccess";
import Dashboard from "./Dashboard";

export default function HomePage() {
  const doesHaveCompany = true;

  if (!doesHaveCompany) return <NoCompany />;
  return (
    <div className="flex flex-col gap-5  w-full">
      <Dashboard />
    </div>
  );
}
