import React, { useState, useEffect, CSSProperties } from "react";
import axios from "axios";

//date 드롭다운 - selectClass와 합칠 수 있으면 합쳐보기
type DateOption = {
  dateId: number;
  date: string;
};

type DateComponentProps = {
  setSelectedDateId: (dateId: number | null) => void;
};

const DateComponent = ({ setSelectedDateId }: DateComponentProps) => {
  const [dates, setDates] = useState<DateOption[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/dates")
      .then((response) => {
        setDates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dates:", error);
      });
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDateValue = event.target.value;
    setSelectedDate(selectedDateValue);
    const dateId =
      dates.find((dateOption) => dateOption.date === selectedDateValue)
        ?.dateId || null;
    setSelectedDateId(dateId);
  };

  const DateContainer: CSSProperties = {
    border: "1px solid #dbdbdb",
    width: "100vw",
    padding: "10px",
    fontSize: "16px",
    textAlign: "center",
  };

  const Dropdown: CSSProperties = {
    margin: "10px",
    padding: "10px",
    fontSize: "16px",
  };

  return (
    <div style={DateContainer}>
      <select style={Dropdown} value={selectedDate} onChange={handleDateChange}>
        <option value="">날짜 선택</option>
        {dates.map((dateOption) => (
          <option key={dateOption.dateId} value={dateOption.date}>
            {dateOption.date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateComponent;
