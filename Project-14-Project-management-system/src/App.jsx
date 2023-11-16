import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import { CURRENT_ACTION } from "./config";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  const [ADDING, SELECTED_PROJECT, NOTHING_SELECTED] = CURRENT_ACTION;

  const [projectState, setProjectState] = useState({
    currentAction: NOTHING_SELECTED,
    projects: [],
    tasks: [],
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
        id: crypto.randomUUID(),
      };

      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        currentAction: SELECTED_PROJECT,
        selectedProjectId: newProject.id,
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

  const handleSelectProject = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        currentAction: SELECTED_PROJECT,
        selectedProjectId: id,
      };
    });
  };

  const handleDeleteProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        currentAction: NOTHING_SELECTED,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  };

  const handleAddTask = (text) => {
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
  };

  const handleDeleteTask = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
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
  } else if (projectState.currentAction === SELECTED_PROJECT) {
    const selectedProject = projectState.projects.find(
      (project) => project.id === projectState.selectedProjectId
    );

    mainContent = (
      <ProjectDetails
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        tasks={projectState.tasks.filter(
          (task) => task.projectId === projectState.selectedProjectId
        )}
        onDeleteTask={handleDeleteTask}
      />
    );
  }

  return (
    <div className="h-screen flex gap-8">
      <Sidebar
        onAddNewProject={handleAddNewProjectClick}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {mainContent}
    </div>
  );
}

export default App;
