import InvoiceForm from '@/components/form/InvoiceForm';
import ItemsForm from '@/components/form/ItemsForm';

const page = () => {
  return (
    <div className='w-full'>
      <InvoiceForm/>
      <ItemsForm/>
    </div>
  );
};

export default page;
