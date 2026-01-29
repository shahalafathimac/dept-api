import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AddDepartment from "./Pages/AddDepartment";
import DepartmentList from "./Pages/DepartmentList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/add-department" element={<AddDepartment />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;