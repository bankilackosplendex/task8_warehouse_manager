import "./LoginForm.scss";
import { useState } from "react";
import { login } from "../../services/authService.tsx";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { jwtDecode } from "jwt-decode";
import { DecodedAccessToken } from "../../types/DecodedAccessTokenType.tsx";
import { useNavigate } from "react-router-dom";
import { KeyRound, LogIn, Mail } from "lucide-react";

function LoginForm() {
  // --- USER CONTEXT ---
  const { setUser } = useContext(AuthContext);

  // --- NAVIGATION ---
  const navigate = useNavigate();

  // --- USER DATA ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- ERROR VARIABLE ---
  const [error, setError] = useState("");

  // Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({ email, password });

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      const decoded = jwtDecode<DecodedAccessToken>(response.accessToken);
      setUser({ email: decoded.sub, role: decoded.role });

      navigate("/");
    } catch (err: any) {
      console.error("Login failed", err);
      if (err.response && err.response.data && err.response.data.message) {
        const msg = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(", ")
          : err.response.data.message;
        setError(msg);
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    // Login form
    <form className="loginForm" onSubmit={handleSubmit}>
      {/* Email */}
      <label className="loginForm__emailLabel" htmlFor="email">
        <Mail className="loginForm__emailLabel__icon" />
        Email
      </label>
      <input
        className="loginForm__emailField"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {/* Password */}
      <label className="loginForm__passwordLabel" htmlFor="password">
        <KeyRound className="loginForm__passwordLabel__icon"/>
        Password
      </label>
      <input
        className="loginForm__passwordField"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {/* Login button */}
      <button className="loginForm__button" type="submit">
        <LogIn />
        Login
      </button>
    </form>
  );
}

export default LoginForm;
