import { createContext, useState } from "react";
import { CURRENT_ACTION } from "../config";

const AppContext = createContext({
  projectState: {},
  onAddNewProject: () => {},
  onSaveProject: () => {},
  onCancelAddProject: () => {},
  onSelectProject: () => {},
  onDeleteProject: () => {},
  onAddTask: () => {},
  onDeleteTask: () => {},
});

const AppProvider = ({ children }) => {
  const [ADDING, SELECTED_PROJECT, NOTHING_SELECTED] = CURRENT_ACTION;

  const [projectState, setProjectState] = useState({
    currentAction: NOTHING_SELECTED,
    projects: [],
    tasks: [],
  });

  const appData = {
    projectState,
    onAddNewProject: () => {
      setProjectState((prevState) => {
        return {
          ...prevState,
          currentAction: ADDING,
        };
      });
    },

    onSaveProject: (projectData) => {
      setProjectState((prevState) => {
        const newProject = {
          ...projectData,
          id: crypto.randomUUID(),
        };

        return {
          ...prevState,
          projects: [...prevState.projects, newProject],
          currentAction: SELECTED_PROJECT,
          selectedProjectId: newProject.id,
        };
      });
    },

    onCancelAddProject: () => {
      setProjectState((prevState) => {
        return {
          ...prevState,
          currentAction: NOTHING_SELECTED,
        };
      });
    },

    onSelectProject: (id) => {
      setProjectState((prevState) => {
        return {
          ...prevState,
          currentAction: SELECTED_PROJECT,
          selectedProjectId: id,
        };
      });
    },

    onDeleteProject: () => {
      setProjectState((prevState) => {
        return {
          ...prevState,
          currentAction: NOTHING_SELECTED,
          projects: prevState.projects.filter(
            (project) => project.id !== prevState.selectedProjectId
          ),
        };
      });
    },

    onAddTask: (text) => {
      setProjectState((prevState) => {
        const newTask = {
          text,
          projectId: prevState.selectedProjectId,
          id: crypto.randomUUID(),
        };

        return {
          ...prevState,
          tasks: [newTask, ...prevState.tasks],
        };
      });
    },

    onDeleteTask: (id) => {
      setProjectState((prevState) => {
        return {
          ...prevState,
          tasks: prevState.tasks.filter((task) => task.id !== id),
        };
      });
    },
  };

  return <AppContext.Provider value={appData}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
