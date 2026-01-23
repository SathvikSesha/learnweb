import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./DashBoard";
import ProtectedRoute from "./Routes/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
