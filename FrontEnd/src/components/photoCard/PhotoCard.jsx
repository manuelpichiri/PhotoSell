import "./photoCard.css";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { Expand } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/cartContext";
const PhotoCard = ({ title, userName, src, photo, lastName }) => {
  const { addElement } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

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
            <div className="bg-dark w-100 div-phto-card ">
              <img src={src} className="photo-card-custom" />
              <button className="button-icon-expand" onClick={modalOn}>
                <Expand color="#8d8b8b" />
              </button>

              <div className="d-flex justify-content-between">
                <Link className="link-custom-card">
                  {`${userName} ${lastName}`}
                </Link>
                <button onClick={() => addPhotoToCart(photo)}>Add</button>
              </div>
            </div>
            <Modal className="modal-opacity" show={showModal} onHide={modalOff}>
              <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="w-100">
                  <img src={src} className="photo-card-custom" />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button className="btn button-custom" onClick={modalOff}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PhotoCard;
