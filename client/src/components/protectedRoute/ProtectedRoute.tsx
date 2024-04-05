"use client"
import {useEffect } from "react";
import { useRouter } from "next/navigation";

function Redirect () {
  const router = useRouter();
    useEffect(() => {
      router.push("/sign-in");
    }, [router]);
  return (<div>Redirecting</div>);};

  export default function ProtectedRoute({ children}:{children:any}){
  const user = localStorage.getItem("InvoiceAuth");
  return user  ? children : <Redirect />;

};

