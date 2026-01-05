import { useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./TasksList";

function App() {
  const [tasks, setTasks] = useState([]);

  function addTasks(task) {
    setTasks((prev) => [...prev, task]);
  }

  function deleteTask(name) {
    setTasks((prev) => prev.filter((t) => t.name !== name));
  }

  function toggleTask(name) {
    setTasks((prev) =>
      prev.map((t) => (t.name === name ? { ...t, status: !t.status } : t))
    );
  }

  return (
    <div>
      <AddTask onAdd={addTasks} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
