import CustomerForm from '@/components/form/CustomerForm';

const page = ({params}) => {
  return (
    <div className='w-full'>
      <CustomerForm params={params} />
    </div>
  );
};

export default page;
