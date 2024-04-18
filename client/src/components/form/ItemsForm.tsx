'use client';

import { useForm} from 'react-hook-form';
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
import { useRouter } from 'next/navigation';
import {useDispatch} from 'react-redux';
import { createItem } from '@/redux/actions/items';

const FormSchema = z.object({
  invoice_id: z.string().min(1, 'invoice_id is required').max(100),
  description: z.string().min(1, 'description is required'),
  unit_price: z.coerce.number().gte(1, 'Must be 1 and above'),
  tax_rate: z.coerce.number().gte(1, 'Must be 1 and above'),
  quantity: z.coerce.number().gte(1, 'Must be 1 and above')
});

const ItemsForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      invoice_id: '',
      unit_price:0,
      tax_rate:0,
      quantity:0,
      description:'',
    },
  });
 
  const { control, handleSubmit } = form;
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    dispatch<any>(createItem(values,router))
  };

  return (
    <div className='flex flex-col gap-5 py-7 justify-center sm:items-center text-gray-600'>
      <p className='font-bold text-[30px]'>Add Items</p>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='w-[60%] flex flex-col gap-5'>
          <FormField
            control={control}
            name='invoice_id'
            render={({ field }:any) => (
              <FormItem className="flex flex-col gap-[10px]  items-center relative left-[-220px] ">
              <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input className='w-[150px] flex  gap-5'  placeholder='invoice number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                 <FormField
                control={form.control}
                name={`description`}
                render={({ field }:any) => (
                  <FormItem className="flex flex-col gap-[10px]  items-center">
              <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea className='border solid w-full h-[90px]' placeholder='Enter item name or  description' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='w-[100%] flex sm:flex-row flex-col gap-5'>
              <FormField
                control={control}
                name={`unit_price`}
                render={({ field }:any) => (
                  <FormItem className="flex flex-col gap-[10px]  items-center">
                  <FormLabel>Unit Price</FormLabel>
                    <FormControl>
                   <Input className='flex  sm:w-[20vw] w-[85vw] gap-5' type='number' placeholder='Enter unit price' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`quantity`}
                render={({ field }:any) => (
                  <FormItem className="flex flex-col gap-[10px]  items-center">
                  <FormLabel>Quantity</FormLabel>
                    <FormControl>
                   <Input className='flex sm:w-[20vw] w-[85vw]  gap-5' type='number' placeholder='Enter quantity' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`tax_rate`}
                render={({ field }:any) => (
                  <FormItem className="flex flex-col gap-[10px]  items-center">
                  <FormLabel>Tax Rate</FormLabel>
                    <FormControl>
                      <Input className='flex sm:w-[20vw] w-[85vw]  gap-5' type='number' placeholder='Enter tax rate' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          <Button className='w-[100px] mt-6' type='submit'>
            Create item
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ItemsForm;
