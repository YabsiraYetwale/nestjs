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


const FormSchema = z
  .object({
    
    client_id : z.string().min(1, 'client_id  is required').max(100),
    invoice_number : z.string().min(1, 'invoice_number  is required'),
    date: z.string().min(1, ' date is required'),
    due_date: z.string().min(1, 'due_dateis required'),
  })

const ItemsForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      client_id: '',
      invoice_number: '',
      date: '',
      due_date: '',
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
      <p className='font-bold text-[30px]'>Add Items</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-[80%] flex flex-col gap-5'>
          <FormField
            control={form.control}
            name='client_id'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <select>
                    <option>Choose client_id</option>
                    <option>client_id1</option>
                    <option>client_id2</option>
                    <option>client_id3</option>
                    <option>client_id4</option>
                  </select>
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
                  <Input placeholder='Enter invoice_number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='date' placeholder='Enter the date' {...field} />
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
                  <Input type='date' placeholder='Enter the due_date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button className='w-full mt-6' type='submit'>
          Create item
        </Button>
      </form>
    </Form>
    </div>
  );
};

export default ItemsForm;
