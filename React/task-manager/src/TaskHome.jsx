import { useEffect, useState } from "react";
import AddTask from "./Components/AddTask";
import DisplayTasks from "./Components/DisplayTasks";
import "./Css/Taskhome.css";
function TaskHome() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setMsg("Task Deleted Successfully!!");
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
      <div className="container">
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
