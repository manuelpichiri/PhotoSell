import { Container, Row, Col, Alert } from "react-bootstrap";
import InputCustom from "../inputCustom/InputCustom";
import { API_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../buttonCustom/ButtonCustom";
import { useFormErrors } from "../../hook/validationHook";
import { useEffect, useState } from "react";

const FormRegistration = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const { values, errors, inputControl, validateInput } = useFormErrors({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    country: "",
  });

  const registrer = async () => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      navigate(`/`);
      return data;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  const submitOn = async (e) => {
    e.preventDefault();
    const err = validateInput({ noFuture: true });
    if (Object.keys(err).length > 0) return;
    await registrer();
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={12}>
            <div className=" d-flex align-items-center justify-content-center mb-4 ">
              <div className=" div-custom">
                <h1 className="h1-custom text-white">Registration</h1>
                <span className="mt-1 span-custom text-white">
                  CLICK FOR YOUR SHOOT
                </span>
              </div>
            </div>
          </Col>
          <Col>
            <form className="d-grid" onSubmit={submitOn}>
              <InputCustom
                name="firstName"
                type="text"
                placeholder="Name"
                text="Name"
                value={values.firstName}
                onChange={inputControl}
              />
              {errors.firstName && (
                <div className="d-flex align-items-center justify-content-end">
                  <Alert className="w-50" variant="danger">
                    <p>{errors.firstName}</p>
                  </Alert>
                </div>
              )}
              <InputCustom
                name="lastName"
                type="text"
                placeholder="Surname"
                text="Surname"
                value={values.lastName}
                onChange={inputControl}
              />
              {errors.lastName && (
                <div className="d-flex align-items-center justify-content-end">
                  <Alert className="w-50" variant="danger">
                    <p>{errors.lastName}</p>
                  </Alert>
                </div>
              )}
              <InputCustom
                name="email"
                type="email"
                placeholder="Email"
                text="Email"
                value={values.email}
                onChange={inputControl}
              />
              {errors.email && (
                <div className="d-flex align-items-center justify-content-end">
                  <Alert className="w-50" variant="danger">
                    <p>{errors.email}</p>
                  </Alert>
                </div>
              )}
              <InputCustom
                name="password"
                type="password"
                placeholder="Password"
                text="Password"
                value={values.password}
                onChange={inputControl}
              />
              {errors.password && (
                <div className="d-flex align-items-center justify-content-end">
                  <Alert className="w-50" variant="danger">
                    <p>{errors.password}</p>
                  </Alert>
                </div>
              )}
              <InputCustom
                name="dateOfBirth"
                type="date"
                placeholder="Date of birth"
                text="Date of birth"
                value={values.dateOfBirth}
                onChange={inputControl}
              />
              {errors.dateOfBirth && (
                <div className="d-flex align-items-center justify-content-end">
                  <Alert className="w-50" variant="danger">
                    <p>{errors.dateOfBirth}</p>
                  </Alert>
                </div>
              )}
              <InputCustom
                name="country"
                type="text"
                placeholder="Country"
                text="Country"
                value={values.country}
                onChange={inputControl}
              />
              {errors.country && (
                <div className="d-flex align-items-center justify-content-end">
                  <Alert className="w-50" variant="danger">
                    <p>{errors.country}</p>
                  </Alert>
                </div>
              )}
              <div className="d-flex justify-content-center mt-3">
                <ButtonCustom type="submit" text="Send"></ButtonCustom>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default FormRegistration;
