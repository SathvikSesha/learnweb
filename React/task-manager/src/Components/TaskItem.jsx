function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="Task">
      <span>{task.name}</span>
      <input
        type="checkbox"
        checked={task.status}
        onChange={() => onToggle(task.id)}
      />
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default TaskItem;
