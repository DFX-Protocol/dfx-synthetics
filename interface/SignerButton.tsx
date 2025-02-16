import React from "react";
import { useSendTransaction } from "wagmi";
import toast from "./Toast";

import "./Signer.css";
import "./Toast.ts";

export default function SignerButton({ unsignedTransaction, transactionKey, isDisabled }) {
  const { sendTransaction } = useSendTransaction({
    ...unsignedTransaction,
    onError: (error) => {
      toast.error(`Transaction failed: ${error}`);
    },
    onSuccess: (data) => {
      console.log("data", data);
      toast.success(`Transaction sent: ${data.hash}`);
      fetch("http://localhost:3030/completed", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unsignedTransaction, transactionKey, data }),
      });
    },
  });

  const onClickPrimary = () => {
    sendTransaction();
  };

  return (
    <button
      className={`primary-button Signer-sign-button ${isDisabled ? "disabled" : ""}`}
      onClick={() => onClickPrimary()}
    >
      {isDisabled ? "Signed" : "Sign"}
    </button>
  );
}
