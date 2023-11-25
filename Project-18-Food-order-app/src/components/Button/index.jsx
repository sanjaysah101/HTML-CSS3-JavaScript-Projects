import PropTypes from "prop-types";
import style from "./button.module.scss";

function Button({ type, label, ...prop }) {
  return (
    <button
      className={`${
        type === "button-text" ? style["text-button"] : style["button"]
      }`}
      {...prop}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
};

export default Button;
