import { useState, useCallback } from "react";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

function App() {
  const [switchForm, setSwitchForm] = useState(0);

  const handleSwitchForm = useCallback(
    () => setSwitchForm((prevSwitchForm) => (prevSwitchForm ? 0 : 1)),
    []
  );

  return (
    <>
      <Header />
      <main>
        <p className="switch" onClick={handleSwitchForm}>
          <span>Visit ➡️ </span>
          <span className="button">{switchForm ? "LOG IN" : "SING UP"}</span>
        </p>
        {switchForm ? <Signup /> : <Login />}
      </main>
    </>
  );
}

export default App;
