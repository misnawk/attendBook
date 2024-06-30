import React, { CSSProperties } from "react";
import AttendCheckContent from "./AttendCheckContent";
import AttendStudentContent, {
  AttendStudentContentProps,
} from "./AttendStudentContent";

type AttendCheckProps = {
  students: AttendStudentContentProps[];
  onStatusChange: (index: number, status: number) => void;
};

const AttendCheck = ({ students, onStatusChange }: AttendCheckProps) => {
  console.log("AttendCheck component rendered with students:", students);
  const attendCheckStyle: CSSProperties = {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const attendCheckBoxStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",

    border: "1px solid black",
    padding: "10px",
    alignItems: "center",
  };

  return (
    <div style={attendCheckStyle}>
      {students.map((student, index) => (
        <div key={student.studentID} style={attendCheckBoxStyle}>
          <AttendStudentContent
            studentName={student.studentName}
            studentID={student.studentID}
            className={student.className}
            status={student.status}
          />
          <AttendCheckContent
            studentID={student.studentID}
            studentName={student.studentName}
            className={student.className}
            onCheck={(isCheck) => onStatusChange(index, isCheck)}
          />
        </div>
      ))}
    </div>
  );
};

export default AttendCheck;
