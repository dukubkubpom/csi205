import { useState, useEffect } from "react";
import "./Calculator.css";

export default function App() {
  const [screen, setScreen] = useState("0");
  const [lastOperator, setLastOperator] = useState("0");
  const [state, setState] = useState("S0");

  // Update screen (จัดการสีปุ่ม operator)
  useEffect(() => {
    const plusBtn = document.getElementById("plus");
    const minusBtn = document.getElementById("minus");

    if (plusBtn && minusBtn) {
      plusBtn.classList.remove("cal_button_orange", "cal_button_Green");
      minusBtn.classList.remove("cal_button_orange", "cal_button_Green");

      plusBtn.classList.add(
        lastOperator === "+" ? "cal_button_orange" : "cal_button_Green"
      );
      minusBtn.classList.add(
        lastOperator === "-" ? "cal_button_orange" : "cal_button_Green"
      );
    }
  }, [lastOperator, screen]);

  const ceClicked = () => {
    setScreen("0");
    setState("S0");
    setLastOperator("0");
  };

  const equalClick = () => {
    try {
      setScreen(eval(screen).toString());
    } catch {
      setScreen("Error");
    }
    setState("S0");
    setLastOperator("0");
  };

  const operatorClick = (operator) => {
    if (state === "S0" && operator !== "-") return;

    if (state === "S1") {
      setScreen(screen + operator);
      setLastOperator(operator);
      setState("S2");
    } else if (state === "S2") {
      setScreen(screen.slice(0, -1) + operator);
      setLastOperator(operator);
    }
  };

  const numberClick = (number) => {
    if (state === "S0") {
      setScreen(number.toString());
      setState("S1");
    } else if (state === "S1") {
      if (screen.length < 15) {
        setScreen(screen + number.toString());
      }
    } else if (state === "S2") {
      setScreen(screen + number.toString());
      setState("S1");
    }
  };

  const checkKeyboard = (event) => {
    if (event.key >= "0" && event.key <= "9") {
      numberClick(event.key);
    } else if (["+", "-", "*", "/"].includes(event.key)) {
      operatorClick(event.key);
    } else if (event.key === "Enter") {
      equalClick();
    } else if (event.key === "Backspace") {
      const newScreen = screen.slice(0, -1) || "0";
      setScreen(newScreen);
      if (newScreen === "0") setState("S0");
    } else if (event.key === "Escape") {
      ceClicked();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", checkKeyboard);
    return () => document.removeEventListener("keydown", checkKeyboard);
  });

  return (
    <div>
      <div className="cal_container">
        <div id="screen" className="cal_screen">
          {screen}
        </div>
        <div>
          <button className="cal_button cal_button_Green" disabled>MC</button>
          <button className="cal_button cal_button_Green" disabled>MR</button>
          <button className="cal_button cal_button_Green" disabled>M+</button>
          <button className="cal_button cal_button_Green" disabled>M-</button>
          <button className="cal_button cal_button_red" onClick={ceClicked}>CE</button>
        </div>
        <div>
          {[7, 8, 9].map((n) => (
            <button key={n} className="cal_button cal_button_blue" onClick={() => numberClick(n)}>
              {n}
            </button>
          ))}
          <button className="cal_button cal_button_Green" disabled>÷</button>
          <button className="cal_button cal_button_Green" disabled>√</button>
        </div>
        <div>
          {[4, 5, 6].map((n) => (
            <button key={n} className="cal_button cal_button_blue" onClick={() => numberClick(n)}>
              {n}
            </button>
          ))}
          <button className="cal_button cal_button_Green" disabled>x</button>
          <button className="cal_button cal_button_Green" disabled>%</button>
        </div>
        <div>
          {[1, 2, 3].map((n) => (
            <button key={n} className="cal_button cal_button_blue" onClick={() => numberClick(n)}>
              {n}
            </button>
          ))}
          <button id="minus" className="cal_button cal_button_Green" onClick={() => operatorClick("-")}>-</button>
          <button className="cal_button cal_button_Green" disabled>1/x</button>
        </div>
        <div>
          <button className="cal_button cal_button_blue" onClick={() => numberClick(0)}>0</button>
          <button className="cal_button cal_button_blue" disabled>.</button>
          <button className="cal_button cal_button_blue" disabled>+/-</button>
          <button id="plus" className="cal_button cal_button_Green" onClick={() => operatorClick("+")}>+</button>
          <button className="cal_button cal_button_Green" onClick={equalClick}>=</button>
        </div>
      </div>
      <div className="dev">
      </div>
    </div>
  );
}