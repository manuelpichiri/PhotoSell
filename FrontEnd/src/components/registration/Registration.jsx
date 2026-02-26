import "./registration.css";
import FormRegistration from "../registrationForm/RegistrationForm";
import { Container, Row, Col } from "react-bootstrap";
const Registration = () => {
  return (
    <div className="w-100 div-registration d-flex align-items-center justify-content-center  ">
      <Container className="container-custom m-0 p-0 container-registration ">
        <Row className="m-0 p-0  bg-dark container-row  align-items-center ">
          <Col xs={12} md={6} className="h-100 m-0 p-0 ">
            <img
              src="fotoRegi.jpg"
              className="img-custom-registration w-100   rounded-4"
            ></img>
          </Col>
          <Col xs={12} md={6} className="col-register-container">
            <FormRegistration />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Registration;
