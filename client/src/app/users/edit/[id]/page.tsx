import UserForm from "@/components/form/UserForm";

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