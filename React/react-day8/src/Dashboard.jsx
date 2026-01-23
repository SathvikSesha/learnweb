import { useAuth } from "./Context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name} 👋</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
