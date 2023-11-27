import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

import { CURRENT_ACTION } from "../config";
import projectReducer from "./projectReducer";

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

const [NOTHING_SELECTED] = CURRENT_ACTION;

const initialState = {
  currentAction: NOTHING_SELECTED,
  projects: [],
  tasks: [],
};

const AppProvider = ({ children }) => {
  const [projectState, projectDispatch] = useReducer(
    projectReducer,
    initialState
  );

  const appData = {
    projectState,
    onAddNewProject: () => {
      projectDispatch({ type: "SHOW_ADD_NEW_PROJECT_COMPONENT" });
    },

    onSaveProject: (projectData) => {
      projectDispatch({
        type: "SAVE_PROJECT",
        payload: {
          projectData,
        },
      });
    },

    onCancelAddProject: () => {
      projectDispatch({ type: "CANCEL_ADD_PROJECT" });
    },

    onSelectProject: (id) => {
      projectDispatch({ type: "SELECT_PROJECT", payload: { id } });
    },

    onDeleteProject: () => {
      projectDispatch({ type: "DELETE_PROJECT" });
    },

    onAddTask: (text) => {
      projectDispatch({
        type: "ADD_TASK",
        payload: {
          text,
        },
      });
    },

    onDeleteTask: (id) => {
      projectDispatch({ type: "DELETE_TASK", payload: { id } });
    },
  };

  return <AppContext.Provider value={appData}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

export { AppContext, AppProvider };
