"use client"
import {useEffect, useState } from "react";
import { useDispatch} from 'react-redux';
import { useRouter } from "next/navigation";
import { fetchCurrentUser } from "@/redux/actions/auth";

function Redirect () {
  const router = useRouter();
    useEffect(() => {
      router.push("/sign-in");
    }, [router]);
  return (<div>Redirecting</div>);};
  type userProps= {
    username:string
  }
  export default function ProtectedRoute({ children}:any){

  const [user, setUser] = useState<userProps | null>(null);
  const dispatch= useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchCurrentUser());
        setUser(response);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [dispatch]);
  console.log("user",user)
  if (user === null) {
    return <div>Loading...</div>;
  }
   return user  ? children : <Redirect />;

};
