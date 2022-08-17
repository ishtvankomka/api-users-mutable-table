import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./components/users";
import Edit from "./components/edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
