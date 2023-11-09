import React from "react";
import Input from "./Input";

function NewProject() {
  return (
    <div className="w-1/2 mt-16 lg:w-1/3">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950">
            Cancel
          </button>
        </li>
        <li>
          <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-slate-950">
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input label={"Title"} />
        <Input label={"Description"} textarea />
        <Input label={"Due date"} />
      </div>
    </div>
  );
}

export default NewProject;
