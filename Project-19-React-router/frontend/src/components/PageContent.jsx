import PropTypes from "prop-types";
import classes from "./PageContent.module.css";

function PageContent({ title, children }) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

PageContent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default PageContent;
