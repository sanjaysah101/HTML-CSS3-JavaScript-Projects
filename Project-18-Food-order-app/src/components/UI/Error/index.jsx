import PropTypes from "prop-types";
import style from "./error.module.scss";

function Error({ title, message }) {
  return (
    <div className={style.error}>
      <h2 className={style.title}>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

Error.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Error;
