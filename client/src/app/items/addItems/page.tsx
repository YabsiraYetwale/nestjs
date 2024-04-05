import ItemsForm from '@/components/form/ItemsForm';

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
