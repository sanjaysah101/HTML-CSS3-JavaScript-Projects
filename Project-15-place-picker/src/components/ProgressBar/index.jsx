import { useEffect, useState } from "react";
import { TIMEOUT_SECOND } from "../../Services/Constants/constants";

function Progress() {
  const [remainingTime, setRemainingTime] = useState(TIMEOUT_SECOND);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => clearInterval(interval);
  }, [remainingTime]);

  return <progress value={remainingTime} max={TIMEOUT_SECOND} />;
}

export default Progress;
