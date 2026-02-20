import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./userPage.css";
import { Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../../context/userContext";
import { PhotoContext } from "../../../context/photoContext";
import EditModal from "../editModal/EditModal";
import UploadModal from "../uploadModal/UploadModal";
import NavbarCustom from "../navigation/NavbarCustom";
import PhotoCard from "../photoCard/PhotoCard";
import FooterCustom from "../footer/FooterCustom";
const UserPage = () => {
  const { user } = useContext(UserContext);
  const { userPhoto, getAllPhotoByUserId } = useContext(PhotoContext);

  useEffect(() => {
    if (!user._id) return;

    getAllPhotoByUserId(user._id);
  }, [user._id]);
  return (
    <>
      <NavbarCustom />
      <Container className="contanier-userpage-custom  ">
        <Row className="row-custom-userpage ">
          <Col xs={12}>
            <div>
              <img
                className="img-hero-userpage"
                src="https://cdn.pixabay.com/photo/2017/10/20/10/58/elephant-2870777_1280.jpg"
              />
            </div>
          </Col>

          <Col xs={12} className=" div-position-userpage mt-1 w-100  ">
            <div className="d-flex justify-content-between align-items-center ">
              <div className="div-avatar-img-userpage ms-3 d-flex gap-3">
                <img
                  className="img-userpage"
                  src="https://cdn.pixabay.com/photo/2017/10/20/10/58/elephant-2870777_1280.jpg"
                />
                <div className="div-button-edit ">
                  <h2 className="text-white">{user.firstName}</h2>
                </div>
              </div>
              <div>
                <EditModal />
              </div>
            </div>
          </Col>

          <Col
            xs={12}
            className="mt-5 d-flex justify-content-between w-100"
          ></Col>
        </Row>
        <Row>
          <Col xs={12}>
            <UploadModal />
          </Col>
          {userPhoto.map((photo) => (
            <Col xs={4} className="mt-3">
              <PhotoCard
                key={photo._id}
                title={photo.title}
                userName={photo.user.firstName}
                src={photo.image}
                photo={photo}
              ></PhotoCard>
            </Col>
          ))}
        </Row>
        <FooterCustom />
      </Container>
    </>
  );
};
export default UserPage;
