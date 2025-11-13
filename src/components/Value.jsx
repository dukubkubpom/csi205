import { useEffect, useState } from "react"
function Value ({name,type,init,value,setValue}) {

    //constw [value, setValue] = useState(0)
    useEffect(() =>{
        setValue(init || 0)
    },[init]
)
  return (
    <>
      <div
        className="border border-black border-2 rounded-3 mx-auto p-2 mt-3 bg-secondary-subtle"
        style={{ width: "fit-content" }}
      >
        <h1 className="text-center fw-bold text-primary">{name || 'VALUE'}</h1>
        <div className="d-flex justify-content-between align-items-center gap-2">
          <button
            className="btn btn-danger px-3"
            onClick={() => {
              setValue((p) => {
                return p - 1;
              });
            }}
          >
            &minus;
          </button>
          <span className="fs-2 fw-bold">
            {
            type === 'real' ? value.toFixed(2) : Math.round(value)
            }
          </span>
          <button
            className="btn btn-success px-3"
            onClick={() => {
              setValue((p) => {
                return p + 1;
              });
            }}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default Value;
