import { useState } from "react";
import "./recoverPassword.css";
import { Container, Row, Col } from "react-bootstrap";
import InputCustom from "../inputCustom/InputCustom";
const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendEmail = async () => {
    try {
      const response = await fetch("http://localhost:4545/recover-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMsg("Email send");
    } catch (error) {
      console.log(error.msg);
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
      <Container className="d-flex align-items-center justify-content-center container-recover-password">
        <Row>
          <Col
            xs={12}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="d-flex flex-row div-form-recover-password">
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
            {msg && <p>{msg} "da inserire toast"</p>}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default RecoverPassword;
