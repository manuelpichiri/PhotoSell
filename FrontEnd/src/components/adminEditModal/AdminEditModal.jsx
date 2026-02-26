import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import InputCustom from "../inputCustom/InputCustom";
import "./adminEditModal.css";
const AdminEditUserModal = ({
  show,
  onClose,
  selectedUser,
  token,
  onSaved,
}) => {
  const [userValue, setUserValue] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    country: "",
    role: "",
  });

  useEffect(() => {
    if (!selectedUser) return;

    setUserValue({
      firstName: selectedUser.firstName || "",
      lastName: selectedUser.lastName || "",
      dateOfBirth: selectedUser.dateOfBirth || "",
      country: selectedUser.country || "",
      role: selectedUser.role || "",
    });
  }, [selectedUser]);

  const submitOn = async (e) => {
    e.preventDefault();
    if (!selectedUser?._id) return toast.error("Missing user id");

    try {
      const response = await fetch(
        `http://localhost:4545/user/${selectedUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userValue),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return toast.error(data?.message || "Update failed");
      }

      const updatedUser = data?.user?.user || data?.user || data;

      toast.success("User updated");
      onSaved?.(updatedUser);
      onClose();
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit user</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={submitOn} className="d-flex flex-column gap-3">
          <InputCustom
            className="text-dark"
            type="text"
            text="First name"
            value={userValue.firstName}
            onChange={(e) =>
              setUserValue({ ...userValue, firstName: e.target.value })
            }
          />

          <InputCustom
            className="text-dark"
            type="text"
            text="Last name"
            value={userValue.lastName}
            onChange={(e) =>
              setUserValue({ ...userValue, lastName: e.target.value })
            }
          />

          <InputCustom
            className="text-dark"
            type="date"
            text="Date of birth"
            value={userValue.dateOfBirth}
            onChange={(e) =>
              setUserValue({ ...userValue, dateOfBirth: e.target.value })
            }
          />

          <InputCustom
            className="text-dark"
            type="text"
            text="Country"
            value={userValue.country}
            onChange={(e) =>
              setUserValue({ ...userValue, country: e.target.value })
            }
          />
          <div className="d-flex justify-content-between  align-items-center">
            <div>
              <label className="label-admin-edit d-flex">Role</label>
            </div>
            <div className="w-50">
              {" "}
              <select
                class="form-select "
                value={userValue.role}
                onChange={(e) =>
                  setUserValue({ ...userValue, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="company">Company</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AdminEditUserModal;
