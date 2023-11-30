import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classes from "./EventsList.module.css";

function EventsList({ events }) {
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map(({ id, image, title, date }) => (
          <li key={id} className={classes.item}>
            <Link to={`/events/${id}`}>
              <img src={image} alt={title} />
              <div className={classes.content}>
                <h2>{title}</h2>
                <time>{date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
};

export default EventsList;
