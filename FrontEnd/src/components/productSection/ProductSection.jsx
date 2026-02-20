import "./productSection.css";
import { Container, Row, Col } from "react-bootstrap";
import { PhotoContext } from "../../../context/photoContext";
import { useContext, useEffect, useState } from "react";
import PhotoCard from "../photoCard/PhotoCard";
const ProductSection = () => {
  const { photos } = useContext(PhotoContext);
  console.log(photos);

  useEffect(() => {}, []);

  return (
    <>
      <Container className="bg-info mt-3">
        <Row>
          <Col xs={12}>
            <div className="d-flex align-items-center justify-content-center">
              <h2>FEATURED PRODUCTS</h2>
            </div>
          </Col>
          {photos.map((photo) => (
            <Col xs={3} className="d-flex justify-content-between flex-column">
              <PhotoCard
                title={photo.title}
                userName={photo.user?.firstName}
                photo={photo}
                src="https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_wordcount_boost&w=740&q=80"
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductSection;
