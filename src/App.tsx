import React, { CSSProperties } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/organisms/Login";
import MainPage from "./components/organisms/MainPage";
import Register from "./components/organisms/Register";

import AttendanceCheck from "./components/organisms/AttendanceCheck";
import Attend from "./components/organisms/Attend";

const App = () => {
  const style: CSSProperties = {
    width: "100vw",
  };
  return (
    <Router>
      <div style={style}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/attendances" element={<Attend />} />

          <Route path="/attendancecheck" element={<AttendanceCheck />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
