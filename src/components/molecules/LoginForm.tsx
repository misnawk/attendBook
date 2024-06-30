import React, { CSSProperties, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../atom/Input";
import Button from "../atom/Button";

//로그인 함수
const LoginForm = () => {
  const [id, setId] = useState(""); //아이디 값의 변화를 위한 선언
  const [pwd, setPwd] = useState(""); //비밀번호 값의 변화를 위한 선언
  const navigate = useNavigate(); // useNavigate 훅을 사용

  // db연동 - 로그인 판별 함수
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        id,
        pwd,
      });
      if (response.data === "로그인 성공") {
        navigate("/mainpage"); // 로그인 성공 시 '/main' 페이지로 이동
      } else {
        alert("로그인 실패 ");
      }
    } catch (error) {
      alert("로그인 실패 ");
    }
  };

  //스타일 선언
  const inputStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
  };
  const btnStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    margin: "20px",
  };

  //위에서 선언한 변수들을 이용
  //Input으로 각각 아이디, 비밀번호 받아와서 db로 전송-> 관리자로그인 하도록 함
  //button을 누르면 서버로 데이터 전송, 실패시 로그인 불가
  return (
    <div>
      <div>
        <div style={inputStyle}>
          <Input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div style={inputStyle}>
          <Input
            type="password"
            placeholder="비밀번호"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
      </div>
      <div style={btnStyle}>
        <Button onClick={handleLogin}>로그인</Button>
      </div>
    </div>
  );
};

export default LoginForm;
