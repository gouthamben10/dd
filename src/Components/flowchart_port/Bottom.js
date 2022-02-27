import React from "react";
import { useHistory } from "react-router-dom";
import "./Bottom.css";

function Bottom(props) {
  const history = useHistory();
  return (
    <>
      {history.location.pathname === "/flowchart" ? (
        <div className="Main">
          <button
            className="LeftButton"
            onClick={() => history.push(props.prev)}
          ></button>

          <button
            className="RightButton"
            onClick={() => history.push(props.to)}
          ></button>
        </div>
      ) : (
        <div className="Main">
          <button
            className="LeftButton"
            onClick={() => history.push(props.prev)}
          ></button>
          <div
            style={{ position:"absolute",top:"95%",left:"50%",  transform: "translate(-50%, -50%)",color: "#707070", fontFamily: "Halcyon_Medium" }}
          >
            <p>{props.description}</p>
          </div>
          {history.location.pathname === "/flow/flowchart" ? null : (
            <button
              className="RightButton"
              onClick={() => history.push(props.to)}
            ></button>
          )}
        </div>
      )}
    </>
  );
}

export default Bottom;
