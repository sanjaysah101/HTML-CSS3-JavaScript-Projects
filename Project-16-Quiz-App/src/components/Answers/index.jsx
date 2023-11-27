import { useRef } from "react";
import PropTypes from "prop-types";
import style from "./answers.module.scss";

function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  const answerStateClasses = {
    answered: style.selected,
    correct: style.correct,
    wrong: style.wrong,
  };

  return (
    <ul className={style.answers}>
      {shuffledAnswers.current.map((answer, index) => {
        const isSelected = selectedAnswer === answer;
        const cssClass = isSelected ? answerStateClasses[answerState] : "";

        return (
          <li key={answer} className={style.answer}>
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              <span>{index + 1}. </span>
              <span>{answer}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

Answers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string),
  selectedAnswer: PropTypes.string,
  answerState: PropTypes.string,
  onSelect: PropTypes.func,
};

export default Answers;
