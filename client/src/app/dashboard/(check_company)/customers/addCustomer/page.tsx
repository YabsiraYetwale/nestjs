import CustomerForm from '@/components/customers/form/CustomerForm';
import ProtectedRoute from '@/components/protectedRoute/ProtectedRoute';

const page = ({params}:any) => {
  return (
    <ProtectedRoute>
    <div className='w-full'>
      <CustomerForm params={params} />
    </div>
    </ProtectedRoute>
  );
};

export default page;
