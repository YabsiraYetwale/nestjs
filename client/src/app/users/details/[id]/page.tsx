import UserDetail from '@/components/detail/UserDetail';

const page = ({ params }: any) => {
  return (
    <ProtectedRoute>
    <div className='w-full'>
      <UserDetail params={params}/>
    </div>
    </ProtectedRoute>
  );
};

export default page;
