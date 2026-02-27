import "./oauthLogin.css";
import { API_URL } from "../../config/api";

const OauthLogin = () => {
  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/google`;
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-3">
      <button
        type="button"
        onClick={loginWithGoogle}
        className="btn-oauth-login"
      >
        <img
          src="/google-icon.png"
          className="icon-oauth-login"
          alt="Login con Google"
        />
      </button>
    </div>
  );
};

export default OauthLogin;
