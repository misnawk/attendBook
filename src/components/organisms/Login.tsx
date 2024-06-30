import React, { CSSProperties } from "react";
import LoginForm from "../molecules/LoginForm";

const Login = () => {
  const style: CSSProperties = {
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
  };
  const h1Style: CSSProperties = {
    textAlign: "center",
    color: "#5A639C",
  };

  return (
    <div style={style}>
      <h1 style={h1Style}>학생 출결관리 프로그램</h1>
      <h3 style={h1Style}>관리자 로그인</h3>
      <LoginForm />
    </div>
  );
};

export default Login;
