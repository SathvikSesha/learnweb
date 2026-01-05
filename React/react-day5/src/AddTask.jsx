import { useState } from "react";

function AddTask({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    status: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return;

    onAdd(form);

    setForm({ name: "", status: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={form.name}
        placeholder="Enter task"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTask;
