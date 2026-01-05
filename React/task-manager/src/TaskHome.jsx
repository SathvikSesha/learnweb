import { useEffect, useState } from "react";
import AddTask from "./Components/AddTask";
import DisplayTasks from "./Components/DisplayTasks";
function TaskHome() {
  const [tasks, setTasks] = useState([]);
  const [msg, setMsg] = useState("");

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleState = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  useEffect(() => {
    if (!msg) return;
    let timer = setTimeout(() => {
      setMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [msg]);

  return (
    <>
      <div className="Container">
        <h1>Task Manager</h1>
        <h3>Here you can keep your daily tasks</h3>
        <AddTask onAdd={addTask} onMsg={setMsg}></AddTask>
        <DisplayTasks
          tasks={tasks}
          onToggle={toggleState}
          onDelete={deleteTask}
        ></DisplayTasks>
        <p>{msg}</p>
      </div>
    </>
  );
}
export default TaskHome;
