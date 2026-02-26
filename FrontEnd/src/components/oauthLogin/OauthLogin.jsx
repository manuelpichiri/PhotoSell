import "./oauthLogin.css";
import { Container, Row, Col } from "react-bootstrap";
const OauthLogin = () => {
  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_BE_URL}/google`;
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center mt-3">
        <button onClick={loginWithGoogle} className="btn-oauth-login">
          <img
            src="../../../public/google-icon.png"
            className="icon-oauth-login"
          />
        </button>
      </div>
    </>
  );
};

export default OauthLogin;
