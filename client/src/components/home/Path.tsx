// import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { CardContent } from "@/components/Card";

export default function Path() {
  // const t = useTranslations("Navigation");
  // const tr = useTranslations("Dashboard");
  const localActive = 'useLocale()';

  return (
    <CardContent className="flex flex-col justify-between">
      <section className="flex flex-col gap-5">
        <h2 className="font-bold">quickaccess</h2>
        <div className="flex flex-col gap-3 text-blue-600">
          <Link
            href={`/dashboard/invoices/addInvoice`}
            className="hover:underline"
          >
            newInvoice
          </Link>
          <Link
            href={`/dashboard/customers`}
            className="hover:underline"
          >
            manageCustomers
          </Link>
          <Link
            href={`/dashboard/invoices`}
            className="hover:underline"
          >
            viewStatus
          </Link>
        </div>
      </section>
    </CardContent>
  );
}
