import "./RegisterForm.scss";
import { KeyRound, Mail, UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService.tsx";

function RegisterForm() {
  // --- NAVIGATION ---
  const navigate = useNavigate();

  // --- USER DATA ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- ERROR VARIABLE ---
  const [error, setError] = useState("");

  // Registartion
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register({ email, password });

      navigate("/login");
    } catch (err: any) {
      console.error("Registration failed", err);
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
    // Registration form
    <form className="registerForm" onSubmit={handleSubmit}>
      {/* Email */}
      <label className="registerForm__emailLabel" htmlFor="email">
        <Mail className="registerForm__emailLabel__icon" />
        Email
      </label>
      <input
        className="registerForm__emailField"
        type="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {/* Password */}
      <label className="registerForm__passwordLabel" htmlFor="password">
        <KeyRound className="registerForm__passwordLabel__icon" />
        Password
      </label>
      <input
        className="registerForm__passwordField"
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {/* Register button */}
      <button className="registerForm__button" type="submit">
        <UserPlus />
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
