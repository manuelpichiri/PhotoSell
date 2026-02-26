import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addElement = (photo) => {
    setCart((cart) => {
      const findElement = cart.find((item) => item._id === photo._id); // trovo l'elemento che è nel carrello

      if (findElement) {
        return cart.map((item) => {
          //se esiste faccio un map
          if (item._id === photo._id) {
            //metto a confronto l'id della photo che arriva come parametro a quello presente nel cart
            return { ...item, qty: item.qty + 1 }; // se è lo stesso aumento la quantità altrimento lo lascio com'è
          }
          return item;
        });
      }

      return [...cart, { ...photo, qty: 1 }]; // se non esiste lo aggiungo
    });
  };

  const removeElement = (id) => {
    setCart(
      (
        cart, // prendo il carrello
      ) =>
        cart
          .map((item) =>
            item._id === id ? { ...item, qty: item.qty - 1 } : item,
          ) // creo una copia dell'oggetto con lo stesso id e diminuisco la quantità di 1
          .filter((item) => item.qty > 0), // tengo solo le photo che hanno la quantità maggiore a 0 se sono a 0 le tolgo
    );
  };

  const total = cart.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.qty) || 0),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        addElement,
        removeElement,
        cart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
