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
import { signIn } from '@/redux/actions/auth';
import {useState,useEffect } from 'react';
import { ClipLoader } from "react-spinners";





const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true); 
    try {
      await dispatch<any>(signIn(values, router));
      form.reset();
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
      <div className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="mail@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="mt-2">
        <Link href={`/forgot-password`}>
          <p className="text-sm underline text-blue-700 hover:font-medium duration-100">
            Forgot your password?
          </p>
        </Link>
      </div>

      <Button
        className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-500"
        type="submit"
        disabled={isLoading ? true : false}
      >
        {isLoading ? <ClipLoader color="white" size={30} /> : "Sign in"}
      </Button>
    </form>
    <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
      or
    </div>
    <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
    <p className="text-center text-sm text-gray-600 mt-2">
      If you don&apos;t have an account, register&nbsp;
      <Link className="text-blue-500 hover:underline" href={`/sign-up`}>
        here
      </Link>
    </p>
  </Form>
  );
};

export default SignInForm;
