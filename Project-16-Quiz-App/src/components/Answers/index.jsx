import { useRef } from "react";
import PropTypes from "prop-types";
import style from "./answers.module.scss";

function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul className={style.answers}>
      {shuffledAnswers.current.map((answer, index) => {
        const isSelected = selectedAnswer === answer;

        let cssClass = "";

        if (answerState === "answered" && isSelected) {
          cssClass = style.selected;
        } else if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = style[answerState];
        }

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
  answers: PropTypes.array,
  selectedAnswer: PropTypes.string,
  answerState: PropTypes.string,
  onSelect: PropTypes.func,
};

export default Answers;
