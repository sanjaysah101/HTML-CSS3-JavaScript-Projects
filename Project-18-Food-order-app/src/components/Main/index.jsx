import { useContext } from "react";
import Meal from "../Meal";
import style from "./main.module.scss";
import { AppContext } from "../../services/stores/appContext";

function Main() {
  const { mealData } = useContext(AppContext);

  return (
    <section className={style["meal-items"]}>
      {mealData.map((data) => (
        <Meal key={data.id} data={data} />
      ))}
    </section>
  );
}

export default Main;
