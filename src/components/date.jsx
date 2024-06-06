import React, { useState } from "react";
import moment from "moment";

const DateInput = () => {
  const [value, setValue] = useState();

  const onChangeDate = (date) => {
    const newDate = moment(date.target.value).format("YYYY-MM-DD");
    setValue(newDate);
    console.log(newDate);
  };

  return <input type="date" value={value} onChange={onChangeDate} />;
};

export default DateInput;
