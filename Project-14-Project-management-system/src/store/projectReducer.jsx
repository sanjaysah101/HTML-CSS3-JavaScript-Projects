import { CURRENT_ACTION } from "../config";

const [ADDING, SELECTED_PROJECT, NOTHING_SELECTED] = CURRENT_ACTION;

const projectReducer = (state, { type, payload }) => {
  switch (type) {
    case "SHOW_ADD_NEW_PROJECT_COMPONENT":
      return {
        ...state,
        currentAction: ADDING,
      };

    case "SAVE_PROJECT": {
      const { projectData } = payload;
      const newProject = { ...projectData, id: crypto.randomUUID() };

      return {
        ...state,
        projects: [...state.projects, newProject],
        currentAction: SELECTED_PROJECT,
        selectedProjectId: newProject.id,
      };
    }

    case "CANCEL_ADD_PROJECT":
      return {
        ...state,
        currentAction: NOTHING_SELECTED,
      };

    case "SELECT_PROJECT":
      return {
        ...state,
        currentAction: SELECTED_PROJECT,
        selectedProjectId: payload.id,
      };

    case "DELETE_PROJECT":
      return {
        ...state,
        currentAction: NOTHING_SELECTED,
        projects: state.projects.filter(
          (project) => project.id !== state.selectedProjectId
        ),
      };

    case "ADD_TASK": {
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
    }

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== payload.id),
      };

    default:
      return state;
  }
};

export default projectReducer;
