import { v4 as uuidv4 } from "uuid";

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

  const handleSaveProject = (projectData) => {
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
        id: uuidv4(),
      };

      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        currentAction: NOTHING_SELECTED,
      };
    });
  };

  const handleCancelAddProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        currentAction: NOTHING_SELECTED,
      };
    });
  };

  let mainContent;

  if (projectState.currentAction === ADDING) {
    mainContent = (
      <NewProject
        onSave={handleSaveProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectState.currentAction === NOTHING_SELECTED) {
    mainContent = (
      <NoProjectSelected onAddNewProject={handleAddNewProjectClick} />
    );
  }

  return (
    <div className="h-screen flex gap-8">
      <Sidebar
        onAddNewProject={handleAddNewProjectClick}
        projects={projectState.projects}
      />
      {mainContent}
    </div>
  );
}

export default App;
