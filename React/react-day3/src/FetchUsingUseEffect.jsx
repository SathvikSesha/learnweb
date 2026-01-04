import { useState, useEffect } from "react";

function FetchUsingUseEffect() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading) return;

    async function fetchData() {
      try {
        setError("");
        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError("Unable to fetch the data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [loading]);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div>
      <h1>User Data</h1>

      <button onClick={() => setLoading(true)} disabled={loading}>
        {loading ? "Loading..." : "Load Data"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchUsingUseEffect;
