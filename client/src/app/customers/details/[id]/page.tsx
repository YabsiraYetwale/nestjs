import CustomerDetail from "@/components/detail/CustomerDetail";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

const page = ({ params }: any) => {
  return (
    <ProtectedRoute>
    <div className='w-full'>
      <CustomerDetail params={params}/>
    </div>
    </ProtectedRoute>
  );
};

export default page;
