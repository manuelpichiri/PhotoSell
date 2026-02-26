import "./adminPage.css";
import { Container, Row, Col, Table } from "react-bootstrap";
import InputCustom from "../inputCustom/InputCustom";
import { UserContext } from "../../../context/userContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminEditUserModal from "../adminEditModal/AdminEditModal";

const AdminPage = () => {
  const { users, setUsers, savedToken } = useContext(UserContext);
  const [value, setValue] = useState({
    id: "",
  });

  const navigate = useNavigate();

  const decoded = savedToken ? jwtDecode(savedToken) : null;
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchUser, setSearchUser] = useState(null);
  const [showUser, setShowUser] = useState(false);

  const openEdit = (user) => {
    setSelectedUser(user);
    setShowEdit(true);
  };

  const getSingleUser = async (id) => {
    try {
      if (!id) {
        setShowUser(false);
        toast.error("Id not valid");
        return;
      }
      const response = await fetch(`http://localhost:4545/user/${id}`, {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error("user not found");
        setSearchUser(null);

        return;
      }
      setShowUser(true);
      setSearchUser(data.user);

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:4545/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.message || "Delete failed");
        return;
      }

      toast.success("User deleted");

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      toast.error("Server error");
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    getSingleUser(value.id);
  };
  useEffect(() => {
    if (!savedToken) return;
    if (!decoded) return navigate("/*");
    if (decoded.role !== "admin") return navigate("/*");
  }, [savedToken, decoded, navigate]);
  const listToShow = searchUser ? [searchUser] : users;
  const onSaved = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user._id === updatedUser._id ? updatedUser : user)),
    );
  };

  return (
    <Container>
      <Row>
        <Col xs={12} className="mt-3 mb-3">
          <form
            onSubmit={onSubmit}
            className="d-flex justify-content-between gap-2 align-items-center "
          >
            {" "}
            <div className="w-100 d-flex align-items-center">
              <span className="input-group-text">Search By Id</span>
              <input
                type="text"
                text="Search by id"
                className="text-black w-100 form-control"
                value={value.id}
                onChange={(e) => setValue({ id: e.target.value })}
              />
            </div>
            <div className="d-flex align-items-start">
              <button
                className="btn  p-0 m-0 search-button-custom-admin p-2"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#Id</th>
                <th>Role</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {showUser
                ? listToShow.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.role}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td className="d-flex gap-2">
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </button>

                        <button
                          className="btn btn-warning"
                          type="button"
                          onClick={() => openEdit(user)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                : users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.role}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td className="d-flex gap-2">
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </button>

                        <button
                          className="btn btn-warning"
                          type="button"
                          onClick={() => openEdit(user)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>

          <AdminEditUserModal
            show={showEdit}
            onClose={() => setShowEdit(false)}
            selectedUser={selectedUser}
            token={savedToken}
            onSaved={onSaved}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
