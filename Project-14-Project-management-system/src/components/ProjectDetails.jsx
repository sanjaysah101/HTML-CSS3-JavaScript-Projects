import { useContext } from "react";

import Tasks from "./Tasks";
import { AppContext } from "../store/AppContext";

function ProjectDetails() {
  const {
    projectState: { projects, selectedProjectId },
    onDeleteProject,
  } = useContext(AppContext);

  const { title, description, dueDate } = projects.find(
    (project) => project.id === selectedProjectId
  );

  const formattedDate = new Date(dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-1/3 mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">{title}</h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={onDeleteProject}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{description}</p>
        <Tasks />
      </header>
    </div>
  );
}

export default ProjectDetails;
