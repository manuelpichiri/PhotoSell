import { Container, Row, Col, Alert } from "react-bootstrap";
import "./formLogin.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { API_URL } from "../../config/api";
import ButtonCustom from "../buttonCustom/ButtonCustom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
const FormLogin = () => {
  const { logged, setLogged } = useContext(UserContext);

  const [loginError, setLoginError] = useState("");
  const [userValue, setUserValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const login = async () => {
    try {
      setLoginError("");
      const loginPromise = fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userValue),
      }).then(async (response) => {
        if (!response.ok) {
          setLoginError("Email o password non corretti");
          throw new Error("login failed");
        }
        return response.json();
      });
      const result = await toast.promise(loginPromise, {
        //toast promise vuole una fetch non risolta, quindi senza await
        loading: "Login...",
        success: "Login was successful",
        error: "Login failed",
      });

      if (result?.token) {
        localStorage.setItem("token", result.token);
        setLogged(true);
        navigate(`/`);
      }
      return result;
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
      <Container className="mb-3 ">
        <Row className="d-flex align-items-center justify-content-center  ">
          <Col xs={12}>
            <div className="d-flex  justify-content-center ">
              <form onSubmit={submitOn} className="d-flex flex-column gap-4  ">
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
                {loginError && (
                  <div className="d-flex align-items-center justify-content-end">
                    <Alert className="w-100  " variant="danger">
                      <p>{loginError}</p>
                    </Alert>
                  </div>
                )}
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
