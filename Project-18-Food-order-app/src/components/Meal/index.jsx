import PropTypes from "prop-types";

import Button from "../UI/Button";
import style from "./meal.module.scss";
import { URL } from "../../services/constants/constants";
import { useContext } from "react";
import { CartContext } from "../../services/stores/CartContext";
import { currencyFormatter } from "../../services/utils/currencyFormat";

function Meal({ meal }) {
  const { id, name, price, description, image } = meal;

  const { onAddItem } = useContext(CartContext);

  return (
    <div className={style["meal-item"]}>
      <div className={style["img-wrapper"]}>
        <img src={`${URL}${image}`} alt={`${name} meal image`} />
      </div>
      <div className={style["content"]}>
        <h3 className={style["title"]}>{name}</h3>
        <div className={style["price"]}>{currencyFormatter.format(price)}</div>
        <p className={style["description"]}>{description}</p>
        <Button type="button" onClick={() => onAddItem(id)}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

Meal.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default Meal;
