import { CSSProperties } from "react";

//드롭박스 생성

//db로부터 받아올 데이터를 위한 type 선언
type Option = {
  id: number | string; //데이터 키값
  value: number | string; //데이터 값
  text: string; //데이터 출력 내용
};

//드롭다운 메뉴를 위한 props
type SelectProps = {
  options: Option[];
  OptionChange: (selectedValue: string) => void; //선택한 값을 string으로 받아온 뒤 함수 실행
  defaultOption: "날짜 선택" | "수업 선택";
  defaultValue?: "";
};

//드롭박스 컴포넌트
const SelectComponent = ({
  options,
  OptionChange,
  defaultOption,
  defaultValue = "",
}: SelectProps) => {
  //스타일 선언
  const optionStyle: CSSProperties = {
    height: "45px",
    width: "100px",
    fontSize: "15px",
    textAlign: "center",
  };
  //event를 인식해서 해당 값으로 값 변경
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    OptionChange(e.target.value);
  };
  return (
    <select
      style={optionStyle}
      onChange={handleChange}
      defaultValue={defaultValue}
    >
      <option value="">{defaultOption}</option>
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;
