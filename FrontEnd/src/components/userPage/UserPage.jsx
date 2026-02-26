import { useContext, useEffect, useState } from "react";
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

  const ageCalculator = (userDateBirth) => {
    const today = new Date();
    const userDate = new Date(userDateBirth);
    const age = today.getFullYear() - userDate.getFullYear();
    console.log(age);
    return age;
  };

  useEffect(() => {
    if (!user || !user._id) return;

    getAllPhotoByUserId(user._id);
  }, [user]);

  return (
    <div className="container-user-page">
      <NavbarCustom />
      <Container className="contanier-userpage-custom  ">
        <Row className="row-custom-userpage mb-3">
          <Col xs={12}>
            <div>
              <img
                className="img-hero-userpage"
                src="https://cdn.pixabay.com/photo/2017/10/20/10/58/elephant-2870777_1280.jpg"
              />
            </div>
          </Col>

          <Col xs={6} md={12} className="mt-5 div-position-userpage  w-100 ">
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
        </Row>
        <Row>
          <Col xs={12} className="  justify-content-between w-100 mb-3 ">
            <div className="mt-5 div-user-page-custom mb-3">
              <h3 className="p-0 m-0 text-h-custom">My Info</h3>
            </div>
            <div className="div-info">
              <p>Full Name: {`${user.firstName} ${user.lastName}`}</p>
              <p>Email: {user.email}</p>
              <p>Age: {ageCalculator(user.dateOfBirth)}</p>
              <p>Country: {user.country}</p>
            </div>
          </Col>
        </Row>
        <Row className="row-custom-user-page mb-3">
          <Col xs={12}>
            <UploadModal />
          </Col>
          {userPhoto.map((photo) => (
            <Col xs={12} md={4} className="mt-3 mb-3" key={photo._id}>
              <PhotoCard
                id={photo._id}
                title={photo.title}
                userName={photo.user.firstName}
                lastName={photo.user.lastName}
                src={photo.image}
                photo={photo}
                description={photo.description}
                photographer={`${photo.user.firstName} ${photo.user.lastName}`}
                price={photo.price}
                showDelete={true}
              ></PhotoCard>
            </Col>
          ))}
        </Row>
      </Container>
      <FooterCustom />
    </div>
  );
};
export default UserPage;
