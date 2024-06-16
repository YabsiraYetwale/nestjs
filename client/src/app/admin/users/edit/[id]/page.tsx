"use client";

import UserForm from "@/components/form/UserForm";
import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import { User } from "@/models/user";
import apiClient from "@/services/api-client";
import { Suspense, useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

interface FetchUser {
  user: User;
}

const EditUserPage = ({ params: { id } }: Props) => {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      setIsLoading(true);
      apiClient
        .get<FetchUser>(`https://invoicesystm-app.onrender.com/api/auth/${id}`)
        .then((res) => setUser(res.data.user))
        .finally(() => setIsLoading(false));
    };
    fetchUser();
  }, [id]);

  return (
    <div className="w-full max-w-2xl px-10 md:px-0 pt-10 flex flex-col gap-5 ">
      <PageTitle title="Edit User" />
      {isLoading ? <Spinner /> : <UserForm user={user} />}
    </div>
  );
};

export default EditUserPage;
