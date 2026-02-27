import "./oauthSuccess.css";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser, setSavedToken } = useContext(UserContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    localStorage.setItem("token", token);
    setSavedToken?.(token);

    const decoded = jwtDecode(token);
    setUser(decoded);

    window.history.replaceState({}, document.title, "/"); // pulisce l'url

    navigate("/");
  }, []);
  return (
    <>
      <div>ciaoo</div>
    </>
  );
};
export default OAuthSuccess;
