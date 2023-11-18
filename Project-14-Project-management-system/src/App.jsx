import { useContext } from "react";

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import ProjectDetails from "./components/ProjectDetails";

import { AppContext } from "./store/AppContext";
import { CURRENT_ACTION } from "./config";

function App() {
  const { projectState } = useContext(AppContext);

  const [ADDING, SELECTED_PROJECT, NOTHING_SELECTED] = CURRENT_ACTION;

  let mainContent;

  if (projectState.currentAction === ADDING) {
    mainContent = <NewProject />;
  } else if (projectState.currentAction === NOTHING_SELECTED) {
    mainContent = <NoProjectSelected />;
  } else if (projectState.currentAction === SELECTED_PROJECT) {
    mainContent = <ProjectDetails />;
  }

  return (
    <div className="h-screen flex gap-8">
      <Sidebar />
      {mainContent}
    </div>
  );
}

export default App;
