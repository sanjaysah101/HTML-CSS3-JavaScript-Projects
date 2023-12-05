import { useContext } from "react";
import PropTypes from "prop-types";

import Button from "../UI/Button";
import { UserProgressContext } from "../../services/stores/UserProgress";

function SuccessMessage({ onClose }) {
  const { hideSuccessMessageDialog } = useContext(UserProgressContext);

  const handleCloseButtonClick = () => {
    hideSuccessMessageDialog();
    onClose();
  };

  return (
    <div>
      <h2 className="modal-title">Success!</h2>
      <p className="modal-desc">Your order was submitted successfully.</p>
      <p className="modal-desc">
        We will get back to you with more details via email within the next few
        minutes.
      </p>
      <div className="modal-actions">
        <Button type="button" onClick={handleCloseButtonClick}>
          Okay
        </Button>
      </div>
    </div>
  );
}

SuccessMessage.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SuccessMessage;
