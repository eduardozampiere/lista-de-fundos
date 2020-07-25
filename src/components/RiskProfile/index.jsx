import React, { useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import "./style.scss";

function RiskProfile() {
  const baseHeight = 15;
  const baseWidth = 8;
  const stepHeight = 2;
  const data = [
    { id: 1, color: "#a6ecfc" },
    { id: 2, color: "#68f1dd" },
    { id: 3, color: "#91ed6e" },
    { id: 4, color: "#b0f42a" },
    { id: 5, color: "#ddf40c" },
    { id: 6, color: "#faf00e" },
    { id: 7, color: "#ffdc00" },
    { id: 8, color: "#fb0" },
    { id: 9, color: "#f80" },
    { id: 10, color: "#ff5e00" },
    { id: 11, color: "#ff0600" },
    { id: 12, color: "#b51414" },
  ];

  const [value, setValue] = useState(1);

  function handleClick(e) {
    console.log(e.currentTarget);
    setValue(e.currentTarget.dataset.value);
  }

  return (
    <div className="risk-profile">
      <span className="risk-title">Perfil de risco de fundo</span>
      <div>
        <div className="risk-slider">
          <div class="risk-label">menor</div>
          <div className="risk-slider-container">
            <div className="risk-slider-content">
              {data.map((el, i) => (
                <div style={{}}>
                  <div
                    className="risk-bar"
                    data-value={el.id}
                    style={{
                      background: el.color,
                      width: `${baseWidth}px`,
                      marginLeft: el.id === 1 ? "0" : "4px",
                      height: `${baseHeight + stepHeight * el.id}px`,
                      marginTop: `${40 - (baseHeight + stepHeight * el.id)}px`,
                    }}
                    onClick={handleClick}
                    onMouseEnter={handleClick}
                  />
                </div>
              ))}
            </div>
            <div
              className="risk-line"
              style={{
                marginTop: "5px",
                width: `${value * baseWidth + 4 * (value - 1) + 15}px`,
              }}
            >
              <span>
                <AiFillCaretRight />
              </span>
            </div>
          </div>
          <div class="risk-label">maior</div>
        </div>
      </div>
    </div>
  );
}

export default RiskProfile;
