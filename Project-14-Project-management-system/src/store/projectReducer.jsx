import { CURRENT_ACTION } from "../config";

const [ADDING, SELECTED_PROJECT, NOTHING_SELECTED] = CURRENT_ACTION;

const projectReducer = (state, action) => {
  const { type, payload } = action;

  if (type === "SHOW_ADD_NEW_PROJECT_COMPONENT") {
    return {
      ...state,
      currentAction: ADDING,
    };
  } else if (type === "SAVE_PROJECT") {
    const { projectData } = payload;

    const newProject = {
      ...projectData,
      id: crypto.randomUUID(),
    };

    return {
      ...state,
      projects: [...state.projects, newProject],
      currentAction: SELECTED_PROJECT,
      selectedProjectId: newProject.id,
    };
  } else if (type === "CANCEL_ADD_PROJECT") {
    return {
      ...state,
      currentAction: NOTHING_SELECTED,
    };
  } else if (type === "SELECT_PROJECT") {
    const { id } = payload;
    return {
      ...state,
      currentAction: SELECTED_PROJECT,
      selectedProjectId: id,
    };
  } else if (type === "DELETE_PROJECT") {
    return {
      ...state,
      currentAction: NOTHING_SELECTED,
      projects: state.projects.filter(
        (project) => project.id !== state.selectedProjectId
      ),
    };
  } else if (type === "ADD_TASK") {
    const { text } = payload;
    const newTask = {
      text,
      projectId: state.selectedProjectId,
      id: crypto.randomUUID(),
    };

    return {
      ...state,
      tasks: [newTask, ...state.tasks],
    };
  } else if (type === "DELETE_TASK") {
    const { id } = payload;
    return {
      ...state,
      tasks: state.tasks.filter((task) => task.id !== id),
    };
  } else {
    return state;
  }
};

export default projectReducer;
