import React, { CSSProperties } from "react";
import { NavigateFunction } from "react-router-dom";

//버튼 props 선언
type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

//버튼 함수 선언
const Button = ({ onClick, children }: ButtonProps) => {
  const btnStyle: CSSProperties = {
    backgroundColor: "#9B86BD",
    width: "100px",
    height: "50px",
    borderRadius: "10px",
    border: "0.5px solid black",
    fontSize: "15px",
    color: "#E2BBE9",
  };

  return (
    <button style={btnStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
