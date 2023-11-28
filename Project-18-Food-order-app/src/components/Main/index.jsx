import { useContext } from "react";
import Meal from "../Meal";
import style from "./main.module.scss";
import { CartContext } from "../../services/stores/CartContext";

function Main() {
  const { mealData } = useContext(CartContext);

  return (
    <section className={style["meal-items"]}>
      {mealData.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </section>
  );
}

export default Main;
