import PropTypes from "prop-types";
import style from "./button.module.scss";

function Button({ children, className, variant = "contained", ...props }) {
  const cssClasses = `${style[variant === "text" ? "text-button" : "button"]} ${
    className || ""
  }`;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["text", "contained"]),
  className: PropTypes.string,
};

export default Button;
