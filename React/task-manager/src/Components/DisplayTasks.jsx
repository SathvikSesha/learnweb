import TaskItem from "./TaskItem";

function DisplayTasks({ tasks, onToggle, onDelete }) {
  return (
    <div className="taskContainer">
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
    </div>
  );
}

export default DisplayTasks;
