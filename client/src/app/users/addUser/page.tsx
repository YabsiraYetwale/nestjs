import UserForm from '@/components/form/UserForm';

const page = ({params}:any) => {
  return (
    <div className='w-full'>
      <UserForm params={params}/>
    </div>
  );
};

export default page;
