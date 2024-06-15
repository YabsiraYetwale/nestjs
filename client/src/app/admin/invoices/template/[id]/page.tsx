import Template from "@/components/invoices/detail/templates/Template";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

const page = ({ params }: any) => {
  return (
    <ProtectedRoute>
    <div className='w-full'>
    <Template params={params}/>
    </div>
    </ProtectedRoute>
  );
};

export default page;
