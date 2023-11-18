import { useContext, useRef } from "react";

import Input from "./Input";
import Modal from "./Modal";

import { AppContext } from "../store/AppContext";

function NewProject() {
  const modalRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();

  const { onSaveProject, onCancelAddProject } = useContext(AppContext);

  const handleSave = () => {
    const enteredTitle = titleRef.current.value.trim();
    const enteredDescription = descriptionRef.current.value.trim();
    const enteredDueDate = dateRef.current.value.trim();

    if (!enteredTitle || !enteredDescription || !enteredDueDate) {
      modalRef.current.open();
      return;
    }

    onSaveProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  };

  return (
    <>
      <Modal ref={modalRef} buttonCaption={"Close"}>
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops ... looks like you forget to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      <div className="w-1/2 mt-16 lg:w-1/3">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancelAddProject}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-slate-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={titleRef} label={"Title"} />
          <Input ref={descriptionRef} label={"Description"} textarea />
          <Input type="date" ref={dateRef} label={"Due date"} />
        </div>
      </div>
    </>
  );
}

export default NewProject;
