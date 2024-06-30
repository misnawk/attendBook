import React from "react";

type AttendCheckEmojiProps = {
  isCheck: number;
};

const AttendCheckEmoji = ({ isCheck }: AttendCheckEmojiProps) => {
  const getEmoji = () => {
    if (isCheck === 2) {
      return "✅";
    } else if (isCheck === 1) {
      return "⏰";
    } else if (isCheck === 3) {
      return "❌";
    } else {
      return "❓";
    }
  };

  return <div>{getEmoji()}</div>;
};

export default AttendCheckEmoji;
