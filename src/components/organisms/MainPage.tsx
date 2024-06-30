import React, { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atom/Button";

const MainPage = () => {
  const h1Style: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    color: "#5A639C",
    position: "absolute",
    top: "20px",
  };

  const style: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  };

  const mainStyle: CSSProperties = {
    width: "100%",
    maxWidth: "600px",
    margin: "100px auto",
    backgroundColor: "#FFF5E1",
    borderRadius: "10px",
    height: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };
  const navigate = useNavigate();

  const navigateToStudentRegistration = () => {
    navigate("/register");
  };

  const navigateToAttendance = () => {
    navigate("/attendances");
  };

  const navigateToAttendanceCheck = () => {
    navigate("/attendancecheck");
  };

  return (
    <div style={mainStyle}>
      <h1 style={h1Style}>관리자페이지</h1>
      <div style={style}>
        <Button onClick={navigateToStudentRegistration}>학생등록</Button>
        <Button onClick={navigateToAttendance}>출결관리</Button>
        <Button onClick={navigateToAttendanceCheck}>출결확인</Button>
      </div>
    </div>
  );
};

export default MainPage;
