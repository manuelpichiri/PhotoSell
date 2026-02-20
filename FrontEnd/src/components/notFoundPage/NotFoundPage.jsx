import "./notFoundPage.css";
import { Container, Row, Col } from "react-bootstrap";
import ButtonCustom from "../buttonCustom/ButtonCustom";
import { useNavigate } from "react-router-dom";
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Row>
          <Col xs={6}>
            <div className="d-flex flex-column ">
              <h3 className="h3-custom-notFoundPage">404 Error</h3>
              <h4>PAGE NOT FOUND</h4>
            </div>
            <div className="mt-4">
              <ButtonCustom
                className="button-custom-notFound"
                text="Home"
                type="button"
                onClick={() => navigate("/homepage")}
              />
            </div>
          </Col>
          <Col xs={6}></Col>
        </Row>
      </Container>
    </>
  );
};
export default NotFoundPage;
