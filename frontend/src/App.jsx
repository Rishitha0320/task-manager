import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskList from "./pages/TaskList";
import CreateTask from "./pages/CreateTask";
import UpdateTask from "./pages/UpdateTask";


function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/create" element={<CreateTask />} />                    
      <Route path="/update/:id" element={<UpdateTask />} />
    </Routes>
  );
}

export default App;
