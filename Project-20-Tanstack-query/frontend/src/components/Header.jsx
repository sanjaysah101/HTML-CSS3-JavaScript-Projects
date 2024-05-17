import { useIsFetching } from "@tanstack/react-query";
import PropTypes from "prop-types";

export default function Header({ children }) {
  const fetching = useIsFetching();

  return (
    <>
      <div id="main-header-loading">{fetching > 0 ? <progress /> : null}</div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};
