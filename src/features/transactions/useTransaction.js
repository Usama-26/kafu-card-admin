import { useState } from "react";
import { fetchTransactionDetails } from "./transactionApi";

export default function useTransaction() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [transactionDetails, setTransactionDetails] = useState(null);
  console.log(transactionDetails);
  const getTransactionDetails = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetchTransactionDetails(id);
      if (res.status === 200) {
        setIsLoading(false);
        setTransactionDetails(res.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const reset = () => {
    setTransactionDetails(null);
    setError("");
    setIsLoading(false);
  };

  return {
    transactionDetails,
    isLoading,
    error,
    reset,
    getTransactionDetails,
  };
}
