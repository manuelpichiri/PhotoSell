import "./footer.css";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const FooterCustom = () => {
  return (
    <Container className="mt-3 bg-dark rounded-3 container-footer ">
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={12}>
          <div className="div-custom-footer">
            <Link>Instagram</Link>
            <Link>Twitter</Link>
            <Link>Facebook</Link>
          </div>
        </Col>

        <Col xs={12} className="mt-3 bg-dark">
          <div className="div-custom-footer">
            <Link>Home</Link>
            <Link>About</Link>
            <Link>Terms</Link>
            <Link>Privacy Policy</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default FooterCustom;
