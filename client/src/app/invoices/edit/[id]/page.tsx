import InvoiceForm from "@/components/form/InvoiceForm";
import ItemsForm from "@/components/form/ItemsForm";

const page = ({params}:any) => {
  return (
    <div className='w-full'>
      <InvoiceForm params={params}/>
      <ItemsForm/>
    </div>
  );
};

export default page;