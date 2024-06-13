"use client";

import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import verificationSchema from "@/schemas/verification";

interface Props {
  onSubmit: (values: z.infer<typeof verificationSchema>) => void;
}

const VerificationCodeForm = ({ onSubmit }: Props) => {
  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col  py-10 gap-5  "
      >
        <p className=" text-[14px] font-semibold">
          Enter the code you&apos;ve been sent.
        </p>

        <FormField
          control={form.control}
          name="code"
          render={({ field }: any) => (
            <>
              <FormItem>
                <FormLabel className="text-sm text-gray-700">
                  Verfication code
                </FormLabel>
                <FormControl>
                  <Input
                    className=" focus-visible:ring-zinc-200 mt-2 bg-zinc-200"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 rounded-full"
              >
                Verify
              </Button>
            </>
          )}
        />
      </form>
    </Form>
  );
};

export default VerificationCodeForm;
