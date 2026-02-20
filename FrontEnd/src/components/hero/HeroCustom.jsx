import { Container, Row, Col } from "react-bootstrap";
import "./heroCustom.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
const HeroCustom = () => {
  return (
    <>
      <Container className="background-hero">
        <Row>
          <Col xs={12}>
            <div className="w-100 h-50">
              <img
                src="https://www.lookslikefilm.com/wp-content/uploads/2019/01/Heather-Jarrell.jpg"
                className="img-custom-hero"
              ></img>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={12}>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img src="https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?cs=srgb&dl=pexels-george-desipris-792381.jpg&fm=jpg" />
              </SwiperSlide>

              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
              <SwiperSlide>Slide 5</SwiperSlide>
              <SwiperSlide>Slide 6</SwiperSlide>
              <SwiperSlide>Slide 7</SwiperSlide>
              <SwiperSlide>Slide 8</SwiperSlide>
              <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mt-3">
            <div className="d-flex align-items-center justify-content-around div-link-custom-hero p-3">
              <Link className="link-hero-custom">ASDAD</Link>
              <Link className="link-hero-custom">asd</Link>
              <Link className="link-hero-custom">ad</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default HeroCustom;
