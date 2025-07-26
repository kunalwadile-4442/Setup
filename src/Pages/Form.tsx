import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  closeModal,
  openModal,
  hideConfirmPopup,
  showConfirmPopup,
  selectedTaskId,
  clearSelectedTaskId,
  setEditMode,
  unsetEditMode,
} from "../routes/Redux/ui/uiSlice";

import {
  addTask,
  removeTask,
  sortTasks,
  updateTask,
  setSortOrder,
} from "../routes/Redux/posterReducer/posterSlice";

import Modal from "../components/modal/Modal";
import Button from "../components/button/Button";
import InputField from "../components/InputField";
import ConfirmModalPopup from "../components/modal/ConformationPopup";
import CustomDropdown from "../components/CustomDropdown";

import { useForm, type SubmitHandler } from "react-hook-form";

interface ITask {
  title: string;
}

function Form() {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector((state) => state.ui.isModalOpen);
  const tasks = useAppSelector((state) => state.task.tasks);
  const confirmPopupOpen = useAppSelector((state) => state.ui.isConfirmPopupOpen);
  const selectTaskId = useAppSelector((state) => state.ui.selectTaskId);
  const isEditMode = useAppSelector((state) => state.ui.isEditMode);
  const sortOrder = useAppSelector((state) => state.task.sortOrder);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ITask>();

  const handleSortChange = (value: string) => {
    dispatch(setSortOrder(value));
    dispatch(sortTasks(value));
  };

  const handleDeleteClick = (taskId: string) => {
    dispatch(selectedTaskId(taskId));
    dispatch(showConfirmPopup());
  };

  const handleUpdate = (task: { id: string; title: string }) => {
    dispatch(selectedTaskId(task.id));
    setValue("title", task.title);
    dispatch(setEditMode());
    dispatch(openModal());
  };

  const handleConfirmDelete = () => {
    if (selectTaskId) {
      dispatch(removeTask(selectTaskId));
    }
    dispatch(hideConfirmPopup());
    dispatch(clearSelectedTaskId());
  };

  const onSubmit: SubmitHandler<ITask> = (data) => {
    if (isEditMode && selectTaskId) {
      dispatch(updateTask({ id: selectTaskId, title: data.title }));
    } else {
      dispatch(addTask(data.title));
    }

    reset();
    dispatch(clearSelectedTaskId());
    dispatch(unsetEditMode());
    dispatch(closeModal());
  };

  const handleAddTask = () => {
    dispatch(clearSelectedTaskId());
    dispatch(unsetEditMode());
    reset();
    dispatch(openModal());
  };

  return (
   <div className="max-w-xl mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    Task Manager
  </h1>

  <div className="flex justify-center mb-6">
    <Button
      label="Add Task"
      className="bg-primary hover:bg-primaryDark text-white text-sm font-medium px-6 py-2 rounded-md shadow"
      onClick={handleAddTask}
    />
  </div>

  {tasks.length > 0 && (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700">Your Tasks</h2>
        <CustomDropdown
          value={sortOrder}
          className="w-48"
          onChange={handleSortChange}
          options={[
            { label: "↑ Asc)", value: "asc" },
            { label: "↓ Desc)", value: "desc" },
          ]}
          placeholder="Sort Tasks"
        />
      </div>

      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center py-3"
          >
            <span className="text-gray-800 text-base font-medium truncate">
              {task.title}
            </span>
            <div className="flex space-x-2">
              <Button
                className="text-red-600 hover:text-red-800 text-sm"
                onClick={() => handleDeleteClick(task.id)}
                label="Delete"
              />
              <Button
                className="text-green-600 hover:text-green-800 text-sm"
                onClick={() => handleUpdate(task)}
                label="Update"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )}
      

      {isModalOpen && (
        <Modal
          show={isModalOpen}
          onHide={() => dispatch(closeModal())}
          title="Modal Title"
          closeButton
          onSubmit={handleSubmit(onSubmit)}
          contentClassName="w-[500px] p-5 border rounded-md"
          submitLabel={isEditMode ? "Update Task" : "Add Task"}
          cancelLabel="Cancel"
        >
          <Modal.Body className="p-4">
            <InputField
              label="Task Title"
              name="title"
              inputClassName="h-10 rounded-md"
              register={register("title", {
                required: "Task title is required",
              })}
              error={errors.title}
              placeholder="Enter task title"
              required
            />
          </Modal.Body>
        </Modal>
      )}

      <ConfirmModalPopup
        show={confirmPopupOpen}
        title="Are you sure?"
        description="Do you really want to delete this task? This action cannot be undone."
        buttonSuccess="Delete"
        buttonCancel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => dispatch(hideConfirmPopup())}
      />
    </div>
  );
}

export default Form;