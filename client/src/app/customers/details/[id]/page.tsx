import CustomerDetail from "@/components/detail/CustomerDetail";

const page = ({ params }: any) => {
  return (
    <div className='w-full'>
      <CustomerDetail params={params}/>
    </div>
  );
};

export default page;
