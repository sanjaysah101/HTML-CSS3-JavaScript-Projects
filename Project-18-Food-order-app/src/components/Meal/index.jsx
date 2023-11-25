import PropTypes from "prop-types";

import Button from "../Button";
import style from "./meal.module.scss";
import { URL } from "../../services/constants/constants";

function Meal({ data }) {
  const { name, price, description, image } = data;

  return (
    <div className={style["meal-item"]}>
      <div className={style["img-wrapper"]}>
        <img src={`${URL}${image}`} alt={name} />
      </div>
      <div className={style["content"]}>
        <h3 className={style["title"]}>{name}</h3>
        <div className={style["price"]}>{price}</div>
        <p className={style["description"]}>{description}</p>
        <Button label="Add to Cart" />
      </div>
    </div>
  );
}

Meal.propTypes = {
  data: PropTypes.object,
};

export default Meal;
