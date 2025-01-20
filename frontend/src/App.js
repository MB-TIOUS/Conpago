import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/loginUser/loginUser";
import Dashboard from "./components/dashboard/dashboard";
import Albums from "./components/music/albums";
import Lyrics from "./components/music/lyrics";
import Register from "./components/registerUser/registerUser";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* all routes of the app */}
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/albums/:artist_id" element={<Albums />} />
        <Route path="/lyrics/:album_id" element={<Lyrics />} />
      </Routes>
    </Router>
  );
};

export default App;
