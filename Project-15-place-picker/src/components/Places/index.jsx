import PropTypes from "prop-types";
import style from "./Places.module.scss";

export default function Places({ title, places, fallbackText, onSelectPlace }) {
  return (
    <section className={style["places-category"]}>
      <h2>{title}</h2>
      {places.length === 0 && (
        <p className={style["fallback-text"]}>{fallbackText}</p>
      )}
      {places.length > 0 && (
        <ul className={style.places}>
          {places.map((place) => {
            const { id, image, title } = place;

            return (
              <li key={id} className={style["place-item"]}>
                <button onClick={() => onSelectPlace(id)}>
                  <img src={image.src} alt={image.alt} />
                  <h3>{title}</h3>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

Places.propTypes = {
  title: PropTypes.string,
  places: PropTypes.array,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  fallbackText: PropTypes.string,
  onSelectPlace: PropTypes.func,
};
