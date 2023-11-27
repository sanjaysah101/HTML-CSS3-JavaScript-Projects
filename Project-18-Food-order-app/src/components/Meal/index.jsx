import PropTypes from "prop-types";

import Button from "../Button";
import style from "./meal.module.scss";
import { URL } from "../../services/constants/constants";
import { useContext } from "react";
import { AppContext } from "../../services/stores/appContext";
import { currencyFormatter } from "../../services/utils/currencyFormat";

function Meal({ data }) {
  const { id, name, price, description, image } = data;

  const { onAddToCartButtonClick } = useContext(AppContext);

  return (
    <div className={style["meal-item"]}>
      <div className={style["img-wrapper"]}>
        <img src={`${URL}${image}`} alt={name} />
      </div>
      <div className={style["content"]}>
        <h3 className={style["title"]}>{name}</h3>
        <div className={style["price"]}>{currencyFormatter.format(price)}</div>
        <p className={style["description"]}>{description}</p>
        <Button
          label="Add to Cart"
          onClick={() => onAddToCartButtonClick(id)}
        />
      </div>
    </div>
  );
}

Meal.propTypes = {
  data: PropTypes.object,
};

export default Meal;
