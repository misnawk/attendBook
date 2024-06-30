import { CSSProperties } from "react";
import { connectInfoData } from "./NumberTextConnect";

type backgroundColor = "blue" | "gray" | "red" | "transparent";

type AttendBtnProps = {
  isCheckBtn: number;
  BtnBackgroundColor?: backgroundColor;
  onClick: (isCheck: number) => void;
};

const AttendBtn = ({
  isCheckBtn,
  BtnBackgroundColor = "transparent",
  onClick,
}: AttendBtnProps) => {
  //connectInfoData의 num과 isCheckBtn으로 눌린 값이 같으면 info의 checkMessage를 출력
  const foundInfo = connectInfoData.find(
    (info) => info.checkNum === isCheckBtn
  );
  const messageToShow = foundInfo ? foundInfo.checkMessage : "";

  const handleClick = () => {
    console.log(`Button clicked: ${isCheckBtn} - ${messageToShow}`);
    onClick(isCheckBtn);
  };

  const AttendBtnStyle: CSSProperties = {
    display: "flex",
    padding: "10px",
    textAlign: "center",
    backgroundColor: BtnBackgroundColor,
    cursor: "pointer",
    border: "1px solid black",
    borderRadius: "10px",
  };

  return (
    <div style={AttendBtnStyle} onClick={handleClick}>
      <span>{messageToShow}</span>
    </div>
  );
};

export default AttendBtn;
