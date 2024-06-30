import React, { CSSProperties } from "react";

// 학생 정보와 상태를 나타내는 타입 정의
export type AttendStudentContentProps = {
  studentID: number;
  studentName: string;
  className: string;
  status: number; // status를 number로 정의
};

const AttendStudentContent = ({
  studentID,
  studentName,
  className,
  status,
}: AttendStudentContentProps) => {
  const contentStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "10px",
  };

  const textStyle: CSSProperties = {
    margin: "5px 0",
  };

  return (
    <div style={contentStyle}>
      <div style={textStyle}>학생 이름: {studentName}</div>
      <div style={textStyle}>반 이름: {className}</div>
    </div>
  );
};

export default AttendStudentContent;
