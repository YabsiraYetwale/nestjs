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
import {useLocale } from 'next-intl';
import {useState,useEffect } from 'react';
import { CompanyProps } from "../../schemas/companyProps";
import { fetchCompanies } from "@/redux/actions/companies";




const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
    companyId:z.string().optional(),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const localActive = useLocale();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      companyId:''
    },
  });

  const [companies, setCompanies] = useState<CompanyProps[] | null>(null);
  const [existingCompany, setExistingCompany] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch<any>(fetchCompanies());
        setCompanies(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    dispatch<any>(signIn(values,router))

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
            {!existingCompany && (
                          <p
                            onClick={() => setExistingCompany(true)}
                            className="text-blue-600 hover:text-blue-400  cursor-pointer"
                          >
                            {localActive === "en" ? "If you have a registed company click here" : "If you have a registed company click here"}
                          </p>
                        )}
            {existingCompany && (

                        <FormField
                          control={form.control}
                          name="companyId"
                          render={({ field }: any) => (
                            <FormItem>
                              <FormControl>
                                <select
                                  className="flex gap-5 border"
                                  {...field}
                                >
                                  <option> --{localActive === "en" ? "choose company" : "company ይምረጡ"} --</option>
                                  {companies?.map((i, index) => (
                                    <option key={index} value={i?.id}>{i?.name}</option>
                                  ))}
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                       )} 
        </div>
        <Button className='w-full mt-6 bg-blue-600 hover:bg-blue-500' type='submit'>
          {localActive === "en" ? "Sign in" : "ይግቡ"}
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
      {localActive === "en" ? "or" : "ወይም"}
      </div>
      <GoogleSignInButton >{localActive === "en" ? "Sign in with Google" : "በGoogle ይግቡ"}</GoogleSignInButton>
      <div className='flex flex-col mt-4'>
          <p className='text-center text-sm text-gray-600'>
      {localActive === "en" ? `If you don&apos;t have an account, please&nbsp;` : "አካውንት ከሌለዎት እባክዎ"}
        <Link className='text-blue-500 hover:underline' href={`/${localActive}/sign-up`}>
          {localActive === "en" ? "Sign up" : "ይመዝገቡ"}
        </Link>
      </p>
      <Link className='text-center text-blue-500 hover:underline' href={`/${localActive}/forgotPassword`}>forgot password</Link>
      </div>
    
    </Form>
  );
};

export default SignInForm;
