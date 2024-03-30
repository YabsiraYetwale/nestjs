'use client';

import { useState } from 'react';
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
import { useRouter } from 'next/navigation';

const FormSchema = z
  .object({
    name: z.string().min(1, 'name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    billing_address: z.string().min(1, 'billing_address is required'),
    contact_person: z.string().min(1, 'contact_person is required').max(100),
    phone: z.string().min(1, 'phone number is required').max(100),
  })

const CustomerForm = () => {
  const router = useRouter()
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
const [isEdit , setIsEdit]= useState(false)
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
      <p className='font-bold text-[30px]'>{isEdit ? 'Update ':'Add '}Customer</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-[80%] flex flex-col gap-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
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
            render={({ field }) => (
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
            render={({ field }) => (
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
            render={({ field }) => (
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
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter phone number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button className='w-full mt-6' type='submit'>
          {isEdit ? 'Update ':'Add ' }Customer
        </Button>
      </form>
    </Form>
    </div>
  );
};

export default CustomerForm;
