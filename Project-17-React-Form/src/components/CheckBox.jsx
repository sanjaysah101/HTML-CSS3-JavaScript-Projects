import PropTypes from "prop-types";

function CheckBox({ label, id, ...props }) {
  return (
    <div className="control">
      <input id={id} type="checkbox" {...props} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

CheckBox.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
};

export default CheckBox;
