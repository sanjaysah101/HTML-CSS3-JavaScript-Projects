import { useContext } from "react";
import NewTask from "./NewTask";
import { AppContext } from "../store/AppContext";

function Tasks() {
  const {
    projectState: { tasks, selectedProjectId },
    onAddTask,
    onDeleteTask,
  } = useContext(AppContext);

  const currentProjectTasks = tasks.filter(
    (task) => task.projectId === selectedProjectId
  );

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAddTask} />
      {currentProjectTasks.length === 0 ? (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      ) : (
        ""
      )}
      {currentProjectTasks.length > 0 ? (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {currentProjectTasks.map(({ id, text }) => {
            return (
              <li key={id} className="flex justify-between my-4">
                <span>{text}</span>
                <button
                  className="text-stone-700 hover:text-red-500 "
                  onClick={() => onDeleteTask(id)}
                >
                  Clear
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}

export default Tasks;
