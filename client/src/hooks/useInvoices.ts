import { useEffect, useState } from "react";
import apiClient from "@/services/api-client";
import { Invoice } from "@/models/invoice";

const useInvoices = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get<Invoice[]>(
          `/invoices?searchQuery=${searchQuery}`
        );
        setInvoices(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchQuery]);

  return {
    isLoading,
    invoices,
    searchQuery,
    setSearchQuery,
  };
};

export default useInvoices;
