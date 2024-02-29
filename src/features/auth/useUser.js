import { useState } from "react";

import { updateAdmin } from "./authApi";

export default function useUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const editAdmin = async (id, data) => {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      const res = await updateAdmin(id, data);
      if (res.status === 200) {
        setIsLoading(false);
        setSuccessMessage("User Successfully Updated.");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const reset = () => {
    setError("");
    setSuccessMessage("");
    setIsLoading(false);
  };

  return {
    successMessage,
    isLoading,
    error,
    reset,
    editAdmin,
  };
}
