'use client';

import { useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import {useDispatch} from 'react-redux';
import { useRouter } from 'next/navigation';
import { createCustomer, fetchCustomer, updateCustomer } from '@/redux/actions/customers';
import Link from 'next/link';
import { CardContent } from '../../Card';

const FormSchema = z
  .object({
    name: z.string().min(1, 'name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    billing_address: z.string().min(1, 'billing_address is required'),
    contact_person: z.string().min(1, 'contact_person is required').max(100),
    phone: z.string().min(1, 'phone number is required').max(100),

    shipping_address:z.string().min(1, 'shipping_address is required').max(20),
    shipping_city   :z.string().min(1, 'shipping_city is required').max(20),
    shipping_state  :z.string().min(1, 'shipping_state is required').max(20),
    shipping_zip    :z.string().min(1, 'shipping_zipcode is required').max(20),
    shipping_country:z.string().min(1, 'shipping_country is required').max(20),
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
      shipping_address:'',
      shipping_city   :'',
      shipping_state  :'',
      shipping_zip    :'',
      shipping_country:'',
    },
  });
 
  useEffect(() => {
    if(id){
     const fetchData = async () => {
       try {
         const response = await dispatch<any>(fetchCustomer(id));
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
         dispatch<any>(updateCustomer(id,values,router));
       }
       else{
         dispatch<any>(createCustomer(values,router));
       }
     };

  return (
    <div className='flex flex-col gap-5'>
      <p className='font-bold text-[30px]'>{id ? 'Update ':'Add '}Customer</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-[100%] flex flex-col gap-5'>
        <div className='flex gap-5'>
          <CardContent className='w-[100%] flex flex-col gap-5'>
          <p className='font-bold text-[20px] text-gray-600 bg-zinc-100 py-5 px-5 border-b border-s-zinc-200 w-[107.5%] relative top-[-19.5px] left-[-19px]'>
            Customer Information
          </p>
          <div className='flex gap-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input className='w-[18vw]' placeholder='Enter Name' {...field} />
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
                  <Input className='w-[18vw]' placeholder='youremail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className='flex gap-5'>
          <FormField
            control={form.control}
            name='contact_person'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input className='w-[18vw]' placeholder='Enter contact person ' {...field} />
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
                  <Input className='w-[18vw]' placeholder='Enter phone number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
            <FormField
            control={form.control}
            name='billing_address'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <textarea className='w-[100%] h-[100px] border' placeholder='Enter the billing address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </CardContent>
          <CardContent className='w-[100%] flex flex-col gap-5'>
          <p className='font-bold text-[20px] text-gray-600 bg-zinc-100 py-5 px-5 border-b border-s-zinc-200 w-[107.5%] relative top-[-19.5px] left-[-19px]'>Shipping Information</p>
          <div className='flex gap-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input className='w-[18vw]' placeholder='Enter Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name='shipping_address'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input className='w-[18vw]' placeholder='Enter shipping_address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className='flex gap-5'>
          <FormField
            control={form.control}
            name='shipping_city'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input className='w-[18vw]' placeholder='Enter shipping city' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
            control={form.control}
            name='shipping_state'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input className='w-[18vw]' placeholder='Enter shipping state' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className='flex gap-5'>
          <FormField
            control={form.control}
            name='shipping_zip'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input className='w-[18vw]' placeholder='Enter shipping zipcode' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
            control={form.control}
            name='shipping_country'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input className='w-[18vw]' placeholder='Enter shipping country' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
        </CardContent>
        </div>
        <div className='flex gap-5 mt-6'>
        <Button className='bg-blue-600 sm:h-[40px] h-[30px] hover:bg-blue-500 ' type='submit'>
          {id ? 'Update ':'Add ' }Customer
        </Button>
        <Button className="bg-red-600 sm:h-[40px] h-[30px] hover:bg-red-500">
                <Link href={`/${localActive}/dashboard/customers`}>Cancel</Link>
              </Button>
        </div>
      </form>
    </Form>
    </div>
  );
};

export default CustomerForm;
