import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import { CURRENT_ACTION } from "./config";

function App() {
  const [ADDING, SELECTED_PROJECT, NOTHING_SELECTED] = CURRENT_ACTION;

  const [projectState, setProjectState] = useState({
    currentAction: NOTHING_SELECTED,
    projects: [],
  });

  const handleAddNewProjectClick = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        currentAction: ADDING,
      };
    });
  };

  let mainContent;

  if (projectState.currentAction === ADDING) {
    mainContent = <NewProject />;
  } else if (projectState.currentAction === NOTHING_SELECTED) {
    mainContent = (
      <NoProjectSelected onAddNewProject={handleAddNewProjectClick} />
    );
  }

  return (
    <div className="h-screen flex gap-8">
      <Sidebar onAddNewProject={handleAddNewProjectClick} />
      {mainContent}
    </div>
  );
}

export default App;
