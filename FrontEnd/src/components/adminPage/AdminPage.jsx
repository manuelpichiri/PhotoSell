import "./adminPage.css";
import { Container, Row, Col, Table } from "react-bootstrap";
import InputCustom from "../inputCustom/InputCustom";
import { UserContext } from "../../../context/userContext";
import { useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const AdminPage = () => {
  const { users, savedToken } = useContext(UserContext);

  const decoded = savedToken ? jwtDecode(savedToken) : null;

  const navigate = useNavigate();
  const deleteUser = async (savedToken, id) => {
    try {
      const response = await fetch(`http://localhost:4545/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    users;
    if (!savedToken) return;
    if (!decoded) return;
    if (decoded.role !== "admin") {
      return navigate("/*");
    }
  }, [savedToken, navigate]);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div>
              <form>
                <InputCustom />
              </form>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="">
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
                {users.map((user) => {
                  return (
                    <tr>
                      <td>{user._id}</td>
                      <td>{user.role}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteUser(savedToken, user._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default AdminPage;
