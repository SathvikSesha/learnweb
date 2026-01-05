function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul>
      {tasks.map((u) => (
        <li key={u.name}>
          <input
            type="checkbox"
            checked={u.status}
            onChange={() => onToggle(u.name)}
          />
          {u.name}
          <button onClick={() => onDelete(u.name)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
