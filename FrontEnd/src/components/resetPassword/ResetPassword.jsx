import { useSearchParams } from "react-router-dom";
import "./resetPassword.css";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputCustom from "../inputCustom/InputCustom";
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [comparePassword, setComparePassword] = useState("");
  const navigate = useNavigate();

  const recoverPassword = async () => {
    try {
      const response = await fetch(`http://localhost:4545/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        return setError(data.message || "Error in reset");
      }
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(token);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!token) return setError("Missing token");
    if (password.length < 8) return setError("Password must be contain 8 char");
    if (password !== comparePassword)
      return setError("the two passwords do not match");
    await recoverPassword();
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center container-reset-password">
        <Row>
          <Col
            xs={12}
            className="d-flex align-items-center justify-content-center col-custom-reset-password-page  "
          >
            <div className="d-flex flex-column ">
              <form onSubmit={onSubmit}>
                <InputCustom
                  className="text-dark"
                  type="password"
                  text="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputCustom
                  className="text-dark"
                  type="password"
                  text="Verify Password"
                  placeholder="Verify Password"
                  value={comparePassword}
                  onChange={(e) => setComparePassword(e.target.value)}
                />
                <div className="d-flex justify-content-center">
                  <button className="btn btn-info" type="submit">
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
export default ResetPassword;
