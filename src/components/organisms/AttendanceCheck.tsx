import React, { useState, useEffect, CSSProperties } from "react";
import axios from "axios";
import AttendanceTable, { Attendance } from "../atom/AttendanceTable";
import SelectComponent from "../atom/SelectClass";
import { useNavigate } from "react-router-dom";
import Button from "../atom/Button";

//date 선택 옵션을 위한 type
type DateOption = {
  dateId: number;
  date: string;
};

//class 선택 옵션을 위한 type
export type ClassOption = {
  classNum: number;
  className: string;
};

//출결 테이블 화면
const AttendanceCheck = () => {
  //useState 선언
  const [dates, setDates] = useState<DateOption[]>([]); //날짜 옵션 상태
  const [selectedDate, setSelectedDate] = useState<string | null>(null); //선택한 날짜 옵션 상태
  const [classes, setClasses] = useState<ClassOption[]>([]); //class 옵션 상태
  const [selectedClass, setSelectedClass] = useState<number | null>(null); //선택한 class 옵션 상태
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]); //출결 데이터 상태

  //뒤로 가기 버튼. mainpage로 연결됨
  const backNavi = useNavigate();
  const backNaviBtn = () => {
    backNavi("/MainPage");
  };

  //날짜 데이터를 가져옴
  useEffect(() => {
    const fetchDates = async () => {
      const response = await axios.get("http://localhost:3001/dates");
      setDates(response.data);
    };
    fetchDates();
  }, []);

  //class 데이터를 가져옴
  useEffect(() => {
    const fetchClasses = async () => {
      const response = await axios.get("http://localhost:3001/classes");
      setClasses(response.data);
    };
    fetchClasses();
  }, []);

  //날짜와 class가 모두 선택되었을 때 화면에 데이터가 출력되도록 함
  useEffect(() => {
    if (selectedDate && selectedClass) {
      const fetchAttendance = async () => {
        const response = await axios.get(
          `http://localhost:3001/attendancecheck?date=${selectedDate}&classNum=${selectedClass}`
        );
        setAttendanceData(response.data);
      };
      fetchAttendance();
    }
  }, [selectedDate, selectedClass]);

  //선택한 날짜 리스트 받아오기
  const dateList = (selectedValue: string) => setSelectedDate(selectedValue);
  const classList = (selectedValue: string) =>
    setSelectedClass(parseInt(selectedValue, 10));
  //스타일 선언
  const divStyle: CSSProperties = {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  };
  const h1Style: CSSProperties = {
    width: "100%",
    textAlign: "center",
  };

  return (
    <div style={divStyle}>
      <h1 style={h1Style}>출결 확인</h1>

      {/* 날짜 선택 컴포넌트 */}
      <SelectComponent
        options={dates.map((date) => ({
          id: date.dateId,
          value: date.date,
          text: date.date,
        }))}
        OptionChange={dateList}
        defaultOption="날짜 선택"
      />

      {/* 반 선택 컴포넌트 */}
      <SelectComponent
        options={classes.map((cls) => ({
          id: cls.classNum,
          value: cls.classNum.toString(),
          text: cls.className,
        }))}
        OptionChange={classList}
        defaultOption="수업 선택"
      />

      {/* 뒤로 가기 버튼 컴포넌트 */}
      <Button onClick={backNaviBtn}>돌아가기</Button>

      {/* 날짜와 반 데이터에 대한 출결 테이블 */}
      {selectedDate && selectedClass && (
        <AttendanceTable attendanceData={attendanceData} />
      )}
    </div>
  );
};

export default AttendanceCheck;
