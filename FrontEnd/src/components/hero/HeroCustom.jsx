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
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
                onDragStart={(e) => e.preventDefault()}
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
                <img
                  src="DSC07553.JPG"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  src="DSC07566.JPG"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="DSC07569.JPG"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="DSC07575.JPG"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="DSC07613.jpg"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="DSC07618.jpg"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="DSC07670.jpg"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="DSC07697.jpg"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="DSC07565.JPG"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                />
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
