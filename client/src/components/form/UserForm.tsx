"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import userSchema from "@/schemas/user";
import permissions from "@/data/permissions";
import { User } from "@/models/user";
import roles from "@/data/roles";

interface Props {
  user?: User;
}

const UserForm = ({ user }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullname: user ? user.fullname : "",
      username: user ? user.username : "",
      email: user ? user.username : "",
      password: user ? user.username : "",
      permissions: [],
      roles: [],
    },
  });

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row  gap-4">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }: any) => (
                <FormItem className="w-full">
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-zinc-200"
                      placeholder="Mr.x"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }: any) => (
                <FormItem className="w-full">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-zinc-200"
                      placeholder="johny"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row  gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }: any) => (
                <FormItem className="w-full">
                  <FormLabel> Email</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-zinc-200"
                      placeholder="email@example.com"
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
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-zinc-200"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="roles"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Roles</FormLabel>
                  <FormDescription>
                    Select the role you want to give to this user.
                  </FormDescription>
                </div>
                <div className="flex gap-4 flex-wrap items-center">
                  {roles.map((role) => (
                    <FormField
                      key={role.id}
                      control={form.control}
                      name="roles"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={role.id}
                            className="flex flex-row items-center space-x-2 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(role.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        role.value,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== role.value
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {role.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="permissions"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Permissions</FormLabel>
                  <FormDescription>
                    Select the access you want to give to this role.
                  </FormDescription>
                </div>
                <div className="flex gap-4 flex-wrap items-center">
                  {permissions.map((permission) => (
                    <FormField
                      key={permission.action}
                      control={form.control}
                      name="permissions"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={permission.id}
                            className="flex flex-row items-center space-x-2 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(
                                  permission.action
                                )}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        permission.action,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== permission.action
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {permission.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-5 mt-6">
          <Button className="bg-blue-600 hover:bg-blue-500">
            {user ? "Edit User" : "Add User"}
          </Button>
          <Button
            onClick={() => router.back()}
            className="bg-zinc-400 hover:bg-zinc-300"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
