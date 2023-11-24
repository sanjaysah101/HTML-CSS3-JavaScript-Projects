import logo from "/logo.jpg";
import style from "./header.module.scss";
import Button from "../Button";

function Header() {
  return (
    <div className={style.navigation}>
      <div className={style.brand}>
        <img src={logo} alt="Food order logo" />
        <span>ReactFood</span>
      </div>
      <div className={style.userAction}>
        <Button type={"button-text"} label={"Cart (3)"}/>
      </div>
    </div>
  );
}

export default Header;
