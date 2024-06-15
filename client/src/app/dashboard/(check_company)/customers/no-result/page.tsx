import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import {useLocale } from 'next-intl';


export default function Result() {
  const localActive = 'useLocale()';



return (
  <ProtectedRoute>
    <div className="flex flex-col relative top-[140px] items-center justify-center align-center text-center">
           <div className="text-[30px] font-bold"> No Result</div>
           <Button className="bg-blue-600 hover:bg-blue-500 w-[100px] h-[35px]">
         <Link href={`/dashboard/customers`}>
            Go Back
        </Link>
        </Button>
    </div>
    </ProtectedRoute>
  );
}