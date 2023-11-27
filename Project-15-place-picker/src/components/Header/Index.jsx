import logoImg from "/logo.png";
import style from "./Header.module.scss";

function Header() {
  return (
    <header className={style.header}>
      <img src={logoImg} alt="Stylized globe" />
      <h1>PlacePicker</h1>
      <p>
        Create your personal collection of places you would like to visit or you
        have visited.
      </p>
    </header>
  );
}

export default Header;
