import "./photoCard.css";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { Expand } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/cartContext";
import { PhotoContext } from "../../../context/photoContext";
import { UserContext } from "../../../context/userContext";
import UpdatePhoto from "../updatePhoto/UpdatePhoto";
const PhotoCard = ({
  showDelete,
  id,
  title,
  userName,
  src,
  photo,
  lastName,
  description,
  price,
  photographer,
}) => {
  const { savedToken, userPhoto } = useContext(UserContext);
  const { deletePhoto } = useContext(PhotoContext);
  const { addElement } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const isLogged = Boolean(savedToken); //se esiste il token allora logged è true

  const addPhotoToCart = () => {
    addElement(photo);
  };

  const modalOn = () => {
    setShowModal(true);
  };

  const modalOff = () => {
    setShowModal(false);
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={12}>
            <div className="bg-dark w-100 div-phto-card h-100">
              <div className="d-flex align-items-center justify-content-center div-image-container">
                <img
                  src={src}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                  className="photo-card-custom"
                />
                <button className="button-icon-expand" onClick={modalOn}>
                  <Expand color="#8d8b8b" />
                </button>
              </div>

              <div className="d-flex justify-content-between">
                <Link className="link-custom-card">
                  {`${userName} ${lastName}`}
                </Link>
                {isLogged && (
                  <button
                    className="button-add-custom"
                    onClick={() => addPhotoToCart(photo)}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
            <Modal
              className="modal-opacity"
              show={showModal}
              onHide={modalOff}
              size="xl"
            >
              <Modal.Header closeButton>
                <Modal.Title className="modal-title-custom">
                  {photo.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="w-100">
                <Container className="w-100">
                  <Row className="w-100">
                    <Col
                      xs={6}
                      className="d-flex justify-content-between w-100"
                    >
                      <div className="w-100 m-3 div-img-relative ">
                        <img
                          src={src}
                          onContextMenu={(e) => e.preventDefault()}
                          draggable="false"
                          onDragStart={(e) => e.preventDefault()}
                          className="photo-card-custom-modal"
                        />
                        <div className="no-save"></div>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="m-2 d-flex flex-column gap-3 w50">
                        <p className="d-flex align-items-center gap-2 p-custom-photocard">
                          <span className="span-custom-modal ">
                            Description:
                          </span>{" "}
                          {photo.description}
                        </p>
                        <p className="d-flex align-items-center gap-2 p-custom-photocard">
                          <span className="span-custom-modal">Price: </span>{" "}
                          {(photo.price / 100).toFixed(2)} €
                        </p>
                        <p className="d-flex align-items-center gap-2 p-custom-photocard">
                          <span className="span-custom-modal">
                            Photographer:
                          </span>{" "}
                          <Link
                            to={`/userpage/${photo.user._id}`}
                          >{`${userName} ${lastName}`}</Link>
                        </p>
                        <p className="d-flex align-items-center gap-2 p-custom-photocard">
                          <span className="span-custom-modal">Date:</span>{" "}
                          {new Date(photo.createdAt).toLocaleDateString(
                            "it-IT",
                          )}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer className="d-flex align-items-center justify-content-between ">
                {isLogged && (
                  <div>
                    <button
                      className="btn bg-success text-light "
                      onClick={addPhotoToCart}
                    >
                      Add
                    </button>
                  </div>
                )}

                {showDelete && (
                  <div className="d-flex align-items-center">
                    <div>
                      <button
                        className="btn btn-danger "
                        onClick={() => deletePhoto(id, savedToken)}
                      >
                        Delete
                      </button>
                    </div>
                    <div>
                      <UpdatePhoto photo={photo} />
                    </div>
                  </div>
                )}
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PhotoCard;
