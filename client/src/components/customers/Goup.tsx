"use client";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";


const Goup = () => {
  return (
    <Button onClick={()=>window.scrollTo(0,0)} className="absolute bottom-0 right-0 bg-blue-500 w-[5px] h-[40px] hover:bg-blue-400">
    <p><ArrowUp /></p> 
</Button>
  )
}

export default Goup