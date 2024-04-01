import UserDetail from '@/components/detail/UserDetail';

const page = ({params}) => {
  return (
    <div className='w-full'>
      <UserDetail params={params}/>
    </div>
  );
};

export default page;
