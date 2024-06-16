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
import { CardContent } from '../../Card';
import {useDispatch} from 'react-redux';
import { useRouter } from 'next/navigation';
import { createUser, fetchUser, updateUser } from '@/redux/actions/auth';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCompanies } from '@/redux/actions/companies';
import { CompanyProps } from '../../schemas/companyProps';

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    role: z.string().optional(),
    company_id: z.string()
  })

const UserForm = ({params}:any) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const id = params.id as string;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      role:'',
      company_id:'',
    },
  });

  const [companies, setCompanies] = useState<CompanyProps[] | null>(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await dispatch<any>(fetchCompanies());
      setCompanies(response);
      console.log('comp res',response)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, [dispatch]);

  useEffect(() => {
    if(id){
     const fetchData = async () => {
       try {
         const response = await dispatch<any>(fetchUser(id));
         form.reset(response);
         console.log("res", response);
       } catch (error) {
         console.error("Error:", error);
       }
     };
     fetchData();
    }
     }, [id,dispatch]);
   
     const onSubmit = (values: z.infer<typeof FormSchema>) => {
       if(id){
         dispatch<any>(updateUser(id,values,router));
       }
       else{
         dispatch<any>(createUser(values,router));
       }
     };

  return (
  <CardContent>
      <div className='flex flex-col gap-5 justify-center items-center'>
      <p className='font-bold text-[30px]'>{id?'Update':'Create'} User</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-[80%] flex flex-col gap-[40px]'>
        <div className='flex flex-col gap-5'>
      <FormField
            control={form.control}
            name='username'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='username' {...field} />
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
                  <Input placeholder='youremail@example.com' {...field} />
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
                <FormControl>
                  <Input placeholder='Enter your password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='role'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <select {...field}  className='border text-center w-[200px] h-[50px]'>
                    <option>Choose role</option>
                    <option>admin</option>
                    <option>user</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='company_id'
            render={({ field }:any) => (
              <FormItem>
                <FormControl>
                  <select {...field}  className='border text-center w-[200px] h-[50px]'>
                    <option>..Choose company--</option>
                   {companies?.map((company,i)=>(
                     <option key={i} value={company.id}>{company.email}</option>
                   ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
        <div className='flex gap-5 mt-6'>
        <Button className='bg-blue-600 sm:h-[40px] h-[30px] w-[100px] hover:bg-blue-500 ' type='submit'>
        {id?'Update':'Create'} User
        </Button>
        <Button className="bg-red-600 sm:h-[40px] h-[30px]  hover:bg-red-500">
                <Link href={`/users`}>Cancel</Link>
              </Button>
        </div>
      </form>
    </Form>
    </div>
  </CardContent>
  );
};

export default UserForm;
