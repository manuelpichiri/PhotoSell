import "./uploadModal.css";
import { API_URL } from "../../config/api";
import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../../context/userContext";
import { Container, Row, Col, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
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

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const allowedTypes = ["image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Only JPG images allowed");
      return;
    }

    setFile(selectedFile);
  };

  const uploadPhoto = async () => {
    try {
      const data = new FormData();
      data.append("photo", file);

      const uploadPromise = fetch(`${API_URL}/user/${decoded.id}/cloud`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error("Upload failed");
        }
        return response.json();
      });

      const result = await toast.promise(uploadPromise, {
        loading: "Uploading photo...",
        success: "Upload successful",
        error: "Upload failed",
      });
      modalOff();
      return result;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const uploadedFile = await uploadPhoto(file);

      if (!uploadedFile) {
        return;
      }

      try {
        const photoFormData = {
          user: decoded.id,
          image: uploadedFile.image,
          category: formData.category,
          description: formData.description,
          title: formData.title,
          price: Math.round(Number(formData.price) * 100),
        };
        const response = await fetch(`${API_URL}/photo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(photoFormData),
        });
        return await response.json();
      } catch (error) {
        console.log(error.message);
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
      <Container className="w-100">
        <Row>
          <Col
            xs={12}
            className="d-flex justify-content-between align-items-center p-0 "
          >
            <div className="w-100 ">
              <h3 className="h3-modal-custom p-3   ">My Photo Gallery</h3>
              <div className="d-flex align-items-end justify-content-end">
                <button
                  className="btn btn-custom-upload-modal"
                  onClick={modalOn}
                >
                  Upload Photo
                </button>
              </div>
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
                        step="0.01"
                        placeholder="price"
                        onChange={onChangeInput}
                      />
                      <input
                        className="input-custom-upload-modal"
                        type="file"
                        accept=".jpg,.jpeg,image/jpeg"
                        onChange={onFileChange}
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
