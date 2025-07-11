import "./ErrorWindow.scss";
import {
  ArrowLeft,
  CircleX,
  Home,
  LogIn,
  RotateCcw,
  SearchX,
  ServerOff,
  ShieldX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function ErrorWindow({
  text,
  statusCode,
  onClose,
}: {
  text: string;
  statusCode: number;
  onClose: () => void
}) {
  // --- NAVIGATION ---
  const navigate = useNavigate();

  return (
    // Error window
    <div className="errorWindow">
      {/* ErrorWindow text */}
      <p className="errorWindow__text">{text}</p>
      {/* ErrorWindow buttons */}
      {statusCode === 400 && <CircleX className="errorWindow__icon" />}
      {statusCode === 401 && <ShieldX className="errorWindow__icon" />}
      {statusCode === 404 && <SearchX className="errorWindow__icon" />}
      {statusCode === 503 && <ServerOff className="errorWindow__icon" />}
      <div className="errorWindow__buttonContainer">
        {/* Back button */}
        {(statusCode === 401 || statusCode === 404) && (
          <button
            className="errorWindow__buttonContainer__backButton"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </button>
        )}
        {/* Home button */}
        <button
          className="errorWindow__buttonContainer__homeButton"
          onClick={() => navigate("/")}
        >
          <Home />
        </button>
        {/* Refresh button */}
        {(statusCode === 503) && (
          <button
            className="errorWindow__buttonContainer__refreshButton"
            onClick={() => (onClose(),navigate(0))}
          >
            <RotateCcw />
          </button>
        )}
        {/* Login button */}
        {(statusCode === 400 || statusCode === 401 || statusCode ===  503) && (
          <button
            className="errorWindow__buttonContainer__loginButton"
            onClick={() => (onClose(),navigate("/login"))}
          >
            <LogIn />
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorWindow;
