import { CORE_CONCEPTS } from "../../data/data";
import styles from "./CoreConcept.module.css";

function CoreConcepts() {
  return (
    <section id={styles["core-concepts"]}>
      <h2>Core Concepts</h2>
      <ul>
        {CORE_CONCEPTS.map(({ image, title, description }) => (
          <li key={title}>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CoreConcepts;
