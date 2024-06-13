import UserDetail from '@/components/users/detail/UserDetail';
import ProtectedRoute from '@/components/protectedRoute/ProtectedRoute';

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
