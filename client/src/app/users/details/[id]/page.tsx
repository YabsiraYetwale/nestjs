import UserDetail from '@/components/detail/UserDetail';

const page = ({ params }: any) => {
  return (
    <div className='w-full'>
      <UserDetail params={params}/>
    </div>
  );
};

export default page;
