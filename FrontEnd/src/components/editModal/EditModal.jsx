import { useContext, useState } from "react";
import "./editModal.css";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../../context/userContext";
import InputCustom from "../inputCustom/InputCustom";

const EditModal = ({ className }) => {
  const [showModal, setShowModal] = useState(false);
  const { token, user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});

  const [userValue, setUserValue] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    dateOfBirth: user.dateOfBirth || "",
    country: user.country || "",
  });

  const modalOn = () => {
    setShowModal(true);
  };

  const modalOff = () => {
    setShowModal(false);
  };

  const updateUser = async () => {
    console.log(user._id);
    try {
      const response = await fetch(`http://localhost:4545/user/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userValue),
      });
      const data = await response.json();
      console.log(data.user.user);
      setUser(data.user.user);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitOn = async (e) => {
    e.preventDefault();
    const validation = validateUser({
      ...userValue,
      firstName: user.firstName,
    });
    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    await updateUser();
  };

  return (
    <Container className={className}>
      <Row>
        <Col xs={12}>
          <Button className="  modalEdit-button-custom" onClick={modalOn}>
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
  );
};

export default EditModal;
