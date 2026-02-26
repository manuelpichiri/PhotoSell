import { useContext, useEffect, useMemo, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { API_URL } from "../../config/api";
import CheckoutForm from "./checkoutForm/CheckoutForm";
import { CartContext } from "../../../context/cartContext";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const { cart } = useContext(CartContext);

  const total = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  useEffect(() => {
    if (total === 0) return;
    (async () => {
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: "eur",
        }),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    })();
  }, [total]);

  const options = useMemo(
    () => ({ clientSecret, appearance: { theme: "stripe" } }),
    [clientSecret],
  );

  if (!clientSecret) return <p>Creo PaymentIntent...</p>;

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}
