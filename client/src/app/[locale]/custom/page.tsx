'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { fetchInvoice } from '@/redux/actions/invoices';
import { InvoiceProps } from '@/components/schemas/InvoiceProps';

interface Field {
  name: string;
  value: string;
}

function CustomFieldsForm({ params }: any) {
  const id = params.id as string;
  const dispatch = useDispatch();
  const [additional_fields, setFields] = useState<Field[]>([]);
  const [company_id, setCompanyId] = useState('');
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
        const response = await axios.get('http://localhost:3001/api/items/custom');
        const { additional_fields: fetchedFields } = response.data;

        const initialFields: Field[] = [];

        fetchedFields.forEach((item: any) => {
          if (item.additional_fields && item.additional_fields) {
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
        console.error('Failed to fetch custom fields:', error);
      }
    };

    fetchData();
  }, []);

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
        company_id,
      };

      const response = await axios.post('http://localhost:3001/api/items/custom', payload);

      console.log('Custom field created successfully!');
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
              value={invoice?.company?.id}
              readOnly
              onChange={(e) => setCompanyId(e.target.value)}
        />
      {additional_fields.map((field, index) => (
        <div key={index}>
          <label>
            <input
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
              type="text"
              placeholder="add value"
              name="value"
              value={field.value}
              onChange={(e) => handleFieldChange(e, index)}
            />
          </label>
          <button type="button" onClick={() => removeField(index)}>
            Remove Field
          </button>
          <br />
        </div>
      ))}
      <button type="button" onClick={addField}>
        Add Field
      </button>
      <br />
      <button type="submit">Create Custom Fields</button>
    </form>
  );
}

export default CustomFieldsForm;