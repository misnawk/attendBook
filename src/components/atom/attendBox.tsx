import { CSSProperties } from "react";

const AttendBox = () => {
  const attendBoxStyle: CSSProperties = {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    border: "1px solid black",
    gap: "400px",
  };

  const smallBoxStyle1: CSSProperties = {
    display: "flex",
    textAlign: "center",
    fontWeight: "700",
    padding: "5px 15px",
    width: "100px",
    marginRight: "40px",
  };

  const smallBoxStyle: CSSProperties = {
    display: "flex",
    textAlign: "center",
    fontWeight: "700",
    padding: "5px 15px",
    width: "100px",
  };
  return (
    <div style={attendBoxStyle}>
      <div style={smallBoxStyle}>이름</div>
      <div style={smallBoxStyle}>출석체크</div>
      <div style={smallBoxStyle1}>출결상태</div>
    </div>
  );
};

export default AttendBox;
