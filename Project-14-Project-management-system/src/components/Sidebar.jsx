import Button from "./Button";

function Sidebar({ onAddNewProject }) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase text-stone-200 md:text-xl">
        Your Projects
      </h2>
      <Button onClick={onAddNewProject}>+ Add Project</Button>
    </aside>
  );
}

export default Sidebar;
