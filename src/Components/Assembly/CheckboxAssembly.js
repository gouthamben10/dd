import React from "react";

function CheckboxAssembly(props) {
  return (
    <div>
      <input
        id={props.value}
        type="checkbox"
        className="AssemblycheckBox"
        onChange={props.handleAssemblyCheckbox}
        value={props.value}
      />
      <div
        style={{
          display: "inline-block",
          height: "15px",
          width: "50%",
          marginLeft: "20px",
        }}
      >
        <labe className="AssemblycheckBoxLable">{props.title}</labe>
      </div>
    </div>
  );
}

export default CheckboxAssembly;
