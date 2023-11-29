import { Link } from "react-router-dom";
const DUMMY_EVENTS = [
  { id: "e1", title: "Some event" },
  { id: "e2", title: "Another event" },
];

function Event() {
  return (
    <>
      <h1>Event Page</h1>
      <ul>
        {DUMMY_EVENTS.map(({ id, title }) => (
          <li key={id}>
            <Link to={id}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Event;
