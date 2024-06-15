import UserForm from "@/components/users/form/UserForm";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

const page = ({params}:any) => {
  return (
    <ProtectedRoute>
    <div className='w-full'>
      <UserForm params={params}/>
    </div>
    </ProtectedRoute>
  );
};

export default page;