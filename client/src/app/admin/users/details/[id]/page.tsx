import UserDetail from "@/components/detail/UserDetail";

const page = ({ params }: any) => {
  return (
    <div className="w-full flex justify-center p-10">
      <UserDetail params={params} />
    </div>
  );
};

export default page;
