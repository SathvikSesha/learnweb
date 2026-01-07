import TaskItem from "./TaskItem";
import "../Css/DisplayTasks.css";
import { useEffect, useState } from "react";
function DisplayTasks({ tasks, onToggle, onDelete }) {
  const [msg, SetMsg] = useState("No Tasks Yet...");
  return (
    <div className="taskContainer">
      {tasks.length === 0 ? (
        <h3>{msg}</h3>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default DisplayTasks;
