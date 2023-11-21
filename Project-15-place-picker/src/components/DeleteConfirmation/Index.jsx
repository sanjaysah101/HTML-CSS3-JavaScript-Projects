import Progress from "../ProgressBar";
import styles from "./DeleteConfirmation.module.scss";

const { deleteConfirmation, confirmationActions, buttonText, btn } = styles;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div className={deleteConfirmation}>
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div className={confirmationActions}>
        <button onClick={onCancel} className={buttonText}>
          No
        </button>
        <button onClick={onConfirm} className={btn}>
          Yes
        </button>
      </div>
      <Progress />
    </div>
  );
}