import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!name.trim()) return;
    login({ id: Date.now(), name });

    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
