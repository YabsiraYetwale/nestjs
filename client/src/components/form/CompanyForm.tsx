import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import RiseLoader from "react-spinners/RiseLoader";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import companySchema from "@/schemas/company";
import { plainInputs, dropDownInputs } from "@/data/companyForm/fields";
import { Company } from "@/models/company";
import OverlaySpinner from "../OverlaySpinner";

interface Props {
  onSubmit: (values: z.infer<typeof companySchema>) => void;
  onCancel: () => void;
  isEditable?: boolean;
  company?: Company;
  isSending: boolean;
}

const CompanyForm = ({
  onSubmit,
  onCancel,
  isEditable,
  company,
  isSending,
}: Props) => {
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: isEditable
      ? {
          name: company?.name,
          description: "",
          generalManager: company?.general_manager_name,
          companyNumber: company?.company_number,
          tinNumber: company?.tin_number,
          houseNumber: company?.house_number,
          poBox: company?.po_box,
          fax: company?.fax,
          email: company?.email,
          tel1: company?.tel1,
          tel2: company?.tel2,
          country: company?.country,
          region: company?.region,
          city: company?.city,
          subcity: company?.subcity,
          woreda: company?.woreda,
        }
      : {
          name: "",
          description: "",
          generalManager: "",
          companyNumber: "",
          tinNumber: "",
          houseNumber: "",
          poBox: "",
          fax: "",
          email: "",
          tel1: "",
        },
  });

  const logoRef = form.register("logo");
  const docsRef = form.register("docs");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 relative"
      >
        <OverlaySpinner isLoading={isSending} />

        <div className="grid md:grid-col-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3 ">
          {plainInputs.map((input) => (
            <FormField
              key={input.value}
              control={form.control}
              name={input.value as any}
              render={({ field }) => (
                <FormItem className="md:w-full lg:w-5/6 xl:w-11/12 2xl:w-full ">
                  <FormLabel>{input.lable}</FormLabel>
                  <FormControl>
                    {input.value == "description" ? (
                      <Textarea
                        className="focus-visible:ring-zinc-300 "
                        {...field}
                      />
                    ) : (
                      <Input
                        className="focus-visible:ring-zinc-300"
                        type={input.type}
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="grid md:grid-col-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3 ">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...logoRef}
                      onChange={(event) => {
                        field.onChange(event.target?.files ?? undefined);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="docs"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Documents</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      {...docsRef}
                      onChange={(event) => [
                        ...Array.from(event.target?.files ?? []),
                      ]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="grid md:grid-col-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3">
          {dropDownInputs.map((input) => (
            <FormField
              key={input.value}
              control={form.control}
              name={input.value as any}
              render={({ field }) => (
                <FormItem className=" md:w-full lg:w-5/6 xl:w-11/12 2xl:w-full">
                  <FormLabel>{input.label}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="focus-visible:ring-zinc-300">
                      <SelectTrigger>
                        <SelectValue placeholder={`Select a ${input.label}`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {input.list.map((value) => (
                        <SelectItem key={value.value} value={value.value}>
                          {value.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <FormField
            control={form.control}
            name="woreda"
            render={({ field }) => (
              <FormItem className="md:w-full lg:w-5/6 xl:w-11/12 2xl:w-full">
                <FormLabel>Woreda</FormLabel>
                <FormControl className="focus-visible:ring-zinc-300">
                  <Input
                    className="focus-visible:ring-zinc-300"
                    placeholder="01"
                    prefix="0"
                    max={9}
                    min={1}
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kebele"
            render={({ field }) => (
              <FormItem className="md:w-full lg:w-5/6 xl:w-11/12 2xl:w-full">
                <FormLabel>Kebele</FormLabel>
                <FormControl className="focus-visible:ring-zinc-300">
                  <Input
                    className="focus-visible:ring-zinc-300"
                    placeholder="01"
                    prefix="0"
                    max={9}
                    min={1}
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <Button
            onClick={onCancel}
            type="button"
            className="bg-gray-300 text-black hover:bg-gray-400"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CompanyForm;
