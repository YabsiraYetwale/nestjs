'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import {useDispatch} from 'react-redux';
import { useRouter } from 'next/navigation';
import { signUp } from '@/redux/actions/auth';
import {useLocale } from 'next-intl';

const FormSchema = z
  .object({
    name: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
      retypePassword:z
      .string()
      .min(1, 'retypePassword is required')
      .min(8, 'retypePassword must have than 8 characters'),
  })

const SignUpForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const localActive = useLocale();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      retypePassword:'',
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    // console.log(values);
    dispatch<any>(signUp(values,router,localActive))
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }:any) => (
              <FormItem>
                <FormLabel>{localActive === "en" ? "Username" : "መለያ ስም"}</FormLabel>
                <FormControl>
                  <Input placeholder='johndoe' {...field} />
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
                <FormLabel> {localActive === "en" ? "Email" : "ኢሜይል"}</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name='retypePassword'
            render={({ field }:any) => (
              <FormItem>
                <FormLabel>{localActive === "en" ? "retypePassword" : "የይለፍ ቃል"}</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter retypePassword'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6 bg-blue-600 hover:bg-blue-500' type='submit'>
          {localActive === "en" ? "Sign up" : "ይመዝገቡ"}
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
      {localActive === "en" ? "or" : "ወይም"}
      </div>
      <GoogleSignInButton>{localActive === "en" ? "Sign up with Google" : "በGoogle ይመዝገቡ"}</GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
      {localActive === "en" ? "If you have an account, please" : "አካውንት ካለዎት እባክዎ"}&nbsp;
        <Link className='text-blue-500 hover:underline' href={`/${localActive}/sign-in`}>
        {localActive === "en" ? "Sign in" : "ይግቡ"}
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
