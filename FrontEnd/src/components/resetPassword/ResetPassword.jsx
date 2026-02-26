import { useSearchParams } from "react-router-dom";
import "./resetPassword.css";
import { API_URL } from "../../config/api";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { Camera } from "lucide-react";
import InputCustom from "../inputCustom/InputCustom";
import { UserContext } from "../../../context/userContext";
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { savedToken } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [comparePassword, setComparePassword] = useState("");

  const navigate = useNavigate();

  const recoverPassword = async () => {
    try {
      const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savedToken, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        return toast.error(data.message || "Error in reset");
      }
      toast.success("Password update");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!savedToken) return toast.error("Missing token");
    if (password.length < 8)
      return toast.error("Password must be contain 8 char");
    if (password !== comparePassword)
      return toast.error("the two passwords do not match");
    await recoverPassword();
  };

  return (
    <>
      <Container
        fluid
        className="d-flex flex-column align-items-center justify-content-center container-reset-password"
      >
        <Row className="mb-5">
          <Col xs={12} className="w-100 d-flex align-items-start h-100 ">
            <div className="d-flex align-items-start justify-content-center col-custom-reset-password-page w-100 h-100">
              <h3 className="d-flex align-items-center justify-content-center gap-1">
                <Camera />
                PhotoSell
              </h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
            className="d-flex  align-items-center justify-content-center col-custom-reset-password-page  "
          >
            <div className="d-flex flex-column ">
              <form onSubmit={onSubmit}>
                <InputCustom
                  className="text-dark"
                  type="password"
                  text="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputCustom
                  className="text-dark"
                  type="password"
                  text="Verify Password"
                  placeholder="Verify Password"
                  value={comparePassword}
                  onChange={(e) => setComparePassword(e.target.value)}
                />
                <div className="d-flex justify-content-center">
                  <button className="btn btn-info" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ResetPassword;
