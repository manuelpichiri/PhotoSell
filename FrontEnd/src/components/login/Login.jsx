import ButtonCustom from "../buttonCustom/ButtonCustom";
import "./login.css";
import FormLogin from "../formLogin/FormLogin";
import { Container, Row, Col } from "react-bootstrap";

import OauthLogin from "../oauthLogin/OauthLogin";
const Login = () => {
  return (
    <>
      <Container className="container-loginpage">
        <Row className="row-loginpage bg-dark">
          <Col
            xs={6}
            className="d-flex align-items-center justify-content-center flex-column gap-5"
          >
            <OauthLogin />
            <FormLogin />
          </Col>

          <Col xs={6}>
            <div className="d-flex justify-content-center w-100 p-3">
              <img
                src="https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg?semt=ais_user_personalization&w=740&q=80"
                className="img-custom-loginpage"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Login;
