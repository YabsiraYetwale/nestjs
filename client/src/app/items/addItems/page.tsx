import ItemsForm from '@/components/form/ItemsForm';
import ProtectedRoute from '@/components/protectedRoute/ProtectedRoute';

const page = () => {
  return (
    <ProtectedRoute>
    <div className='w-full'>
      <ItemsForm/>
    </div>
    </ProtectedRoute>
  );
};

export default page;
