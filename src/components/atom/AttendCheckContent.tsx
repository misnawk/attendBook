import React, { CSSProperties, useState } from "react";
import AttendBtn from "./AttendBtn";
import AttendCheckEmoji from "./AttendCheckEmoji";

type AttendCheckContentProps = {
  studentID: number;
  studentName: string;
  className?: string;
  onCheck: (isCheck: number) => void;
};

const AttendCheckContent = ({
  studentID,
  studentName,
  className = "N/A",
  onCheck,
}: AttendCheckContentProps) => {
  const [checkState, setCheckState] = useState({
    isCheck: -1,
    dateContent: "",
    checkTimeContent: "",
  });

  const handleCheck = (isCheck: number) => {
    const now = new Date();
    const dateContent = now.toLocaleDateString();
    const checkTimeContent = now.toLocaleTimeString();

    setCheckState({ isCheck, dateContent, checkTimeContent });

    onCheck(isCheck);
  };

  const boxStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const CheckBoxStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
  };

  const attendBoxStyle: CSSProperties = {
    width: "200px",
    display: "flex",
    gap: "10px",
  };

  return (
    <div style={boxStyle}>
      <div style={CheckBoxStyle}>
        <div style={attendBoxStyle}>
          <AttendBtn isCheckBtn={2} onClick={handleCheck} />
          <AttendBtn isCheckBtn={1} onClick={handleCheck} />
          <AttendBtn isCheckBtn={3} onClick={handleCheck} />
        </div>
        <span>{checkState.dateContent}</span>
        <span>{checkState.checkTimeContent}</span>
      </div>
      <div style={{ width: "300px" }} />
      <div
        style={{
          width: "200px",
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <AttendCheckEmoji isCheck={checkState.isCheck} />
      </div>
    </div>
  );
};

export default AttendCheckContent;
