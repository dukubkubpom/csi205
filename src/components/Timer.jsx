import { useState, useEffect, useRef } from "react";

function Timer({ name, codename }) {
  const [second, setSecond] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const toTimerString = (s) => {
    const MINUTE_SECONDS = 60;
    const HOUR_SECONDS = 60 * MINUTE_SECONDS;
    const DAY_SECONDS = 24 * HOUR_SECONDS;

    const day = Math.floor(s / DAY_SECONDS);
    const hour = Math.floor((s % DAY_SECONDS) / HOUR_SECONDS);
    const min = Math.floor((s % HOUR_SECONDS) / MINUTE_SECONDS);
    const sec = s % MINUTE_SECONDS;

    return (
      (day > 0 ? day + "d " : "") +
      (hour > 0 ? hour + "h " : "") +
      (min > 0 ? min + "m " : "") +
      sec + "s"
    );
  };

  const handleRun = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setSecond((prev) => prev + 1);
      }, 1000);
    }
  };

  const handlePause = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setSecond(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      className="border border-black border-2 rounded-3 mx-auto p-2 mt-3 bg-secondary-subtle"
      style={{ width: "300px" }}
    >
      <h1 className="text-center fw-bold text-primary">
        {name || "TIMER"} {codename ? `[${codename}]` : ""}
      </h1>
        <input
        type="text"
        className="form-control text-end fs-4 fw-bold mt-3 mb-3 border-black border-2"
        value={toTimerString(second)}
        readOnly
        style={{ width: "280px", margin: "0 auto" }}
        />
      <div className="d-flex gap-2 justify-content-center">
        <button className="btn btn-danger" onClick={handleReset}>
          <i className="bi bi-arrow-counterclockwise"></i> Reset
        </button>
        {!running ? (
          <button className="btn btn-success" onClick={handleRun}>
            <i className="bi bi-play-fill"></i> Run
          </button>
        ) : (
          <button className="btn btn-warning" onClick={handlePause}>
            <i className="bi bi-pause-fill"></i> Pause
          </button>
        )}
      </div>
    </div>
  );
}

export default Timer;