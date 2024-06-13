import React from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import resetPasswordSchema from "@/schemas/reset_password";

interface Props {
  onSubmit: (values: z.infer<typeof resetPasswordSchema>) => void;
}

const ResetPasswordForm = ({ onSubmit }: Props) => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col py-10 gap-3 "
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-semibold">
            Let&apos;s get you a new password
          </p>
          <div className="text-xs flex flex-col gap-2">
            <p>You&apos;re password should adhere the following: </p>
            <ul className="list-disc ml-7">
              <li>Must contain atleast 8 characters</li>
            </ul>
          </div>
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="focus-visible:ring-zinc-200 mt-2 bg-zinc-200"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input
                  type="password"
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
          Reset
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
