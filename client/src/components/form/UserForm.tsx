'use client';

import { useForm } from 'react-hook-form';
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
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { CardContent } from '../Card';
import {useDispatch} from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchUser, updateUser } from '@/redux/actions/auth';
import { useEffect } from 'react';

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    role: z.string()
  })

const UserForm = ({params}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const id = params.id;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      role:''
    },
  });

  useEffect(() => {
    if(id){
     const fetchData = async () => {
       try {
         const response = await dispatch(fetchUser(id));
         form.reset(response);
         console.log("res", response);
       } catch (error) {
         console.error("Error:", error);
       }
     };
     fetchData();
    }
     }, [dispatch]);
   
     const onSubmit = (values: z.infer<typeof FormSchema>) => {
       if(id){
         dispatch(updateUser(id,values,router));
       }
      //  else{
      //    dispatch(createUser(values,router));
      //  }
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
            render={({ field }) => (
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
            render={({ field }) => (
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
            render={({ field }) => (
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
            render={({ field }) => (
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
          </div>
        <Button className='w-full mt-6' type='submit'>
        {id?'Update':'Create'} User
        </Button>
      </form>
    </Form>
    </div>
  </CardContent>
  );
};

export default UserForm;
