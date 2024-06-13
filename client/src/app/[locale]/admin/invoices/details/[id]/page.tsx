import PageTitle from "@/components/PageTitle";
import Invoice from "../../Invoice";

interface Props {
  params: { id: string };
}

const InvoiceDetailPage = ({ params: { id } }: Props) => {
  return (
    <div className="flex flex-col gap-5 w-full lg:w-[800px]">
      <PageTitle title="Invoice Details" />
      <Invoice id={id} />
    </div>
  );
};

export default InvoiceDetailPage;
