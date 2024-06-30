import React, { CSSProperties } from "react";
import AttendStudentContent, {
  AttendStudentContentProps,
} from "./AttendStudentContent";
import AttendBox from "./attendBox";
import AttendCheck from "./AttendCheck";

type AttendConnectProps = {
  students: AttendStudentContentProps[];
  onStatusChange: (index: number, status: number) => void; // status를 number로 변경
};

const AttendConnect = ({ students, onStatusChange }: AttendConnectProps) => {
  console.log("AttendConnect component rendered with students:", students);
  const studentListStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  };

  return (
    <div style={studentListStyle}>
      <AttendBox />
      <AttendCheck students={students} onStatusChange={onStatusChange} />
    </div>
  );
};

export default AttendConnect;
