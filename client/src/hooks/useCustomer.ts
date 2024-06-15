import { Client } from "@/models/client";
import apiClient from "@/services/api-client";
import { useEffect, useState } from "react";

const useCustomer = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState<Client | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get<Client>(`/clients/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);
  return {
    isLoading,
    customer,
  };
};

export default useCustomer;
