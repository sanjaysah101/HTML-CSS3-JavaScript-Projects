import PropTypes from "prop-types";

import quizComplete from "../../assets/quiz-complete.png";
import QUESTIONS from "../../store/questions.js";
import style from "./summary.module.scss";

// Function to determine answer type
function getAnswerType(answer, index) {
  if (answer === null) {
    return "null";
  } else if (answer === QUESTIONS[index].answers[0]) {
    return "correct";
  } else {
    return "wrong";
  }
}

// Object lookup for CSS classes
const userAnswerStateClasses = {
  null: style.skipped,
  correct: style.correct,
  wrong: style.wrong,
};

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
          const cssClass = userAnswerStateClasses[getAnswerType(answer, index)];
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className={style.question}>{QUESTIONS[index].text}</p>
              <p className={`${style["user-answer"]} ${cssClass}`}>
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
  userAnswers: PropTypes.arrayOf(PropTypes.string),
};

export default Summary;
