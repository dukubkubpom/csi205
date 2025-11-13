import { useState } from "react";

import RadixCounter from "../components/RadixCounter";
import Value from "../components/Value";
import Adder from "../components/Adder";
import Timer from "../components/Timer";
import Temperatures from "../components/Temperatures";

const Components = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="container text-center mt-4">
      <h2>COMPONENTS PAGE</h2>

 
      <div className="d-flex justify-content-center align-items-start mt-4">
 
        <div className="d-flex flex-column align-items-center me-4">
          <Value name="COUNTER" value={counter} setValue={setCounter} />
          <div className="mt-3">
            <Timer />
          </div>
        </div>


        <div>
          <Adder />
        </div>
      </div>


      <div className="mt-4">
        <Temperatures />
      </div>
    </div>
  );
};

export default Components;

