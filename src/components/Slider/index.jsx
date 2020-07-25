import React, { useState } from "react";
import "./style.scss";
// import { Container } from './styles';

function Slider({ title, initial, formatter, values }) {
  const [value, setValue] = useState(initial);

  return (
    <div className="slider-component">
      <div className="slider-title">
        <span>{title}</span>
      </div>
      <div>
        <input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          type="range"
          min={0}
          max={values?.length - 1}
          step={1}
        />
      </div>
      <div className="slider-value">
        <b>{formatter ? formatter(values[value]) : values[value]}</b>
      </div>
    </div>
  );
}

export default Slider;
