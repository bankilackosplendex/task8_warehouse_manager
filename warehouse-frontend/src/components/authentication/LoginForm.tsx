import "./LoginForm.scss";
import { useState } from "react";
import { login } from "../../services/authService.tsx";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { jwtDecode } from "jwt-decode";
import { DecodedAccessToken } from "../../types/DecodedAccessTokenType.tsx";
import { useNavigate } from "react-router-dom";
  

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({ email, password });

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      const decoded = jwtDecode<DecodedAccessToken>(response.accessToken);
      setUser({ email: decoded.sub, role: decoded.role });

      console.log("Sikeres bejelentkezés:", response);
      navigate("/");
    } catch (err: any) {
      console.error("Hiba a bejelentkezés során:", err);
      if (err.response && err.response.data && err.response.data.message) {
      const msg = Array.isArray(err.response.data.message)
        ? err.response.data.message.join(", ")
        : err.response.data.message;
      setError(msg);
    } else {
      setError("Ismeretlen hiba történt.");
    }
    }
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <label className="loginForm__emailLabel" htmlFor="email">Email</label>
      <input
        className="loginForm__emailField"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label className="loginForm__passwordLabel" htmlFor="password">Password</label>
      <input
        className="loginForm__passwordField"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <div className="loginForm__error">{error}</div>}

      <button className="loginForm__button" type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
