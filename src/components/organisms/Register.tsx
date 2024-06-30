import React, { CSSProperties } from "react";
import RegisterForm from "../molecules/RegisterForm";

const Register = () => {
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

  return (
    <div style={mainStyle}>
      <h1>학생등록</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
