import "./navbarCustom.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "@fontsource/plus-jakarta-sans";
import { Camera, User, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ModalCart from "../modalCart/ModalCart";
const NavbarCustom = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Container>
        <Navbar expand="lg" className=" bg-dark text-white  p-2">
          <Container>
            <Navbar.Brand href="/homepage" className="text-custom">
              <Camera />
              PhotoSell
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto nav-custom ">
                <Nav.Link href="#home" className="text-custom">
                  Info
                </Nav.Link>
                <Nav.Link href="#link" className="text-custom">
                  About
                </Nav.Link>

                <Nav.Link href="#link" className="text-custom">
                  Ciao
                </Nav.Link>
              </Nav>
              <ModalCart />

              <User />
              <NavDropdown id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="/userPage">Account</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </>
  );
};
export default NavbarCustom;
