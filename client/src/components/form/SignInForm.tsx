import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";
import { ClipLoader } from "react-spinners";
import signInSchema from "@/schemas/sign-in";

interface Props {
  onSubmit: (values: z.infer<typeof signInSchema>) => void;
  onChange: () => void;
  isSigning: boolean;
  error: string;
}

const SignInForm = ({ onSubmit, onChange, error, isSigning }: Props) => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
                    onChange={onChange}
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
                    onKeyDown={onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2">
          <Link href="/forgot">
            <p className="text-sm underline text-blue-700 hover:font-medium duration-100">
              Forgot your password?
            </p>
          </Link>
        </div>
        {error && (
          <div className="mt-2 bg-red-400 rounded-sm py-1 text-[14px] text-center text-white">
            <p>{error}</p>
          </div>
        )}

        <Button
          className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-500"
          type="submit"
          disabled={isSigning ? true : false}
        >
          {isSigning ? <ClipLoader color="white" size={30} /> : "Sign in"}
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, register&nbsp;
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          here
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
