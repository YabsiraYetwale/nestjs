import InvoiceForm from '@/components/form/InvoiceForm';
import ItemsForm from '@/components/form/ItemsForm';
import ProtectedRoute from '@/components/protectedRoute/ProtectedRoute';

const page = ({params}:any) => {
  return (
    <ProtectedRoute>
    <div className='w-full'>
      <InvoiceForm params={params}/>
      <ItemsForm/>
    </div>
    </ProtectedRoute>
  );
};

export default page;
