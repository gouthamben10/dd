import React from "react";
import {
  Container,
  Main,
  LeftButton,
  RightButton,
} from "./BottomContainer.styles";
// import {Redirect} from 'react-router-dom';
import { useHistory } from "react-router-dom";

import "./BottomContainer.css";

export default function BottomContainer(props) {
  const history = useHistory();
  const back = () => {
    if (history.location.pathname === "/") {
      return null;
    } else if (history.location.pathname === "/input-output") {
      history.push("/serve-flow");
    } else if (history.location.pathname === "/digital-analog") {
      history.push("/input-output");
    } else if (history.location.pathname === "/flowchart") {
      history.push("/digital-analog");
    } else if (history.location.pathname === "/serve-flow") {
      //   history.push("/midProgramming");  chnage By SOUMITYA
      history.push("/learn-mid");
    }
  };
  return (
    <>
      {history.location.pathname === "/flowchart" ? (
        <LeftButton
          style={{ position: "fixed", bottom: "0" }}
          onClick={() => history.push(props.prev)}
        >
          Prev
        </LeftButton>
      ) : (
        <Main>
          {/* <LeftButton onClick={() => back()}>Prev</LeftButton> */}

          {props.showPrevbtn == "false" ? null : (
            <div className="PrevBtnBtnContainer" onClick={() => back()}>
              <span style={{ position: "relative", top: "5px" }}>PREV</span>
            </div>
          )}

          <Container>
            <p>Description line 1</p>
            <br />
            <p>Description line 2</p>
          </Container>
          {history.location.pathname === "/flowchart" ? null : (
            // <RightButton onClick={() => history.push(props.to)}>
            //   Next
            // </RightButton>

            <div
              className="nextBtnBtnContainer"
              onClick={() => history.push(props.to)}
            >
              <span style={{ position: "relative", top: "5px" }}>NEXT</span>
            </div>
          )}
        </Main>
      )}
    </>
  );
}
