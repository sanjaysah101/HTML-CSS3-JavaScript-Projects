import PropTypes from "prop-types";
import { useState } from "react";

import QuestionTimer from "../QuestionTimer";
import Answers from "../Answers";

import QUESTIONS from "../../store/questions.js";
import { TIMEOUT_SECOND } from "../../services/constant.js";
function Question({ questionIndex, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = TIMEOUT_SECOND;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  const handleSelectAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[questionIndex].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = "";

  if (answer.selectedAnswer && answer.useState !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[questionIndex].text}</h2>
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
