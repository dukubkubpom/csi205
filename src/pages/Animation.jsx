import { useState, useEffect, useRef } from "react";
import "./Animation.css";

import football from "/img/Football.png";
import basketball from "/img/Basketball.png";
import volleyball from "/img/volleyball.png";
import micky from "/img/micky.png";
import human from "/img/Human.png";

const Animation = () => {
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [selected, setSelected] = useState("none");

  const fieldWidth = 650;
  const fieldHeight = 400;
  const ballDiameter = 100;
  const maxX = fieldWidth - ballDiameter - 2;
  const maxY = fieldHeight - ballDiameter - 2;
  const vx = 5;
  const vy = 5;

  const goRight = useRef(true);
  const goDown = useRef(true);
  const intervalRef = useRef(null);

  const handleRun = () => setRunning((prev) => !prev);

  const handleSelect = (name) => {
    setSelected(name);
  };

  const calculate = () => {
    let newX = x;
    let newY = y;

    if (goRight.current) {
      newX += vx;
      if (newX >= maxX) goRight.current = false;
    } else {
      newX -= vx;
      if (newX <= 0) goRight.current = true;
    }

    if (goDown.current) {
      newY += vy;
      if (newY >= maxY) goDown.current = false;
    } else {
      newY -= vy;
      if (newY <= 0) goDown.current = true;
    }

    setX(newX);
    setY(newY);
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(calculate, 25);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, x, y]);

  const imageMap = {
    football,
    basketball,
    volleyball,
    micky,
    human,
  };

  const ballStyle = {
    left: `${x}px`,
    top: `${y}px`,
    width: `${ballDiameter}px`,
    height: `${ballDiameter}px`,
    position: "relative",
    borderRadius: "50%",
    backgroundColor: selected === "none" ? "lightblue" : "transparent",
    backgroundImage:
      selected !== "none" ? `url(${imageMap[selected]})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="anim-container">
      <div
        id="field"
        className="anim-field"
        style={{ width: fieldWidth, height: fieldHeight }}
      >
        <div id="ball" className="anim-ball" style={ballStyle}></div>
      </div>

      <div className="anim-control d-flex justify-content-between mt-3">
        <button
          id="run"
          type="button"
          className={`btn ${running ? "btn-warning" : "btn-success"}`}
          onClick={handleRun}
        >
          <i className={`bi ${running ? "bi-pause" : "bi-play"}`}></i>{" "}
          {running ? "PAUSE" : "RUN"}
        </button>

        <div>
          <button
            className={`btn ${
              selected === "none" ? "btn-secondary" : "btn-outline-secondary"
            }`}
            onClick={() => handleSelect("none")}
          >
            None
          </button>

          {["basketball", "football", "volleyball", "human", "micky"].map(
            (item) => (
              <button
                key={item}
                className={`btn ${
                  selected === item ? "btn-primary" : "btn-outline-primary"
                } ms-1`}
                onClick={() => handleSelect(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Animation;
