import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Detail from "@/components/reciepts/detail/Detail";

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
