import React, { CSSProperties, useEffect, useState } from "react";
import axios from "axios";
import Input from "../atom/Input";
import { useNavigate } from "react-router-dom";
import Button from "../atom/Button";
import { ClassOption } from "../organisms/AttendanceCheck";
import SelectComponent from "../atom/SelectClass";

//회원가입 폼
const RegisterForm = () => {
  const [studentNum, setStudentNum] = useState<string>(""); //학생 식별 번호를 위함. string으로 선언.

  const [classNum, setClassNum] = useState<number>(); //수업 식별 번호를 위함.

  const [classes, setClasses] = useState<ClassOption[]>([]); //classOpton타입을 받아와서 class를 클릭하면 해당 class의 식별 번호와

  const MainNav = useNavigate(); //navigate 연결을 위한 선언

  //클릭시 메인 페이지로 넘어감
  const MainNavBtn = () => {
    MainNav("/MainPage");
  };

  //class 데이터를 호출하여 불러와 화면에 출력
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get<ClassOption[]>(
          "http://localhost:3001/classes"
        );
        setClasses(response.data);
      } catch (error) {
        console.error("반 정보를 불러오는 데 실패했습니다.", error);
      }
    };
    fetchClasses();
  }, []);

  //class를 변경하면 해당 class의 식별 번호값을 받아오도록 함
  const handleClassChange = (selectedClass: number) => {
    setClassNum(selectedClass);
  };

  //db로 데이터를 등록하기 위한 버튼
  //학생 식별 번호와 수업 식별 번호를 받아와 db에 전송함.
  const handleSubmit = async () => {
    try {
      const payload = { studentNum, classNum };
      const response = await axios.post(
        "http://localhost:3001/register",
        payload
      );
      console.log(response.data);
      alert("등록 성공!");
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 실패");
    }
  };

  //스타일 선언
  const mainStyle: CSSProperties = {
    display: "flex",
    gap: "10px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const btnStyle: CSSProperties = {
    display: "flex",
    gap: "10px",
  };

  const inputStyle: CSSProperties = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
  };

  //수업 선택후 학생 이름을 입력한 뒤 submit 버튼을 클릭하면 db로 데이터가 넘어감과 동시에 학생등록이 됨.
  //classNum과 className을 받아와 드롭다운 메뉴에서 출력이 됨
  return (
    <div style={mainStyle}>
      <div style={inputStyle}>
        <SelectComponent
          options={classes.map((cls) => ({
            id: cls.classNum,
            value: cls.classNum,
            text: cls.className,
          }))}
          OptionChange={(selectedValue: string) =>
            handleClassChange(parseInt(selectedValue, 10))
          }
          defaultOption="수업 선택"
        />
        <Input
          type="text"
          placeholder="학생 이름"
          value={studentNum}
          onChange={(e) => setStudentNum(e.target.value)}
        />
      </div>
      <div style={btnStyle}>
        <Button onClick={handleSubmit}>등록</Button>
        <Button onClick={MainNavBtn}>돌아가기</Button>
      </div>
    </div>
  );
};

export default RegisterForm;
