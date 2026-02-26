import { useContext, useEffect, useState } from "react";
import "./modalCart.css";
import { Modal, Button } from "react-bootstrap";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../../../context/cartContext";
import { useNavigate } from "react-router-dom";
const ModalCart = ({ className }) => {
  const [show, setShow] = useState(false);

  const { cart, removeElement, total } = useContext(CartContext);
  const navigate = useNavigate();
  const modalOn = () => {
    setShow(true);
  };

  const modalOff = () => {
    setShow(false);
  };

  return (
    <>
      <div className={className}>
        <button onClick={modalOn} className="button-custom-modal-cart">
          <ShoppingCart size={32} color="white" />
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
                    <img src={product.image} className="img-cart-product"></img>
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
                {total.toFixed(2)}€{" "}
              </span>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={modalOff}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                modalOff();
                navigate("/order");
              }}
            >
              Pay
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
export default ModalCart;
