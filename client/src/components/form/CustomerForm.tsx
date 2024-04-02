'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import {useDispatch} from 'react-redux';
import { useRouter } from 'next/navigation';
import { createCustomer, fetchCustomer, updateCustomer } from '@/redux/actions/customers';
const FormSchema = z
  .object({
    name: z.string().min(1, 'name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    billing_address: z.string().min(1, 'billing_address is required'),
    contact_person: z.string().min(1, 'contact_person is required').max(100),
    phone: z.string().min(1, 'phone number is required').max(100),
  })

const CustomerForm = ({params}:any) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const id = params.id as string;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      billing_address: '',
      contact_person: '',
      phone: '',
    },
  });
 
  useEffect(() => {
    if(id){
     const fetchData = async () => {
       try {
         const response = await dispatch(fetchCustomer(id));
         form.reset(response);
       } catch (error) {
         console.error("Error:", error);
       }
     };
     fetchData();
    }
     }, [id,dispatch]);
   
     const onSubmit = (values: z.infer<typeof FormSchema>) => {
       if(id){
         dispatch(updateCustomer(id,values,router));
       }
       else{
         dispatch(createCustomer(values,router));
       }
     };

  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
      <p className='font-bold text-[30px]'>{id ? 'Update ':'Add '}Customer</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-[80%] flex flex-col gap-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='youremail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='billing_address'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter the billing address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='contact_person'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter contact person ' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter phone number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button className='w-full mt-6' type='submit'>
          {id ? 'Update ':'Add ' }Customer
        </Button>
      </form>
    </Form>
    </div>
  );
};

export default CustomerForm;
