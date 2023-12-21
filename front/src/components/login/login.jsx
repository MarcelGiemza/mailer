import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.scss";

const Login = () => {
  const naviagte = useNavigate();

  const login = async (e) => {
    const form = e.target.parentNode;
    const email = form[0].value;
    const password = form[1].value;

    const userData = { email, password };

    const response = await axios.post("/api/login/user", userData);
    const data = response.data;

    if (data.success && data.token) {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("email", email)
      naviagte("/messages");
    }
  };

  return (
    <form className="Login">
      <h2>Login</h2>
      <input name="email" placeholder="email" type="text" />
      <input name="password" placeholder="password" type="password" />
      <button type="button" onClick={login}>
        Login
      </button>
    </form>
  );
};

export default Login;
