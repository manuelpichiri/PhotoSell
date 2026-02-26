import { useState } from "react";
import "./recoverPassword.css";
import { API_URL } from "../../config/api";
import { Container, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import InputCustom from "../inputCustom/InputCustom";
const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendEmail = async () => {
    try {
      if (!email) {
        toast.error("Email not valid");
        return;
      }
      const response = await fetch(`${API_URL}/recover-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMsg("Email send");
      toast.success("Email send");
    } catch (error) {
      toast.error("Error");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setEmail("");

    await sendEmail();
  };

  return (
    <>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center container-recover-password"
      >
        <Row className="row-recover-password">
          <Col xs={12} className="d-flex flex-column">
            <div className="d-flex align-items-center justify-content-center m-3 ">
              <img
                src="../../../public/dogAnswering.jpg"
                className="img-recover-password"
              />
            </div>
            <div className="d-flex align-items-center justify-content-center w-100">
              <h1 className="text-center">Recover Password</h1>
            </div>
          </Col>
          <Col
            xs={12}
            className="d-flex align-items-center justify-content-center p-3"
          >
            <div className="d-flex flex-row div-form-recover-password ">
              <form onSubmit={onSubmit}>
                <InputCustom
                  className="text-dark me-3"
                  text="Email"
                  type="email"
                  value={email}
                  classNameInput="input-recover-password"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div className="d-flex align-items-center justify-content-center">
                  <button type="submit" className="btn btn-info">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default RecoverPassword;
