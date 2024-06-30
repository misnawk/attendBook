import React, { CSSProperties } from "react";

//학생 등록 입력칸 props
type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, placeholder, value, onChange }: InputProps) => {
  const inputStyle: CSSProperties = {
    backgroundColor: "#E2BBE9",
    color: "#5A639C",
    width: "200px",
    height: "40px",
    fontSize: "20px",
  };

  return (
    <input
      style={inputStyle}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
