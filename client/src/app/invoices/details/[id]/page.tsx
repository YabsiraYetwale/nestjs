import Detail from "@/components/detail/invoiceDetail/Detail";

const page = ({ params }: any) => {
  return (
    <div className='w-full'>
      <Detail params={params}/>
    </div>
  );
};

export default page;
