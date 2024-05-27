'use client'
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { fetchInvoice } from '@/redux/actions/invoices';
import { InvoiceProps } from '@/components/schemas/InvoiceProps';
import { createAdditionalFields, fetchAdditionalFieldsByCompanyId } from '@/redux/actions/items';
import { useRouter } from 'next/navigation';

interface Field {
  name: string;
  value: string;
}

function CustomFieldsForm1({ params }: any) {
  const id = params.id as string;
  const dispatch = useDispatch();
  const router = useRouter();
  const [additional_fields, setFields] = useState<Field[]>([]);
  const [company_id, setCompanyId] = useState('');
  const [position, setPosition] = useState('');
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>( fetchAdditionalFieldsByCompanyId(invoice?.company.id));
        const { additionalFields } = response;
      
        const initialFields: Field[] = [];
  
        additionalFields.forEach((item: any) => {
          if (item.additional_fields && item.position=='1') {
            const fieldObj = item.additional_fields;
  
            Object.entries(fieldObj).forEach(([name, value]: [string, unknown]) => {
              if (name !== 'additional_fields' && name !== 'company_id' && typeof value === 'string') {
                initialFields.push({ name, value });
              }
            });
          }
        });
        setFields(initialFields);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [invoice?.company.id, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const transformedFields: { [key: string]: string } = {};
      additional_fields.forEach((field) => {
        const { name, value } = field;
        transformedFields[name] = value;
      });

      const payload = {
        additional_fields: transformedFields,
        company_id:invoice?.company.id,
        position:'1',
      };
      dispatch<any>(createAdditionalFields( payload,router));
        // Fetch the updated template data and update the fields
        const response = await dispatch<any>( fetchAdditionalFieldsByCompanyId(invoice?.company.id));
        const { additionalFields } = response;
        const initialFields: Field[] = [];
  
        additionalFields.forEach((item: any) => {
          if (item.additional_fields && item.position=='1') {
            const fieldObj = item.additional_fields;
            
            Object.entries(fieldObj).forEach(([name, value]: [string, unknown]) => {
              if ( name !== 'additional_fields' && name !== 'company_id' && typeof value === 'string') {
                
                initialFields.push({ name, value });
              }
            });
          }
        });
        setFields(initialFields);
    } catch (error) {
      console.error('Failed to create custom field:', error);
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    setFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = { ...updatedFields[index], [name]: value };
      return updatedFields;
    });
  };

  const addField = () => {
    setFields((prevFields) => [...prevFields, { name: '', value: '' }]);
  };

  const removeField = (index: number) => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields.splice(index, 1);
      return updatedFields;
    });
  };

  return (
    <form onSubmit={handleSubmit}>
       <input
              type="text"
              placeholder="company id"
              name="company_id"
              value={company_id}
              // readOnly
              onChange={(e) => setCompanyId(e.target.value)}
              className='hidden'
        />
       <input
              type="text"
              placeholder="position"
              name="position"
              value={position}
              // readOnly
              onChange={(e) => setPosition(e.target.value)}
              className='hidden'
        />
      {additional_fields.map((field, index) => (
        <div key={index}  className="flex">
          <label>
            <input
              className="w-[100px]"
              type="text"
              placeholder="add key"
              name="name"
              value={field.name}
              onChange={(e) => handleFieldChange(e, index)}
            />
          </label>
          :
          <label>
            <input
              className="w-[100px]"
              type="text"
              placeholder="add value"
              name="value"
              value={field.value}
              onChange={(e) => handleFieldChange(e, index)}
            />
          </label>
          <button type="button" onClick={() => removeField(index)}  className="flex justify-center items-center align-center  w-[15px] h-[15px] bg-red-500 text-white rounded-full">
            {/* Remove Field */} -
          </button>
          <br />
        </div>
      ))}
      <button type="button" onClick={addField} className="flex justify-center items-center align-center  w-[20px] h-[20px] bg-blue-500 text-white  rounded-full">
        {/* Add Field */} +
      </button>
      <br />
      <button type="submit" className=" bg-transparent hover:bg-transparent flex text-purple-600 font-semibold items-center space-x-2 px-3 rounded-sm border border-purple-600">
        Create
      </button>
    </form>
  );
}

export default CustomFieldsForm1;