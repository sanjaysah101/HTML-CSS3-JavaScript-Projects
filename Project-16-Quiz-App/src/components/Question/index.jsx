import PropTypes from "prop-types";
import { useState } from "react";
import style from "./question.module.scss";

import QuestionTimer from "../QuestionTimer";
import Answers from "../Answers";

import QUESTIONS from "../../store/questions.js";
import {
  SKIP_QUESTION_TIMEOUT,
  CORRECT_ANSWER_TIMEOUT,
  CHECKING_ANSWER_TIMEOUT,
  ANSWER_NOT_SELECTED,
} from "../../services/constant.js";

function Question({ questionIndex, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  const handleSelectAnswer = (selectedAnswer) => {
    setAnswer({
      selectedAnswer,
      isCorrect: null,
    });

    const checkingAnswerTimeout = setTimeout(() => {
      const correctAnswer = QUESTIONS[questionIndex].answers[0];
      setAnswer({
        selectedAnswer,
        isCorrect: correctAnswer === selectedAnswer,
      });

      const correctAnswerTimeout = setTimeout(() => {
        onSelectAnswer(selectedAnswer);
      }, CORRECT_ANSWER_TIMEOUT);

      // Cleanup the correctAnswerTimeout when the component unmounts
      return () => clearTimeout(correctAnswerTimeout);
    }, CHECKING_ANSWER_TIMEOUT);

    // Cleanup the checkingAnswerTimeout when the component unmounts
    return () => clearTimeout(checkingAnswerTimeout);
  };

  const getTimerDuration = () => {
    if (answer.selectedAnswer) {
      return answer.isCorrect !== ANSWER_NOT_SELECTED
        ? CORRECT_ANSWER_TIMEOUT
        : CHECKING_ANSWER_TIMEOUT;
    } else {
      return SKIP_QUESTION_TIMEOUT;
    }
  };

  const getAnswerState = () => {
    if (answer.selectedAnswer) {
      if (answer.isCorrect !== ANSWER_NOT_SELECTED) {
        return answer.isCorrect ? "correct" : "wrong";
      } else {
        return "answered";
      }
    } else {
      return "";
    }
  };
  
  const timer = getTimerDuration();

  let answerState = getAnswerState();

  return (
    <div className={style.question}>
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>
        <span>{questionIndex + 1}. </span>
        <span>{QUESTIONS[questionIndex]?.text}</span>
      </h2>
      <Answers
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}

Question.propTypes = {
  questionIndex: PropTypes.number,
  onSelectAnswer: PropTypes.func,
  onSkipAnswer: PropTypes.func,
};

export default Question;
