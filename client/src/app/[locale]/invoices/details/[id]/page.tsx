import Detail from "@/components/invoices/detail/Detail";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

const page = ({ params }: any) => {
  return (
    <ProtectedRoute>
    <div className='w-full'>
      <Detail params={params}/>
    </div>
    </ProtectedRoute>
  );
};

export default page;
