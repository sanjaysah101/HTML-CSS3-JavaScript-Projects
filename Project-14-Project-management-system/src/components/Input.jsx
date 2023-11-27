import { forwardRef } from "react";
import PropTypes from "prop-types";

const Input = forwardRef(({ label, textarea, ...props }, ref) => {
  const classes =
    "w-full p-1 border-b-2 rounded-sm bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

  return (
    <p className="flex flex-col gap-1 my-4">
      <label htmlFor="" className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {textarea ? (
        <textarea ref={ref} className={classes} {...props} />
      ) : (
        <input ref={ref} className={classes} {...props} />
      )}
    </p>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  textarea: PropTypes.bool,
};

// displayName allows you to name your component. This name is used by React in debugging messages.
Input.displayName = "Input";

export default Input;
