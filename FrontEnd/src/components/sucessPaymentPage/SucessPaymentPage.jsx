import "./sucessPaymentPage.css";
import { Container, Row, Col } from "react-bootstrap";
import { CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
const SucessPaymentPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container className="bg-dark ">
        <Row className="bg-danger d-flex justify-content-center p-1">
          <Col xs={6} className=" ">
            <div className=" d-flex flex-column bg-warning align-items-center justify-content-center">
              <div className="d-flex  justify-content-center">
                <CircleCheck />
              </div>
              <div className="d-flex flex-column justify-content-center">
                <h3 className="text-center">Payment Successful!</h3>
                <p className="text-center">
                  {" "}
                  your payment has been processed successfully
                </p>{" "}
              </div>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col xs={6} className="d-flex flex-column bg-info p-3">
            <div className="d-flex justify-content-between p-2  ">
              <p>Amount</p>

              <p>$140.99</p>
            </div>
            <div className="d-flex justify-content-between p-2  ">
              <p>Payment Method</p>

              <p>****4242</p>
            </div>
            <div className="d-flex justify-content-between p-2  ">
              <p>Date</p>

              <p>Feb 26,2026</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex align-items-center justify-content-center p-3 w-100">
              <button
                className="w-75"
                onClick={() => {
                  navigate("/homepage");
                }}
              >
                Return to store
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default SucessPaymentPage;
