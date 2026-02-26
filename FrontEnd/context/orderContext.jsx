import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState({});
  const [orders, setOrders] = useState({});
  const [saveToken, setSaveToken] = useState("");

  const getOrdersByidUser = async (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded.id);
      const response = await fetch(
        `http://localhost:4545/order/${decoded.id}`,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await response.json();
      setOrders(data.order);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSingleOrder = async (token) => {
    try {
      const decoded = jwtDecode(token);

      const response = await fetch(
        `http://localhost:4545/order/${decoded.id}`,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await response.json();
      setOrder(data.order);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSaveToken(token);
    }
  });

  return (
    <OrderContext.Provider
      value={{
        order,
        orders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
