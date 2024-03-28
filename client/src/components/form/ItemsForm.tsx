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
    
    invoice_id  : z.string().min(1, 'invoice_id   is required').max(100),
    description : z.string().min(1, 'description  is required'),
    quantity : z.string().min(1, ' quantity  is required'),
    unit_price: z.string().min(1, 'unit_price is required'),
    tax_rate: z.string().min(1, 'tax_rate is required'),
  })

const ItemsForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      invoice_id : '',
      description: '',
      unit_price: '',
      tax_rate: '',
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
            name='invoice_id'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <select>
                    <option>Choose invoice_id</option>
                    <option>invoice_id1</option>
                    <option>invoice_id2</option>
                    <option>invoice_id3</option>
                    <option>invoice_id4</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea className='border solid' placeholder='Enter description' {...field}  cols="125" rows="5"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='quantity'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='number' placeholder='Enter quantity' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='unit_price'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='number' placeholder='Enter unit price' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='tax_rate'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='number' placeholder='Enter tax rate' {...field} />
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
