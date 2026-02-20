import { Container, Row, Col } from "react-bootstrap";
import "./formLogin.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import ButtonCustom from "../buttonCustom/ButtonCustom";
import { useNavigate } from "react-router-dom";
const FormLogin = () => {
  const [logged, setLogged] = useState(false);
  const [userValue, setUserValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const login = async () => {
    try {
      const response = await fetch("http://localhost:4545/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userValue),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setLogged(true);
        console.log(data);
        navigate(`/userPage`);
      } else {
        return;
      }
    } catch (error) {
      console.log("Errore login", error.message);
    }
  };

  const submitOn = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <>
      <Container fluid>
        <Row className="d-flex align-items-center justify-content-center ">
          <Col xs={12}>
            <div className="d-flex  justify-content-center ">
              <form onSubmit={submitOn} className="d-flex flex-column gap-4 ">
                <input
                  className="input-custom-formlogin"
                  type="email"
                  placeholder="Email"
                  value={userValue.email}
                  onChange={(e) => {
                    setUserValue({ ...userValue, email: e.target.value });
                  }}
                ></input>
                <input
                  className="input-custom-formlogin"
                  type="password"
                  placeholder="Password"
                  value={userValue.password}
                  onChange={(e) => {
                    setUserValue({ ...userValue, password: e.target.value });
                  }}
                ></input>
                <div>
                  <Link to="/recover-password">Forgot password?</Link>
                </div>

                <div className="d-flex justify-content-center ">
                  <ButtonCustom type="submit" text="Sign in" />
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default FormLogin;
