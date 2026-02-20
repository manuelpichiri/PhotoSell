import { useState } from "react";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // In demo puoi mettere una rotta "success" o la home
        return_url: `${window.location.origin}/paymentSucess`,
      },
      // redirect: "if_required" // opzionale: utile in alcune UX,
    });

    // Se non c'è redirect, gestisci errore immediato (dati incompleti, ecc.)
    if (error) {
      setMessage(error.message || "Pagamento non riuscito.");
    } else {
      // Normalmente l’utente viene rediretto alla return_url.
      setMessage(
        "Conferma inviata. Se non c’è redirect, controlla lo stato del PaymentIntent.",
      );
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        disabled={isLoading || !stripe || !elements}
        style={{ marginTop: 16, width: "100%", padding: 12 }}
      >
        {isLoading ? "Elaborazione..." : "Paga"}
      </button>

      {message && <div style={{ marginTop: 12 }}>{message}</div>}
    </form>
  );
};

export default CheckoutForm;
