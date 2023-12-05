import PropTypes from "prop-types";
import style from "./input.module.scss";

function Input({ label, id, error, ...props }) {
  return (
    <div className={style.control}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} />
      <div className={style["control-error"]}>{error && <p>{error}</p>}</div>
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,
};

export default Input;
