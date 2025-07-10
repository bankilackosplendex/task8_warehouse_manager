import "./Backdrop.scss";

function Backdrop({ closePopUpWindow }: { closePopUpWindow: () => void }) {
  // Backdrop
  return <div className="backdrop" onClick={() => closePopUpWindow()}></div>;
}

export default Backdrop;
