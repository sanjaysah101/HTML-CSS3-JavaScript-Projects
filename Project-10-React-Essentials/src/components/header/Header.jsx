import reactLogo from "../../assets/react-core-concepts.png";
import "./Header.module.css";

function Header() {
  const reactDescriptions = ["Fundamental", "Crucial", "Core"];

  const genRandomInt = (max) => Math.floor(Math.random() * (max + 1));

  const description = reactDescriptions[genRandomInt(3)];
  return (
    <header>
      <img src={reactLogo} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

export default Header;
