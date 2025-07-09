import "./ErrorWindow.scss";
import { ArrowLeft, Home, LogIn, SearchX, ShieldX } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ErrorWindow({
  text,
  statusCode,
}: {
  text: string;
  statusCode: number;
}) {
  const navigate = useNavigate();

  return (
    <div className="errorWindow">
      {/* ErrorWindow text */}
      <p className="errorWindow__text">{text}</p>
      {/* ErrorWindow buttons */}
      {statusCode === 401 && <ShieldX className="errorWindow__icon" />}
      {statusCode === 404 && <SearchX className="errorWindow__icon" />}
      <div className="errorWindow__buttonContainer">
        {/* Back button */}
        <button
          className="errorWindow__buttonContainer__backButton"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </button>
        {/* Home button */}
        <button
          className="errorWindow__buttonContainer__homeButton"
          onClick={() => navigate("/")}
        >
          <Home />
        </button>
        {/* Login button */}
        {statusCode === 401 && (
          <button
            className="errorWindow__buttonContainer__loginButton"
            onClick={() => navigate("/login")}
          >
            <LogIn />
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorWindow;
