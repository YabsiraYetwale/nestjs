import CustomerForm from "@/components/form/CustomerForm";

const page = ({params}:any) => {
  return (
    <div className='w-full'>
      <CustomerForm params={params}/>
    </div>
  );
};

export default page;