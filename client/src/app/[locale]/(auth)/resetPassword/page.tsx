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
import {resetPassword} from '@/redux/actions/auth';
import {useLocale } from 'next-intl';
import {useSearchParams } from "next/navigation";

const FormSchema = z.object({
  password: z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must have than 8 characters'),
  confirmPassword:z
  .string()
  .min(1, 'confirmPassword is required')
  .min(8, 'confirmPassword must have than 8 characters'),
  token:z.string().optional()
});

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const localActive = useLocale();
 const searchParams = useSearchParams();
 const token = searchParams.get('token');

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      token:token || ''
    },
  });
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    dispatch<any>(resetPassword(values,router))

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
        <FormField
            control={form.control}
            name='password'
            render={({ field }:any) => (
              <FormItem>
                <FormLabel>{localActive === "en" ? "Password" : "የይለፍ ቃል"}</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }:any) => (
              <FormItem>
                <FormLabel>{localActive === "en" ? "ConfirmPassword" : "የይለፍ ቃል"}</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter confirmPassword'
                    {...field}
                  />
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

export default ResetPasswordPage;