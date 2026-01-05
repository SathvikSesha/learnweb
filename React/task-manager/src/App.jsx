import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskHome from "./TaskHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
