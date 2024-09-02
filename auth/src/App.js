import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import Update from "./pages/auth/Update";
import Home from "./pages/Home";
import Student from "./pages/Student";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/student" element={<Student />} />
          <Route path="/about" element={<About />} />
          <Route path="/update/:id" element={<Update />} />

          <Route path="*" element={<h1>Error 404 Page !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
