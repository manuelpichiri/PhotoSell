import ButtonCustom from "../buttonCustom/ButtonCustom";
import "./login.css";
import FormLogin from "../formLogin/FormLogin";
import { Container, Row, Col } from "react-bootstrap";
import { Camera } from "lucide-react";

import OauthLogin from "../oauthLogin/OauthLogin";
const Login = () => {
  return (
    <>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center container-login background-image-login"
      >
        <Row className="row-loginpage">
          <Col
            xs={12}
            md={6}
            className="d-flex align-items-center justify-content-center flex-column gap-5 "
          >
            <OauthLogin />
            <FormLogin />
          </Col>

          <Col xs={12} md={6} className="p-4 d-flex flex-column ">
            <div className="d-flex align-items-center justify-content-center">
              <h3 className="text-white d-flex align-items-center gap-1">
                <Camera />
                PhotoSell
              </h3>
            </div>
            <div className="image-wrapper">
              <img
                src="../../../public/74765-nature-landscape.jpg"
                className="img-custom-div-login"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Login;
