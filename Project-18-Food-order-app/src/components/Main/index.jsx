import { useContext } from "react";
import Meal from "../Meal";
import style from "./main.module.scss";
import { CartContext } from "../../services/stores/CartContext";
import Error from "../UI/Error";

function Main() {
  const { mealData, isLoading, error } = useContext(CartContext);

  if (isLoading) {
    return <p>Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <section className={style["meal-items"]}>
      {mealData.map((meal) => (
        <Meal key={meal.id} meal={{ ...meal, price: +meal.price }} />
      ))}
    </section>
  );
}

export default Main;
