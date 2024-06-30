import React, { useState } from "react";

import Count from "../molecules/Count";
import DateComponent from "../atom/Date";

const Attend = () => {
  const [selectedDateId, setSelectedDateId] = useState<number | null>(null);

  return (
    <div>
      <h1>출석페이지</h1>
      <DateComponent setSelectedDateId={setSelectedDateId} />
      <Count selectedDateId={selectedDateId} />
    </div>
  );
};

export default Attend;
