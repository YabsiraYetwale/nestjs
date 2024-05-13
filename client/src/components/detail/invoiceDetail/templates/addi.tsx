'use client';

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { fetchInvoice } from "@/redux/actions/invoices";
import { updateCompany } from "@/redux/actions/items";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InvoiceProps } from "./InvoiceProps";

const FormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  company_logo: z.string().optional(),
  general_manager_name: z.string().optional(),
  company_number: z.string().optional(),
  vat_reg_number: z.string().optional(),
  house_no: z.string().optional(),
  po_box: z.string().optional(),
  fax: z.string().optional(),
  tel1: z.string().optional(),
  tel2: z.string().optional(),
  country: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  subcity: z.string().optional(),
  woreda: z.string().optional(),
  kebele: z.string().optional(),
  description: z.string().optional(),
  additional_fields: z.record(z.string()).optional(),
});

const TemplateForm = ({ params }: any) => {
  const id = params.id as string;
  const dispatch = useDispatch();
  const router = useRouter();
  const [additional_fields, setAdditionalFields] = useState<Record<string, string>>({});
  const [invoice, setInvoice] = useState<InvoiceProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchInvoice(id));
        setInvoice(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id, dispatch]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: invoice?.company?.name,
      email: invoice?.company?.email,
      additional_fields: invoice?.company?.additional_fields?.additional_fields,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdditionalFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFields = {
      ...additional_fields,
      ...form.getValues("additional_fields"),
    };
    const updatedCompany = {
      ...form.getValues(),
      additional_fields: updatedFields,
    };
    dispatch<any>(updateCompany(invoice?.company?.id, updatedCompany, router));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Additional Fields</h2>
      <label htmlFor="field1">Field 1:</label>
      <input
        type="text"
        id="field1"
        name="additional_fields.field1"
        value={additional_fields.field1 || "hh"}
        onChange={handleChange}
      />

      <label htmlFor="field2">Field 2:</label>
      <input
        type="text"
        id="field2"
        name="additional_fields.field2"
        value={additional_fields.field2 || "ioio"}
        onChange={handleChange}
      />

      {/* Add more fields as needed */}

      <button type="submit">Update Additional Fields</button>
    </form>
  );
};

export default TemplateForm;





// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { fetchInvoice } from "@/redux/actions/invoices";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { InvoiceProps } from "./InvoiceProps";
// import {updateCustomerTemplate } from "@/redux/actions/customers";
// import { updateCompany } from "@/redux/actions/items";

// const FormSchema = z.object({
//     name             :z.string().optional(),
//     email            :z.string().email("Invalid email").optional(),     
//     company_logo        :z.string().optional(),
//     general_manager_name :z.string().optional(),
//     company_number       :z.string().optional(),     
//     vat_reg_number       :z.string().optional(),     
//     house_no             :z.string().optional(),     
//     po_box               :z.string().optional(),     
//     fax                  :z.string().optional(),     
//     tel1                 :z.string().optional(),    
//     tel2                 :z.string().optional(),   
//     country              :z.string().optional(),
//     region               :z.string().optional(),
//     city                 :z.string().optional(),
//     subcity              :z.string().optional(),
//     woreda               :z.string().optional(),
//     kebele               :z.string().optional(),
//     description          :z.string().optional(),
//     // additional_fields    :z.any().optional(), 
//     additional_fields: z.record(z.string()).optional(),
//   });


// const TemplateForm = ({params}:any) => {
//     const id = params.id as string;
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const [invoice, setInvoice] = useState<InvoiceProps | null>(null);
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await dispatch<any>(fetchInvoice(id));
//           setInvoice(response);
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       };
//       fetchData();
//     }, [id, dispatch]);
//     const form = useForm<z.infer<typeof FormSchema>>({
//         resolver: zodResolver(FormSchema),
//         defaultValues: {
//           name: invoice?.company.name,
//           email: invoice?.company?.email,
//           additional_fields: invoice?.company.additional_fields || {}, 
//         },
//       });
//       const onSubmit = (values: z.infer<typeof FormSchema>) => {
//         dispatch<any>(updateCompany(invoice?.company?.id, values,router));
//       };
// return (
// <Form {...form}>
// <form
//   onSubmit={form.handleSubmit(onSubmit)}
//   className="w-[100%] flex flex-col gap-5"
// >
//   <div
//     className=''
//   >
//     hhhhhhjhhhhhhhhhhhhhhhhhhhhjjjjjjjjj
//     {/* <FormField
//       control={form.control}
//       name="additional_fields"
//       render={({ field }: any) => (
//         <FormItem>
//           <FormControl>
//             <input
//               className="w-[150px] h-7 text-base border-0 p-1 mb-2 placeholder:text-slate-400 "
//               type="text"
//               defaultValue={invoice?.company.additional_fields}
//               {...field}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     /> */}
// <FormField
//   control={form.control}
//   name="additional_fields"
//   render={({ field }) => (
//     <FormItem>
//       <FormControl>
//         {Object.keys(field.value || {}).map((key, index) => (
//           <div key={`additional-field-${index}`} className="flex gap-2">
//             <input
//               className="w-[150px] h-7 text-base border-0 p-1 mb-2 placeholder:text-slate-400"
//               type="text"
//               value={key}
//               onChange={(e) => {
//                 const updatedFields = { ...field.value };
//                 const newValue = e.target.value;
//                 delete updatedFields[key];
//                 updatedFields[newValue] = field.value[key];
//                 field.onChange(updatedFields);
//               }}
//             />
//             <input
//               className="w-[150px] h-7 text-base border-0 p-1 mb-2 placeholder:text-slate-400"
//               type="text"
//               value={field.value[key]}
//               onChange={(e) => {
//                 const updatedFields = { ...field.value };
//                 const newValue = e.target.value;
//                 updatedFields[key] = newValue;
//                 field.onChange(updatedFields);
//               }}
//             />
//             <Button
//               onClick={() => {
//                 const updatedFields = { ...field.value };
//                 delete updatedFields[key];
//                 field.onChange(updatedFields);
//               }}
//               className="bg-red-500 text-white px-2 py-1 rounded"
//             >
//               Remove
//             </Button>
//           </div>
//         ))}
//         <Button
//           onClick={() => {
//             const updatedFields = { ...field.value };
//             updatedFields[`key${Object.keys(updatedFields).length + 1}`] = "";
//             field.onChange(updatedFields);
//           }}
//           className="bg-green-500 text-white px-2 py-1 rounded"
//         >
//           Add Field
//         </Button>
//       </FormControl>
//       <FormMessage />
//     </FormItem>
//   )}
// />
// ggggggggggggggggggggg
   
//   </div>
//   <div className="flex gap-5 mt-6">
//     <Button className="absolute bg-transparent hover:bg-transparent top-[-60px] right-[20rem] flex text-purple-600 font-semibold items-center space-x-2 px-3 py-2 rounded-sm border border-purple-600">
//       <span>Save Online</span>
//     </Button>
//   </div>
// </form>
// </Form>
//   );
// };

// const TemplateForm = ({params}:any) => {
//       const id = params.id as string;
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const [invoice, setInvoice] = useState<InvoiceProps | null>(null);
  // const [additional_fields, setAdditionalFields] = useState({});
//       useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await dispatch<any>(fetchInvoice(id));
//           setInvoice(response);
//           console.log('resres',response)
//           console.log('ididid',invoice)
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       };
//       fetchData();
//     }, [id, dispatch]);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAdditionalFields((prevFields) => ({ ...prevFields, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // try {
//     //   const response = await axios.put(`/api/companies/${companyId}`, {
//     //     additional_fields: additionalFields,
//     //   });
//     //   console.log(response.data); // handle the response as needed
//     // } catch (error) {
//     //   console.error(error);
//     // }
//         dispatch<any>(updateCompany(invoice?.company?.id, additional_fields,router));
//   };

//   return (
    // <form onSubmit={handleSubmit}>
    //   <h2>Additional Fields</h2>
    //   <label htmlFor="field1">Field 1:</label>
    //   <input
    //     type="text"
    //     id="field1"
    //     name="field1"
    //     value={additional_fields.field1 || ''}
    //     onChange={handleChange}
    //   />

    //   <label htmlFor="field2">Field 2:</label>
    //   <input
    //     type="text"
    //     id="field2"
    //     name="field2"
    //     value={additional_fields.field2 || ''}
    //     onChange={handleChange}
    //   />

    //   {/* Add more fields as needed */}

    //   <button type="submit">Update Additional Fields</button>
    // </form>
//   );
// };

// export default TemplateForm;


















// import React, { useState } from 'react';

// const InputForm = () => {
//   const [additionalFields, setAdditionalFields] = useState({});
//   const [keyInput, setKeyInput] = useState('');
//   const [valueInput, setValueInput] = useState('');

//   const handleKeyChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
//     setKeyInput(e.target.value);
//   };

//   const handleValueChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
//     setValueInput(e.target.value);
//   };

//   const handleAddField = () => {
//     if (keyInput && valueInput) {
//       setAdditionalFields((prevFields) => ({
//         ...prevFields,
//         [keyInput]: valueInput,
//       }));
//       setKeyInput('');
//       setValueInput('');
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform any necessary actions with the additionalFields object
//     console.log('Additional Fields:', additionalFields);
//     // Reset the additional fields
//     setAdditionalFields({});
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {Object.entries(additionalFields).map(([key, value]) => (
//         <div key={key}>
//           <span>{key}: {value}</span>
//         </div>
//       ))}
//       <div>
//         <input
//           type="text"
//           value={keyInput}
//           onChange={handleKeyChange}
//           placeholder="Enter a key"
//         />
//         <input
//           type="text"
//           value={valueInput}
//           onChange={handleValueChange}
//           placeholder="Enter a value"
//         />
//         <button type="button" onClick={handleAddField}>Add Field</button>
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default InputForm;

// import React, { useState,useEffect } from 'react';
// import { fetchInvoice } from "@/redux/actions/invoices";
// import { InvoiceProps } from "./InvoiceProps";

// const UpdateCompanyForm = ({params}:any) => {
//   const dispatch = useDispatch();
//       const id = params.id as string;
//       const router = useRouter();
//     const [invoice, setInvoice] = useState<InvoiceProps | null>(null);
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await dispatch<any>(fetchInvoice(id));
//           setInvoice(response);
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       };
//       fetchData();
//     }, [id, dispatch]);
//   const [companyData, setCompanyData] = useState({
//     additional_fields: {},
  
//   });

//   const handleFieldChange = (event) => {
//     const { name, value } = event.target;
//     setCompanyData((prevState) => ({
//       ...prevState,
//       additional_fields: {
//         ...prevState.additional_fields,
//         [name]: value,
//       },
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     dispatch<any>(updateCompany(invoice?.company?.id, companyData,router));
//     console.log(companyData)

//   };

//   return (
//     <form onSubmit={handleSubmit}>
//        ddddddhhhhhhhhhhhhhhhhhhhhhhddd
//       {Object.entries(companyData.additional_fields).map(([key, value]) => (
//         <label key={key}>
//           {key}:
//           <input
//             type="text"
//             placeholder="write key value"
//             name={key}
//             value={value}
//             onChange={handleFieldChange}
//           />
//         </label>
//       ))}

//       <button type="submit">Update Company</button>
//     </form>

    
//   );
// };

// export default UpdateCompanyForm;




// import React, { useState,useEffect } from 'react';
// import { fetchInvoice } from "@/redux/actions/invoices";
// import { InvoiceProps } from "./InvoiceProps";

// const UpdateCompanyForm = ({params}:any) => {
//   const [additional_fields, setAdditionalFields] = useState({});
//   const [keyInput, setKeyInput] = useState('');
//   const [valueInput, setValueInput] = useState('');
//     const dispatch = useDispatch();
//       const id = params.id as string;
//       const router = useRouter();
//     const [invoice, setInvoice] = useState<InvoiceProps | null>(null);
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await dispatch<any>(fetchInvoice(id));
//           setInvoice(response);
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       };
//       fetchData();
//     }, [id, dispatch]);

//   const handleKeyChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
//     setKeyInput(e.target.value);
//   };

//   const handleValueChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
//     setValueInput(e.target.value);
//   };

//   const handleAddField = () => {
//     if (keyInput && valueInput) {
//       setAdditionalFields((prevFields) => ({
//         ...prevFields,
//         [keyInput]: valueInput,
//       }));
//       setKeyInput('');
//       setValueInput('');
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch<any>(updateCompany(invoice?.company?.id, additional_fields,router));
//     // Perform any necessary actions with the additionalFields object
//     console.log('Additional Fields:', additional_fields);
//     // Reset the additional fields
//     setAdditionalFields({});
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {Object.entries(additional_fields).map(([key, value]) => (
//         <div key={key}>
//           <span>{key}: {value}</span>
//         </div>
//       ))}
//       <div>
//         <input
//           type="text"
//           value={keyInput}
//           onChange={handleKeyChange}
//           placeholder="Enter a key"
//         />
//         <input
//           type="text"
//           value={valueInput}
//           onChange={handleValueChange}
//           placeholder="Enter a value"
//         />
//         <button type="button" onClick={handleAddField}>Add Field</button>
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default UpdateCompanyForm;
