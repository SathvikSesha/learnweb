import "../Css/DisplayTasks.css";
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="Task">
      <h4>{task.name}</h4>
      <label>
        <h4 className="check"> Check for Done : </h4>
        <input
          type="checkbox"
          checked={task.status}
          onChange={() => onToggle(task.id)}
        />
      </label>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default TaskItem;
