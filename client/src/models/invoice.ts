import { Client } from "./client";

export interface Invoice {
  id: string;
  invoice_number: string;
  date: string;
  due_date: string;
  total_amount: string;
  status: "paid" | "sent" | "unpaid" | "read";
  company_id: string;
  client_id: string;
  creator: {
    id: string;
    email: string;
    company_id: string;
  };
  line_items: LineItem[];
  isRead: boolean;
  client: Client;
}

interface LineItem {
  description: string;
  id: string;
  invoice_id: string;
  quantity: number;
  tax_rate: string;
  unit_price: string;
}
