import Detail from "@/components/detail/invoiceDetail/Detail";
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
