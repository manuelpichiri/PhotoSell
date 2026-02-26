import "./footer.css";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const FooterCustom = () => {
  return (
    <Container fluid className=" bg-dark  container-footer ">
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={12}>
          <div className="div-custom-footer">
            <a href="https://x.com/">
              {" "}
              <img
                src="/twitter-icon.png"
                alt="twitter"
                className="icon-footer"
              />
            </a>
            <a href="https://www.instagram.com/">
              <img
                src="/instagram-logo.png"
                alt="instagram"
                className="icon-footer"
              />
            </a>
            <a href="https://www.facebook.com/">
              {" "}
              <img
                src="/facebook-icon.png"
                alt="facebook"
                className="icon-footer"
              />
            </a>
          </div>
        </Col>

        <Col xs={12} className="mt-3 bg-dark">
          <div className="div-custom-footer">
            <Link to="/homepage" onClick={() => window.scrollTo(0, 0)}>
              Home
            </Link>
            <Link to="/about-us">About</Link>
            <Link>Terms</Link>
            <Link>Privacy Policy</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default FooterCustom;
