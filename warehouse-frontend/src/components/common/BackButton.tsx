import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./BackButton.scss";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button className="backButton" onClick={() => navigate(-1)}>
      <ArrowLeft />
    </button>
  );
}

export default BackButton;
