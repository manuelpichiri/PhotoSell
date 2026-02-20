import { useContext, useEffect, useState } from "react";
import "./modalCart.css";
import { Modal, Button } from "react-bootstrap";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../../../context/cartContext";
import { useNavigate } from "react-router-dom";
const ModalCart = () => {
  const [show, setShow] = useState(false);
  const { cart, removeElement } = useContext(CartContext);
  const navigate = useNavigate();
  const modalOn = () => {
    setShow(true);
  };

  const modalOff = () => {
    setShow(false);
  };

  const sum = () => {
    const total = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
    return total;
  };

  return (
    <>
      <div>
        <button onClick={modalOn}>
          <ShoppingCart />
        </button>
      </div>
      <div>
        <Modal show={show} onHide={modalOff} className="w-100 h-100">
          <Modal.Header closeButton>
            <Modal.Title>Cart</Modal.Title>
          </Modal.Header>

          <Modal.Body className="w-100 ">
            {cart.map((product) => {
              return (
                <div className="d-flex align-items-center w-100 h-100 mb-3">
                  <div className="w-50 h-50">
                    <img
                      src="https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_wordcount_boost&w=740&q=80"
                      className="img-cart-product"
                    ></img>
                  </div>
                  <div className="d-flex align-items-center justify-content-between w-75 ">
                    <span className=" ms-3 text-center ">{product.title}</span>
                    <span className=" me-3 d-flex align-items-center">
                      {product.price}€
                    </span>
                    <span className=" me-3 d-flex align-items-center">
                      {product.qty}
                    </span>

                    <button
                      className="btn btn-warning"
                      onClick={() => removeElement(product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="d-flex flex-column align-items-end ">
              <span className="me-3">Total</span>
              <span className=" me-3 d-flex align-items-center">
                {sum().toFixed(2)}€{" "}
              </span>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={modalOff}>
              Close
            </Button>
            <Button variant="primary" onClick={() => navigate("/checkout")}>
              Pay
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
export default ModalCart;
