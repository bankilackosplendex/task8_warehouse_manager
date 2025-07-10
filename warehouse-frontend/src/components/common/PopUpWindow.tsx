import "./PopUpWindow.scss";

function PopUpWindow({
  text,
  closePopUpWindow,
  deleteItem
}: {
  text: string;
  closePopUpWindow: () => void;
  deleteItem: () => void;
}) {
  return (
    <div className="popUpWindow">
      {/* PopUpWindow text */}
      <p className="popUpWindow__text">
        {text}
      </p>
      {/* PopUpWindow buttons */}
      <div className="popUpWindow__buttonContainer">
        {/* Cancel button */}
        <button
          className="popUpWindow__buttonContainer__cancelButton"
          onClick={() => closePopUpWindow()}
        >
          Cancel
        </button>
        {/* Delete button */}
        <button
          className="popUpWindow__buttonContainer__deleteButton"
          onClick={() => deleteItem()}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default PopUpWindow;
