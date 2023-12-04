import PropTypes from "prop-types";

export default function Badge({ caption }) {
  return <span className="badge">{caption}</span>;
}

Badge.propTypes = {
  caption: PropTypes.number.isRequired,
};
