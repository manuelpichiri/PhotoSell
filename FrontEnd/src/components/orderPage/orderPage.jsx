import "./orderpage.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../../context/cartContext";
import NavbarCustom from "../navigation/NavbarCustom";
import FooterCustom from "../footer/FooterCustom";
const OrderPage = () => {
  const { user } = useContext(UserContext);
  const { cart, total } = useContext(CartContext);
  const [order, setOrder] = useState([]);

  const token = localStorage.getItem("token");
  const createOrder = async (token) => {
    try {
      if (!token) {
        console.log("Token mancante: fai login");
        return null;
      }
      const response = await fetch("http://localhost:4545/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            photoId: item,
          })),
          total: total,
        }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => null);
        console.log("CREATE ORDER ERROR:", response.status, err);
        return null;
      }

      const data = await response.json();
      setOrder(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <NavbarCustom />
      <Container className="container-custom-order-page">
        <Row>
          <Col>
            <div className="d-flex flex-column div-order-info">
              <div className="d-flex justify-content-center mb-3">
                <h1>Order</h1>
              </div>
              <div className="d-flex gap-5 justify-content-between mb-3">
                <p>Name</p>
                <p>{`${user.firstName} ${user.lastName}`}</p>
              </div>
              <div className="d-flex gap-5 justify-content-between mb-3">
                <p>Email address</p>
                <p>{user.email}</p>
              </div>

              <div className="d-flex gap-5 justify-content-between mb-3 flex-column">
                {cart.map((product) => {
                  return (
                    <div className="d-flex justify-content-between align-items-center">
                      <img className="card-order-page" src={product.image} />
                      <p>{product.title}</p>

                      <p>{product.price},00€</p>
                    </div>
                  );
                })}
              </div>

              <div className="d-flex gap-5 justify-content-between mb-3 div-line-order ">
                <p>Total</p>
                <p>{total ?? "0.00"},00€</p>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  variant="success"
                  className="btn "
                  onClick={() => navigate("/checkout")}
                >
                  Pay
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <FooterCustom />
    </>
  );
};
export default OrderPage;
