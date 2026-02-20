import "./uploadModal.css";
import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../../context/userContext";
import { Container, Row, Col, Modal } from "react-bootstrap";
const UploadModal = () => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);

  const modalOn = () => {
    setShowModal(true);
  };
  const modalOff = () => {
    setShowModal(false);
  };

  const uploadPhoto = async () => {
    try {
      const data = new FormData();
      data.append("photo", file);
      const response = await fetch(
        `http://localhost:4545/user/${decoded.id}/cloud`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        },
      );
      return await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const uploadedFile = await uploadPhoto(file);

      if (!uploadedFile) {
        return;
      }

      console.log(decoded.id);
      try {
        const photoFormData = {
          user: decoded.id,
          image: uploadedFile.image,
          category: formData.category,
          description: formData.description,
          title: formData.title,
          price: Number(formData.price),
        };
        const response = await fetch("http://localhost:4545/photo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(photoFormData),
        });
        return await response.json();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onChangeInputFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <Container>
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <div className="w-100">
              <h3 className="h3-userpage-custom r">My Photo Gallery</h3>
            </div>
            <div>
              <button className="btn btn-info" onClick={modalOn}>
                Upload Photo
              </button>
            </div>

            <Modal show={showModal} onHide={modalOff}>
              <Modal.Dialog>
                <Modal.Header closeButton>
                  <Modal.Title>Upload photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="w-100 ">
                    <form
                      encType="multipart/form-data"
                      className="d-flex flex-column gap-3"
                      onSubmit={onSubmit}
                    >
                      <input
                        className="input-custom-upload-modal"
                        type="text"
                        name="category"
                        placeholder="category"
                        onChange={onChangeInput}
                      />
                      <input
                        className="input-custom-upload-modal"
                        type="text"
                        name="title"
                        placeholder="title"
                        onChange={onChangeInput}
                      />
                      <input
                        className="input-custom-upload-modal"
                        type="text"
                        name="description"
                        placeholder="description"
                        onChange={onChangeInput}
                      />
                      <input
                        className="input-custom-upload-modal"
                        type="number"
                        name="price"
                        placeholder="price"
                        onChange={onChangeInput}
                      />
                      <input
                        className="input-custom-upload-modal"
                        type="file"
                        onChange={onChangeInputFile}
                      />

                      <button type="submit">Carica</button>
                    </form>
                  </div>
                </Modal.Body>
              </Modal.Dialog>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default UploadModal;
