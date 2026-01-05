import { useState } from "react";
function AddTask({ onAdd, onMsg }) {
  const [task, setTask] = useState({
    id: Date.now(),
    name: "",
    status: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name.length <= 2) {
      onMsg("Task name should have atleast 2 characters!!");
      return;
    }
    onAdd(task);
    onMsg("Task is SuccessFully Added!!");
    clearTask();
  };

  const clearTask = () => {
    setTask({
      id: Date.now(),
      name: "",
      status: false,
    });
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Enter Your task"
        />
        <button type="reset" onClick={clearTask}>
          Clear
        </button>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTask;
