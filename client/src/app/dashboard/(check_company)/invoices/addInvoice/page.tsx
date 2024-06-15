import InvoiceForm from '@/components/invoices/form/InvoiceForm';
import ProtectedRoute from '@/components/protectedRoute/ProtectedRoute';

const page = ({params}:any) => {
  return (
    <ProtectedRoute>
    <div className='w-full'>
      <InvoiceForm params={params}/>
    </div>
    </ProtectedRoute>
  );
};

export default page;
