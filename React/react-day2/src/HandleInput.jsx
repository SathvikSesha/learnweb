import { useState } from "react";

function HandleInput() {
  const [form, setForm] = useState({ name: "", age: "" });
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");

  const addUser = () => {
    if (form.name.trim() === "" || Number(form.age) <= 0) {
      setMsg("Please enter a valid name and age!");
      return;
    }

    setUsers((prev) => [...prev, form]);
    setForm({ name: "", age: "" });
    setMsg("");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUser();
        }}
      >
        <input
          type="text"
          placeholder="Enter name"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <input
          type="number"
          placeholder="Enter age"
          value={form.age}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, age: e.target.value }))
          }
        />

        <button type="submit">Add</button>
      </form>

      {msg && <p className="msg">{msg}</p>}

      <ul>
        {users.map((u, i) => (
          <li key={i}>
            {u.name} - {u.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HandleInput;
