import PropTypes from "prop-types";
import style from "./button.module.scss";

function Button({ children, textOnly, className, ...prop }) {
  let cssClasses = textOnly ? style["text-button"] : style["button"];
  cssClasses += " " + className;

  return (
    <button className={cssClasses} {...prop}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  textOnly: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
