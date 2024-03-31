'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {useDispatch} from 'react-redux';
import { createInvoice } from '@/redux/actions/invoices';

const FormSchema = z
  .object({
    
    client_id : z.string().min(1, 'client_id  is required').max(100),
    invoice_number : z.string().min(1, 'invoice_number  is required'),
    date: z.string().min(1, ' date is required'),
    due_date: z.string().min(1, 'due_dateis required'),
    name:z.string().min(1, 'namerequired'),
    total_amount:z.coerce.number().gte(1, 'Must be 1 and above')
  })
const InvoiceForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      client_id: '',
      invoice_number: '',
      date: '',
      due_date: '',
      name:'',
      total_amount:0
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    dispatch(createInvoice(values))

  };
  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
      <p className='font-bold text-[30px]'>Add Invoice</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-[80%] flex flex-col gap-5'>
        <div className='w-[100%] flex gap-5'>
        <FormField
            control={form.control}
            name='client_id'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* <select {...field} className="border text-center w-[10vw] h-[40px]  flex  gap-5" >
                    <option>Choose client_id</option>
                    <option>client_id1</option>
                    <option>client_id2</option>
                    <option>client_id3</option>
                    <option>client_id4</option>
                  </select> */}
                  <Input className='w-[54vw] flex  gap-5'  placeholder='Enter client_id' {...field} />

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className='w-[54vw] flex  gap-5'  placeholder='Enter property name' {...field} />

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name='total_amount'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='number' className='w-[54vw] flex  gap-5'  placeholder='Enter property total_amount' {...field} />

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            
          <FormField
            control={form.control}
            name='invoice_number'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className='w-[54vw] flex  gap-5'  placeholder='Enter invoice_number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
            <div className='w-[100%] flex gap-5'>
            <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='date' className='w-[32vw] flex  gap-5' placeholder='Enter the date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='due_date'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='date' className='w-[32vw] flex  gap-5' placeholder='Enter the due_date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            </div>
            
       <Button className='w-[100px]' type='submit'>
          Save 
        </Button>
      </form>
    </Form>
    </div>
  );
};

export default InvoiceForm;
