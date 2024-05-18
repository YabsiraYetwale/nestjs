"use client";
import { ReactToPrint } from "react-to-print";
import { useEffect, useState, useRef } from "react";
import { ArrowUp} from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchInvoice } from "@/redux/actions/invoices";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/Card";
import axios from "axios";
import { updateCompany } from "@/redux/actions/items";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import InvoiceTemplateV1 from "./invoice-template-v1";
import InvoiceTemplateV2 from "./invoice-template-v2";
import InvoiceTemplateV3 from "./invoice-template-v3";
import InvoiceTemplateV4 from "./invoice-template-v4";
import InvoiceTemplateV5 from "./invoice-template-v5";
import CustomFieldsForm from "./addi";

export default function Template({ params }: any) {
  const id = params.id as string;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [color, setColor] = useState("#000000");
  const [text, setText] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("v1");

  const handleSendEmail = () => {
    axios
      .get(`https://invoicesystm-app.onrender.com/api/mailer/${id}`)
      .then((response: { data: React.SetStateAction<string> }) => {
        alert("email send successfully!");
        setEmail(response.data);
        console.log(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };



  const handleVersionChange = (event: { target: { value: any } }) => {
    const selectedVersion = event.target.value;
    setSelectedVersion(selectedVersion);
  };
  const componentRef = useRef(null);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex gap-4">
            <ReactToPrint
              trigger={() => {
                return (
                  <Button
                  onClick={handleSendEmail}
                  className="bg-transparent border border border-purple-600 text-purple-600 hover:bg-transparent"
                  >
                      <span>Download/Print Pdf</span>
                  </Button>
                );
              }}
              content={() => componentRef.current}
              pageStyle="print"
            />
            <Button
              onClick={handleSendEmail}
              className="bg-transparent border border border-purple-600 text-purple-600 hover:bg-transparent"
            >
              Email
            </Button>
          </div>
        </div>
        <div>
          <CardContent className="absolute w-[200px] h-[80px] top-[70px] right-[0px]">
            <div>
              <div>Select Template V</div>
              <select value={selectedVersion} onChange={handleVersionChange}>
                <option value="v1">Version 1</option>
                <option value="v2">Version 2</option>
                <option value="v3">Version 3</option>
                <option value="v4">Version 4</option>
                <option value="v5">Version 5</option>
              </select>
              {/* <input type="color" value={color} onChange={handleColorChange} /> */}
            </div>
          </CardContent>
        </div>
      </div>
   <div className="relative invoice max-w-[740px] mx-auto bg-white p-16  border border-gray-300 rounded-md">
        <div ref={componentRef} className="">
        <div className="">
        {selectedVersion === "v1" && (
          <div onClick={() => setSelectedVersion("v1")}>
            <InvoiceTemplateV1 params={params}/>
          </div>
        )}
        {selectedVersion === "v2" && (
        <div onClick={() => setSelectedVersion("v2")}>
          <InvoiceTemplateV2 params={params}/>
        </div> )}
        {selectedVersion === "v3" && (
        <div onClick={() => setSelectedVersion("v3")}>
          <InvoiceTemplateV3 params={params}/>
        </div> )}
        {selectedVersion === "v4" && (
        <div onClick={() => setSelectedVersion("v4")}>
          <InvoiceTemplateV4 params={params}/>
        </div> )}
        {selectedVersion === "v5" && (
        <div onClick={() => setSelectedVersion("v5")}>
          <InvoiceTemplateV5 params={params}/>
        </div> )}
      </div>
      <CustomFieldsForm params={params}/>
        </div>
      </div>
      <Button
        onClick={() => window.scrollTo(0, 0)}
        className="absolute  bottom-0 right-0 bg-blue-500 w-[5px] h-[40px] hover:bg-blue-400"
      >
        <p>
          <ArrowUp />
        </p>
      </Button>
    </>
  );
}
