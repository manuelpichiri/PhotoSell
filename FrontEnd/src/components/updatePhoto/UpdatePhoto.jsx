import "./updatePhoto.css";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { UserContext } from "../../../context/userContext";
import { PhotoContext } from "../../../context/photoContext";
import { useContext, useState } from "react";
import InputCustom from "../inputCustom/InputCustom";
import toast from "react-hot-toast";
const UpdatePhoto = ({ photo }) => {
  const { setUserPhoto, getAllPhotoByUserId } = useContext(PhotoContext);
  const { savedToken, user } = useContext(UserContext);

  const [photoValue, setPhotoValue] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [showModal, setShowModal] = useState(false);
  const modalOn = () => {
    setPhotoValue({
      title: photo.title,
      description: photo.description,
      price: photo.price,
    });

    setShowModal(true);
  };

  const modalOff = () => {
    setShowModal(false);
  };

  const updatePhoto = async (id) => {
    try {
      if (!savedToken) {
        toast.error("token not found");
        return;
      }

      const response = await fetch(`http://localhost:4545/photo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedToken}`,
        },
        body: JSON.stringify({ ...photoValue }),
      });
      const data = await response.json();
      await getAllPhotoByUserId(user._id);

      toast.success("Updated");

      return photo;
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitOn = async (e) => {
    e.preventDefault();

    await updatePhoto(photo?._id);
  };
  return (
    <>
      <Container>
        <Row>
          <Col xs={12}>
            <Button className="  modalEdit-button-custom" onClick={modalOn}>
              Edit Photo
            </Button>

            <Modal show={showModal} onHide={modalOff}>
              <Modal.Dialog>
                <Modal.Header closeButton>
                  <Modal.Title>Photo Info</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <form onSubmit={submitOn}>
                    <InputCustom
                      className="label-color-modalEdit"
                      type="text"
                      placeholder="Title"
                      text="Title"
                      value={photoValue.title}
                      onChange={(e) => {
                        setPhotoValue({ ...photoValue, title: e.target.value });
                      }}
                    ></InputCustom>
                    <InputCustom
                      className="label-color-modalEdit"
                      type="text"
                      placeholder="Description"
                      text="Description"
                      value={photoValue.description}
                      onChange={(e) => {
                        setPhotoValue({
                          ...photoValue,
                          description: e.target.value,
                        });
                      }}
                    ></InputCustom>
                    <InputCustom
                      className="label-color-modalEdit"
                      type="number"
                      placeholder="Price"
                      text="Price"
                      value={photoValue.price}
                      onChange={(e) => {
                        setPhotoValue({
                          ...photoValue,
                          price: e.target.value,
                        });
                      }}
                    ></InputCustom>

                    <Button variant="primary" type="submit" onClick={modalOff}>
                      Save changes
                    </Button>
                  </form>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={modalOff}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default UpdatePhoto;
