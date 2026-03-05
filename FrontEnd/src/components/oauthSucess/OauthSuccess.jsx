import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { setSavedToken } = useContext(UserContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("URL:", window.location.href);
    console.log("TOKEN:", token);

    if (!token) {
      const existing = localStorage.getItem("token");
      if (existing) {
        setSavedToken(existing);
        navigate("/", { replace: true });
        return;
      }
      navigate("/login", { replace: true });
      return;
    }

    localStorage.setItem("token", token);
    setSavedToken(token);

    navigate("/", { replace: true });
  }, [navigate, setSavedToken]);

  return <h3>Login...</h3>;
};

export default OAuthSuccess;
