import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <progress max={timeout} value={remainingTime} className={mode} />;
}

QuestionTimer.propTypes = {
  timeout: PropTypes.number,
  onTimeout: PropTypes.func,
  mode: PropTypes.string,
};

export default QuestionTimer;
