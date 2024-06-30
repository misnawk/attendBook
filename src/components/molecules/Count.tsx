import React, { useState, CSSProperties } from "react";
import axios from "axios";

import { AttendStudentContentProps } from "../atom/AttendStudentContent";
import AttendConnect from "../atom/AttendConnect";
import { useNavigate } from "react-router-dom";

const countContainerStyle: CSSProperties = {
  width: "100vw",
  border: "1px solid #dbdbdb",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  backgroundColor: "#f9f9f9",
};

const infoContainerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  padding: "0 50px",
};

const infoDivStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const infoSpanStyle: CSSProperties = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
};

const countSpanStyle: CSSProperties = {
  fontSize: "24px",
  color: "#007bff",
};

const buttonContainerStyle: CSSProperties = {
  display: "flex",
  gap: "10px",
  margin: "20px 0",
};

const buttonStyle: CSSProperties = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const lastButtonStyle: CSSProperties = {
  ...buttonStyle,
  backgroundColor: "#28a745",
};

const BackButtonStyle: CSSProperties = {
  ...buttonStyle,
  backgroundColor: "red",
};

const studentListStyle: CSSProperties = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  width: "100%",
};

type CountProps = {
  selectedDateId: number | null;
};

const Count = ({ selectedDateId }: CountProps) => {
  const [students, setStudents] = useState<AttendStudentContentProps[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [classNum, setClassNum] = useState<number | null>(null);
  const [attendanceCounts, setAttendanceCounts] = useState({
    출석: 0,
    지각: 0,
    결석: 0,
  });

  const fetchStudents = (classNum: number) => {
    setClassNum(classNum);

    setAttendanceCounts({
      출석: 0,
      지각: 0,
      결석: 0,
    });

    axios
      .get(`http://localhost:3001/students/${classNum}`)
      .then((response) => {
        console.log("count.tsx fetchStudents response:", response.data);
        const studentsData = response.data.map((student: any) => ({
          studentID: student.studentNum,
          studentName: student.studentName,
          className: student.className || "N/A",
          status: "", // 기본 상태는 아무런 선택을 안한 상태
        }));
        setStudents(studentsData);
        setSelectedTime(
          classNum === 1
            ? "오전"
            : classNum === 2
            ? "점심"
            : classNum === 3
            ? "저녁"
            : ""
        );
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  const handleStatusChange = (index: number, status: number) => {
    const updatedStudents = [...students];
    const prevStatus = updatedStudents[index].status.toString();
    updatedStudents[index].status = status;
    setStudents(updatedStudents);

    setAttendanceCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      // if (prevStatus !== -1) {
      //   newCounts[
      //     prevStatus === 2 ? "출석" : prevStatus === 1 ? "지각" : "결석"
      //   ]--;
      // }
      if (
        prevStatus !== "" &&
        newCounts[
          prevStatus === "2" ? "출석" : prevStatus === "1" ? "지각" : "결석"
        ] > 0
      ) {
        newCounts[
          prevStatus === "2" ? "출석" : prevStatus === "1" ? "지각" : "결석"
        ]--;
      }
      if (status !== -1) {
        newCounts[status === 2 ? "출석" : status === 1 ? "지각" : "결석"]++;
      }
      return newCounts;
    });
  };

  const saveAttendance = () => {
    if (selectedDateId === null || classNum === null) {
      alert("날짜와 시간을 선택해주세요.");
      return;
    }

    axios
      .post("http://localhost:3001/saveAttendance", {
        students,
        dateId: selectedDateId,
        classNum,
      })
      .then((response) => {
        console.log("Attendance saved successfully.");
        alert("출석 정보가 성공적으로 저장되었습니다.");
      })
      .catch((error) => {
        console.error("Error saving attendance:", error);
      });
  };

  const navigate = useNavigate();
  const backBtn = () => {
    navigate("/MainPage");
  };

  return (
    <div style={countContainerStyle}>
      <div style={infoContainerStyle}>
        <div style={infoDivStyle}>
          <span style={infoSpanStyle}>출석:</span>
          <span style={countSpanStyle}>{attendanceCounts.출석}</span>
        </div>
        <div style={infoDivStyle}>
          <span style={infoSpanStyle}>지각:</span>
          <span style={countSpanStyle}>{attendanceCounts.지각}</span>
        </div>
        <div style={infoDivStyle}>
          <span style={infoSpanStyle}>결석:</span>
          <span style={countSpanStyle}>{attendanceCounts.결석}</span>
        </div>
      </div>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={() => fetchStudents(1)}>
          오전
        </button>
        <button style={buttonStyle} onClick={() => fetchStudents(2)}>
          점심
        </button>
        <button style={buttonStyle} onClick={() => fetchStudents(3)}>
          저녁
        </button>
        <button style={lastButtonStyle} onClick={saveAttendance}>
          저장하기
        </button>

        <button style={BackButtonStyle} onClick={backBtn}>
          돌아가기
        </button>
      </div>
      <div style={studentListStyle}>
        {selectedTime && <h3>{selectedTime} 학생 목록</h3>}
        <AttendConnect
          students={students}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default Count;
