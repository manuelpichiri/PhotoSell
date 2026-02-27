import "./aboutUsPage.css";
import { Container, Row, Col } from "react-bootstrap";
import { Camera, Image, Users, Globe } from "lucide-react";
import NavbarCustom from "../navigation/NavbarCustom";
import FooterCustom from "../footer/FooterCustom";

const AboutUsPage = () => {
  return (
    <div className="about-div-background">
      <NavbarCustom />
      <Container fluid className="about-container py-5">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="about-title">
                <Camera size={40} /> About PhotoSell
              </h1>
              <p className="about-subtitle">
                Connecting photographers and creators around the world through
                powerful visual storytelling.
              </p>
            </Col>
          </Row>

          <Row className="align-items-center mb-5">
            <Col md={6}>
              <h3>Who We Are</h3>
              <p>
                PhotoSell is a digital marketplace designed for photographers
                who want to showcase and sell their work effortlessly. Our
                platform allows creators to reach a global audience while giving
                customers access to unique, high-quality photography.
              </p>
              <p>
                Whether you are a professional photographer or a passionate
                creator, PhotoSell provides the tools needed to transform visual
                creativity into opportunity.
              </p>
            </Col>

            <Col md={6}>
              <img
                src="americaMountain.jpg"
                alt="photography"
                className="about-image"
              />
            </Col>
          </Row>

          <Row className="text-center mb-5">
            <Col>
              <h3>Our Mission</h3>
              <p>
                Our mission is simple: empower photographers to monetize their
                passion while helping businesses, designers, and individuals
                find authentic visual content.
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
      <FooterCustom />
    </div>
  );
};
export default AboutUsPage;
