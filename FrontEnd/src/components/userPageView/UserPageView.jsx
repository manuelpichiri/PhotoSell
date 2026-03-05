import { useContext, useEffect, useState } from "react";
import "./userPageView.css";
import { API_URL } from "../../config/api";
import { Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../../context/userContext";
import { PhotoContext } from "../../../context/photoContext";
import EditModal from "../editModal/EditModal";
import UploadModal from "../uploadModal/UploadModal";
import NavbarCustom from "../navigation/NavbarCustom";
import PhotoCard from "../photoCard/PhotoCard";
import FooterCustom from "../footer/FooterCustom";
import { useParams } from "react-router-dom";
const UserPageView = () => {
  const { id } = useParams();

  const token = localStorage.getItem("token");
  const { userPhoto, getAllPhotoByUserId } = useContext(PhotoContext);

  const [profileUser, setProfileUser] = useState(null);

  const getSingleUser = async () => {
    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      setProfileUser(data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const ageCalculator = (userDateBirth) => {
    const today = new Date();
    const userDate = new Date(userDateBirth);
    return today.getFullYear() - userDate.getFullYear();
  };

  useEffect(() => {
    if (!id) return;
    getSingleUser(id);
    getAllPhotoByUserId(id);
  }, [id]);

  if (!profileUser) return <div>Loading...</div>;

  return (
    <div className="container-user-page">
      <NavbarCustom />
      <Container className="contanier-userpage-custom  ">
        <Row className="row-custom-userpage mb-3">
          <Col xs={12}>
            <div>
              <img
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
                onDragStart={(e) => e.preventDefault()}
                className="img-hero-userpage"
                src="https://cdn.pixabay.com/photo/2017/10/20/10/58/elephant-2870777_1280.jpg"
              />
            </div>
          </Col>

          <Col xs={6} md={12} className="mt-5 div-position-userpage  w-100 ">
            <div className="d-flex justify-content-between align-items-center ">
              <div className="div-avatar-img-userpage ms-3 d-flex gap-3">
                <img
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                  className="img-userpage"
                  src="https://cdn.pixabay.com/photo/2017/10/20/10/58/elephant-2870777_1280.jpg"
                />
                <div className="div-button-edit ">
                  <h2 className="text-white">{profileUser.firstName}</h2>
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
              <p>
                <span className="span-custom-user-page">Full Name: </span>{" "}
                {`${profileUser.firstName} ${profileUser.lastName}`}
              </p>
              <p>
                {" "}
                <span className="span-custom-user-page">Email: </span>{" "}
                {profileUser.email}
              </p>
              <p>
                <span className="span-custom-user-page"> Age: </span>{" "}
                {ageCalculator(profileUser.dateOfBirth)}
              </p>
              <p>
                {" "}
                <span className="span-custom-user-page">Country: </span>{" "}
                {profileUser.country}
              </p>
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
                showDelete={false}
              ></PhotoCard>
            </Col>
          ))}
        </Row>
      </Container>
      <FooterCustom />
    </div>
  );
};
export default UserPageView;
