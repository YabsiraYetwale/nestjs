import UserForm from "@/components/form/UserForm";
import PageTitle from "@/components/PageTitle";

const page = async () => {
  return (
    <div className="w-full max-w-2xl px-10 md:px-0 pt-10 flex flex-col gap-5 ">
      <PageTitle title="Add User" />
      <UserForm />
    </div>
  );
};

export default page;
