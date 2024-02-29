import { useState } from "react";
import {
  createOffer,
  createOfferInvoice,
  deleteOffer,
  fetchOffer,
  updateOffer,
} from "./offerApi";

export default function useOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [offer, setOffer] = useState(null);

  const getOffer = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetchOffer(id);
      if (res.status === 200) {
        setIsLoading(false);
        setOffer(res.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const addOffer = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await createOffer(data);
      if (res.status === 200) {
        setIsLoading(false);
        setSuccessMessage("Offer Successfully Added.");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const approveOffer = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await createOfferInvoice(data);
      if (res.status === 204) {
        setIsLoading(false);
        setSuccessMessage("Invoice Successfully Created.");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const editOffer = async (id, data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await updateOffer(id, data);
      if (res.status === 200) {
        setIsLoading(false);
        setSuccessMessage("Offer Successfully Updated.");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const removeOffer = async (id, data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await deleteOffer(id, data);
      if (res.status === 204) {
        setIsLoading(false);
        setSuccessMessage("Offer Successfully Deleted.");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const reset = () => {
    setOffer(null);
    setError("");
    setSuccessMessage("");
    setIsLoading(false);
  };

  return {
    offer,
    successMessage,
    isLoading,
    error,
    reset,
    getOffer,
    addOffer,
    editOffer,
    removeOffer,
    approveOffer,
  };
}
