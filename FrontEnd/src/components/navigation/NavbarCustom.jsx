import "./navbarCustom.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "@fontsource/plus-jakarta-sans";
import { Camera, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ModalCart from "../modalCart/ModalCart";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";
const NavbarCustom = () => {
  const { logged, setLogged, setUser, setSavedToken, user } =
    useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setSavedToken("");
    setUser(null);
    setLogged(false);
    navigate("/login");
  };

  return (
    <>
      <Container fluid className="p-0">
        <Navbar expand="lg" className=" bg-dark text-white  p-2">
          <Container>
            <Navbar.Brand
              href="/"
              className="text-custom d-flex align-items-center"
            >
              <Camera />
              PhotoSell
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto nav-custom ">
                <Nav.Link href="/info" className="text-custom">
                  Info
                </Nav.Link>
                <Nav.Link href="/about-us" className="text-custom">
                  About
                </Nav.Link>
              </Nav>
              {logged === false && (
                <Link
                  to="/registration"
                  className="btn btn-sign-in text-custom"
                >
                  Sign in
                </Link>
              )}

              <div className="user-menu">
                {user.role === "admin" && (
                  <Link to="/admin" className="link-admin-page">
                    Admin
                  </Link>
                )}

                <ModalCart className="modal-cart-navbar" />
                <User size={32} />
                <NavDropdown id="basic-nav-dropdown">
                  {logged === false && (
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  )}

                  {logged === true && (
                    <NavDropdown.Item href="/userPage">
                      Account
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </>
  );
};
export default NavbarCustom;
