"use client"
import { ReactNode } from "react";
import Header from "./header";
import Social from "./social";
import BackButton from "./back-button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface CardWrapperProps{
  children:ReactNode;
  backButtonLabel:string;
  backButtonHref:string;
  showSocial?:boolean;
  headerLabel?:any;
}
const CardWrapper = ({children,headerLabel,backButtonHref,backButtonLabel,showSocial}:CardWrapperProps) => {
  return ( <Card className="w-[400px] shadow-md relative top-[-80px]">
    
    <CardHeader><Header label={headerLabel}/></CardHeader>
   <CardContent>{children}</CardContent>
   {showSocial&&<CardFooter><Social/></CardFooter>}

   <CardFooter className="flex justify-center">
   <BackButton href={backButtonHref}  label={backButtonLabel} />
    </CardFooter>
  </Card>);
}
 
export default CardWrapper;