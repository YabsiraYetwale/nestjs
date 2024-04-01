import UserForm from "@/components/form/UserForm";

const page = ({params}) => {
  return (
    <div className='w-full'>
      <UserForm params={params}/>
    </div>
  );
};

export default page;