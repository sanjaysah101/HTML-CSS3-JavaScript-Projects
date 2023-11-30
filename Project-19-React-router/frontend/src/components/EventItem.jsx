import PropTypes from "prop-types";

import classes from "./EventItem.module.css";
import { Link, useSubmit, useRouteLoaderData } from "react-router-dom";

function EventItem({ event }) {
  const submit = useSubmit();
  const token = useRouteLoaderData("root");

  const { title, image, date, description } = event;

  function startDeleteHandler() {
    const proceed = confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.event}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <time>{date}</time>
      <p>{description}</p>
      {token ? (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      ) : null}
    </article>
  );
}

EventItem.propTypes = {
  event: PropTypes.object,
};

export default EventItem;
