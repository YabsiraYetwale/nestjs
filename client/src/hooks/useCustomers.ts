import { Client } from "@/models/client";
import apiClient from "@/services/api-client";
import { useEffect, useState } from "react";

const useCustomers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState<Client[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get<Client[]>(`/clients`);
        setCustomers(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return {
    isLoading,
    customers,
  };
};

export default useCustomers;
