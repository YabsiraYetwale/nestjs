"use client";

import React, { useState } from "react";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { profileSchema, passRequiredProfileSchema } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { User } from "@/models/user";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
  selectedImage: File | null;
  onSubmit: (values: z.infer<typeof profileSchema>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileForm = ({
  user,
  onSubmit,
  selectedImage,
  onImageChange,
}: Props) => {
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);
  const router = useRouter();

  const schema = isPasswordDisabled ? profileSchema : passRequiredProfileSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: "",
      username: user.username,
      email: user.email,
    },
  });

  const profileRef = form.register("picture");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem className="lg:w-1/2">
              <FormControl>
                <Input
                  type="file"
                  id="picture"
                  className="hidden"
                  {...profileRef}
                  onChange={(event) => {
                    field.onChange(event.target?.files ?? undefined);
                    onImageChange(event);
                  }}
                />
              </FormControl>
              <FormMessage className="bg-red-400 rounded-md h-7 flex items-center justify-center text-white" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem
              className={`w-full lg:${selectedImage ? "w-3/4" : "w-1/2"}`}
            >
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input placeholder="Your name " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem
              className={`w-full lg:${selectedImage ? "w-3/4" : "w-1/2"}`}
            >
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem
              className={`w-full lg:${selectedImage ? "w-3/4" : "w-1/2"}`}
            >
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem
              className={`w-full lg:${selectedImage ? "w-3/4" : "w-1/2"}`}
            >
              <FormLabel>
                {isPasswordDisabled ? "Password" : "Current Password"}
              </FormLabel>
              <FormControl>
                <div className="flex gap-1 w-full">
                  <Input
                    type="password"
                    {...field}
                    disabled={isPasswordDisabled}
                  />
                  <Button
                    type="button"
                    onClick={() => setIsPasswordDisabled(!isPasswordDisabled)}
                  >
                    {isPasswordDisabled ? "Change" : "Revert"}
                  </Button>
                </div>
              </FormControl>

              {!isPasswordDisabled && <FormMessage />}
            </FormItem>
          )}
        />

        {!isPasswordDisabled && (
          <>
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem
                  className={`w-full lg:${selectedImage ? "w-3/4" : "w-1/2"}`}
                >
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      type="password"
                      {...field}
                      disabled={isPasswordDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_new_password"
              render={({ field }) => (
                <FormItem
                  className={`w-full lg:${selectedImage ? "w-3/4" : "w-1/2"}`}
                >
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      type="password"
                      {...field}
                      disabled={isPasswordDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <div className="flex gap-2 pt-2 w-full">
          <Button
            onClick={() => router.back()}
            className="bg-zinc-400 hover:bg-zinc-500"
          >
            Cancel
          </Button>
          <Button type="submit" className="w-28 bg-blue-500 hover:bg-blue-600">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
