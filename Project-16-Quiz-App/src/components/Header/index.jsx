import quizLogo from "../../assets/quiz-logo.png";
import style from "./header.module.scss";

function Header() {
  return (
    <header className={style.header}>
      <img src={quizLogo} alt="Quiz logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
}

export default Header;
