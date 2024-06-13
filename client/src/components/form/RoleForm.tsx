"use client";

import Role from "@/models/role";
import roleSchema from "@/schemas/role";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import permissions from "@/data/permissions";
import { useRouter } from "next/navigation";

interface Props {
  onSubmit: (values: z.infer<typeof roleSchema>) => void;
  role?: Role;
}

const RoleForm = ({ onSubmit, role }: Props) => {
  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: role
      ? {
          name: role.name,
          value: role.value,
          permissions: role.permissions?.map((permission) => permission.action),
        }
      : { name: "", value: "", permissions: [] },
  });

  const router = useRouter();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="space-y-2 flex flex-col gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Role Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Administrator"
                    className="focus-visible:ring-zinc-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg. 'admin' for Administrator"
                    className="focus-visible:ring-zinc-200"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Values should represent the name in short.
                </FormDescription>
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
        <div className="self-end flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-500">
            {role ? "Edit Role" : "Add Role"}
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

export default RoleForm;
