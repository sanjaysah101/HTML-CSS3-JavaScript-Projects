import PropTypes from "prop-types";

import quizComplete from "../../assets/quiz-complete.png";
import QUESTIONS from "../../store/questions.js";
import style from "./summary.module.scss";

function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);

  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );

  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );

  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div className={style.summary}>
      <img src={quizComplete} alt="Quiz complete" />
      <h2>Quiz Completed!</h2>
      <div className={style["summary-stats"]}>
        <p>
          <span className={style.number}>{skippedAnswersShare}%</span>
          <span className={style.text}>skipped</span>
        </p>
        <p>
          <span className={style.number}>{correctAnswersShare}%</span>
          <span className={style.text}>answered correctly</span>
        </p>
        <p>
          <span className={style.number}>{wrongAnswersShare}%</span>
          <span className={style.text}>answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass;

          if (answer === null) {
            cssClass = "skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass = "correct";
          } else {
            cssClass = "wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className={style.question}>{QUESTIONS[index].text}</p>
              <p className={`${style["user-answer"]} ${style[cssClass]}`}>
                {answer ?? "Skipped"}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

Summary.propTypes = {
  userAnswers: PropTypes.array,
};

export default Summary;
