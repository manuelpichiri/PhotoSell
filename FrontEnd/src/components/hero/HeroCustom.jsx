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
                <img src="DSC07553.JPG" />
              </SwiperSlide>

              <SwiperSlide>
                <img src="DSC07566.JPG" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="DSC07569.JPG" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="DSC07575.JPG" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="DSC07613.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="DSC07618.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="DSC07670.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="DSC07697.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="DSC07565.JPG" />
              </SwiperSlide>
            </Swiper>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mt-3">
            <div className="d-flex div-link-custom-hero p-3"></div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default HeroCustom;
