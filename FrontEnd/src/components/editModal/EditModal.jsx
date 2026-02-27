import { useContext, useEffect, useState } from "react";
import "./editModal.css";
import { API_URL } from "../../config/api";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../../context/userContext";
import InputCustom from "../inputCustom/InputCustom";
import toast from "react-hot-toast";
import { useFormErrors } from "../../hook/validationHook";
const EditModal = ({ className }) => {
  const [showModal, setShowModal] = useState(false);
  const { token, user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const validateUser = (values) => {
    const errors = {};

    if (!values.firstName || values.firstName.trim().length < 2) {
      errors.firstName = "Nome troppo corto";
    }
    if (!values.lastName || values.lastName.trim().length < 2) {
      errors.lastName = "Cognome troppo corto";
    }
    if (!values.country) {
      errors.country = "Country obbligatoria";
    }

    const dateStr = values.dateOfBirth;
    if (!dateStr) {
      errors.dateOfBirth = "La data è richiesta";
    }

    return errors;
  };

  const [userValue, setUserValue] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    country: "",
  });

  const modalOn = () => setShowModal(true);
  const modalOff = () => setShowModal(false);

  useEffect(() => {
    if (!showModal) return;

    setUserValue({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      dateOfBirth: user?.dateOfBirth
        ? String(user.dateOfBirth).slice(0, 10)
        : "",
      country: user?.country || "",
    });

    setErrors({});
  }, [showModal, user]);

  const updateUser = async () => {
    const updateUserPromise = fetch(`${API_URL}/user/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userValue),
    }).then(async (response) => {
      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.log("Response is not json");
        data = null;
      }

      if (!response.ok) {
        throw new Error("Update failed");
      }
      return data;
    });

    return toast.promise(updateUserPromise, {
      loading: "Updating profile...",
      success: "Profile updated",
      error: (err) => err.message || "Update failed",
    });
  };

  const submitOn = async (e) => {
    e.preventDefault();

    if (!user || !user._id) return;

    const validation = validateUser(userValue);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return; //object key prende la proprietà dell'oggetto, controlla che non ci siano errori nel form se ci sono fa return

    try {
      setSaving(true);

      const result = await updateUser();
      if (!result) return;

      let updatedUser;
      if (result.user && result.user.user) updatedUser = result.user.user;
      else if (result.user) updatedUser = result.user;
      else updatedUser = result;

      if (!updatedUser) return;

      setUser(updatedUser);
      modalOff();
    } catch (error) {
      console.log(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className={className}>
      <Row>
        <Col xs={12}>
          <Button className="  modal-edit-button-custom" onClick={modalOn}>
            Edit Profile
          </Button>

          <Modal show={showModal} onHide={modalOff}>
            <Modal.Dialog>
              <Modal.Header closeButton>
                <Modal.Title>User Info</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <form onSubmit={submitOn}>
                  <InputCustom
                    className="label-color-modalEdit"
                    type="text"
                    placeholder="First name"
                    text="First name"
                    value={userValue.firstName}
                    onChange={(e) => {
                      setUserValue({ ...userValue, firstName: e.target.value });
                    }}
                  ></InputCustom>
                  <InputCustom
                    className="label-color-modalEdit"
                    type="text"
                    placeholder="Last name"
                    text="Last name"
                    value={userValue.lastName}
                    onChange={(e) => {
                      setUserValue({ ...userValue, lastName: e.target.value });
                    }}
                  ></InputCustom>
                  <InputCustom
                    className="label-color-modalEdit"
                    type="date"
                    placeholder="Date of birth"
                    text="Date of birth"
                    value={userValue.dateOfBirth}
                    onChange={(e) => {
                      setUserValue({
                        ...userValue,
                        dateOfBirth: e.target.value,
                      });
                    }}
                  ></InputCustom>
                  <InputCustom
                    className="label-color-modalEdit"
                    type="text"
                    placeholder="Country"
                    text="Country"
                    value={userValue.country}
                    onChange={(e) => {
                      setUserValue({ ...userValue, country: e.target.value });
                    }}
                  ></InputCustom>
                  <div className="d-flex align-items-center justify-content-center">
                    <Button variant="primary" type="submit">
                      Save changes
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default EditModal;
