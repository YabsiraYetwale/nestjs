'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {useDispatch} from 'react-redux';
import { useRouter } from 'next/navigation';
import { forgotPassword, signIn } from '@/redux/actions/auth';
import {useLocale } from 'next-intl';


const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),

});

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const localActive = useLocale();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    dispatch<any>(forgotPassword(values,router))

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }:any) => (
              <FormItem>
                <FormLabel> {localActive === "en" ? "Email" : "ኢሜይል"}</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6 bg-blue-600 hover:bg-blue-500' type='submit'>
          {localActive === "en" ? "Reset Password" : "Reset Password"}
        </Button>
      </form>      
    </Form>
  );
};

export default ForgotPasswordPage;