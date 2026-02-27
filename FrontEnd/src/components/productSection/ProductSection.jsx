import "./productSection.css";
import { Container, Row, Col } from "react-bootstrap";
import { PhotoContext } from "../../../context/photoContext";
import { useContext, useEffect, useState } from "react";
import PhotoCard from "../photoCard/PhotoCard";
const ProductSection = () => {
  const { photos } = useContext(PhotoContext);

  useEffect(() => {}, []);

  return (
    <>
      <Container className="container-custom-prod-section mt-3 ">
        <Row className="pb-3">
          <Col xs={12}>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <h2 className="text-white h2-custom-prod-section p-3">
                FEATURED PRODUCTS
              </h2>
            </div>
          </Col>
          {photos.map((photo) => (
            <Col
              key={photo._id}
              xs={12}
              md={4}
              className="d-flex justify-content-between flex-column mt-3"
            >
              <PhotoCard
                title={photo.title}
                userName={photo.user?.firstName}
                lastName={photo.user?.lastName}
                photo={photo}
                src={photo.image}
                description={photo.description}
                price={`${photo.price},00€`}
                photographer={`${photo.user?.firstName} ${photo.user?.lastName}`}
                showDelete={false}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductSection;
