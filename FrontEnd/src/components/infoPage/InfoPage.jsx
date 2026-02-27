import "./infoPage.css";
import { Container, Row, Col } from "react-bootstrap";
import NavbarCustom from "../navigation/NavbarCustom";
import FooterCustom from "../footer/FooterCustom";

const InfoPage = () => {
  return (
    <div className="div-info-background">
      <NavbarCustom />
      <Container fluid className="container-infopage py-5">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="h1-custom-infopage">About PhotoSell</h1>
              <p className="p-infopage">
                A marketplace where photography meets opportunity.
              </p>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col>
              <h3 className="h3-custom-infopage">What is PhotoSell</h3>
              <p>
                PhotoSell is an online platform that connects photographers with
                people looking for high-quality and authentic images. Creators
                can upload and sell their photos while customers can easily
                discover and purchase unique visual content.
              </p>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col md={6}>
              <h4 className="h4-custom-infopage">For Photographers</h4>
              <ul className="ul-custom-infopage">
                <li>Upload and manage your portfolio</li>
                <li>Sell digital photos worldwide</li>
                <li>Reach new audiences</li>
                <li>Maintain creative ownership</li>
              </ul>
            </Col>

            <Col md={6}>
              <h4 className="h4-custom-infopage">For Buyers</h4>
              <ul className="ul-custom-infopage">
                <li>Discover original photography</li>
                <li>Secure and fast purchases</li>
                <li>Instant downloads</li>
                <li>High-quality images</li>
              </ul>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col>
              <h3 className="h3-custom-infopage">How PhotoSell Works</h3>
              <ol className="ol-custom-infopage">
                <li>Create your free account</li>
                <li>Upload or explore photos</li>
                <li>Buy or sell securely</li>
                <li>Download images instantly</li>
              </ol>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col>
              <h3 className="h3-custom-infopage">Our Mission</h3>
              <p>
                Our mission is to empower photographers by providing a simple
                and accessible way to monetize creativity while helping users
                find authentic visual content created by real artists.
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <h3 className="h3-custom-infopage">Security & Trust</h3>
              <p>
                PhotoSell ensures secure authentication and protected payment
                systems to guarantee safe transactions for both photographers
                and buyers.
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
      <FooterCustom />
    </div>
  );
};
export default InfoPage;
