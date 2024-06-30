import React, { CSSProperties } from "react";

//출석 데이터 타입 설정
export type Attendance = {
  studentName: string;
  date: string;
  status: string;
  classNum: string;
  className: string;
};

//출석 테이블 props 설정
type AttendanceTableProps = {
  attendanceData: Attendance[];
};

//출석 테이블 출력 함수
const AttendanceTable = ({ attendanceData }: AttendanceTableProps) => {
  //스타일 설정
  const tableStyle: CSSProperties = {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  };

  const attendTableStyle: CSSProperties = {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    border: "1px solid black",
  };

  const attendContentStyle: CSSProperties = {
    border: "1px solid black",
    textAlign: "center",
    padding: "8px",
  };

  //상단 테이블 출력
  //출석 데이터를 받아와서 화면에 출력

  return (
    <table style={tableStyle}>
      <thead>
        <tr style={attendTableStyle}>
          <th style={attendContentStyle}>날짜</th>
          <th style={attendContentStyle}>반이름</th>
          <th style={attendContentStyle}>학생이름</th>
          <th style={attendContentStyle}>출결상태</th>
        </tr>
      </thead>
      <tbody>
        {attendanceData.map((record, index) => (
          <tr key={index} style={attendTableStyle}>
            <td style={attendContentStyle}>{record.date}</td>
            <td style={attendContentStyle}>{record.className}</td>
            <td style={attendContentStyle}>{record.studentName}</td>
            <td style={attendContentStyle}>{record.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
