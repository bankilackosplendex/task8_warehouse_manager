import "./BackButton.scss";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function BackButton() {
  // --- NAVIGATION ---
  const navigate = useNavigate();

  return (
    // Back button
    <button className="backButton" onClick={() => navigate(-1)}>
      <ArrowLeft />
    </button>
  );
}

export default BackButton;
