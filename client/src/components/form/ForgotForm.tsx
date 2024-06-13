import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import forgotSchema from "@/schemas/forgot";

interface Props {
  onSubmit: (values: z.infer<typeof forgotSchema>) => void;
}

const ForgotForm = ({ onSubmit }: Props) => {
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col py-10 gap-3 "
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-semibold">
            Let&apos;s get you into your account
          </p>
          <div className="text-xs flex flex-col gap-2">
            <p>Tell us one of the following to get started: </p>
            <ul className="list-disc ml-7">
              <li>Sign-in email address</li>
            </ul>
          </div>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="mail@example.com"
                  className="focus-visible:ring-zinc-200 mt-2 bg-zinc-200"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full mt-6 bg-blue-600 hover:bg-blue-500 rounded-full"
          type="submit"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default ForgotForm;
