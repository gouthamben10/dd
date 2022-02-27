import React from "react";
import {
  MainContainer,
  ButtonBackground,
  ButtonDiv,
  InputCheckBox,
  InputLabel,
  SwitchButton,
  CenterImg,
  ButtonRightDiv,
} from "./Port.style";
import BottomContainer from "../BottomContainer/BottomContainer";
import { useLocalStorage } from "../LocalStorage/LocalStorage";

const Port = () => {
  const [a1, setA1] = useLocalStorage("A1", false);
  const [a2, setA2] = useLocalStorage("A2", false);
  const [a, setA] = useLocalStorage("A", false);
  const [b1, setB1] = useLocalStorage("B1", false);
  const [b2, setB2] = useLocalStorage("B2", false);
  const [b, setB] = useLocalStorage("B", false);
  const [c1, setC1] = useLocalStorage("C1", false);
  const [c2, setC2] = useLocalStorage("C2", false);
  const [c, setC] = useLocalStorage("C", false);
  const [d1, setD1] = useLocalStorage("D1", false);
  const [d2, setD2] = useLocalStorage("D2", false);
  const [d, setD] = useLocalStorage("D", false);

  const onA1ValueChange = async () => {
    setA1(!a1);
    if (a1 === false && a2 === true) {
      setA(true);
    } else {
      setA(false);
    }
  };

  const onA2ValueChange = () => {
    setA2(!a2);
    if (a1 === true && a2 === false) {
      setA(true);
    } else {
      setA(false);
    }
  };
  const onAValueChange = () => {
    if (a1 === false || a2 === false) {
      setA1(true);
      setA2(true);
    } else {
      setA1(false);
      setA2(false);
    }
    setA(!a);
  };
  const onB1ValueChange = () => {
    setB1(!b1);
    if (b1 === false && b2 === true) {
      setB(true);
    } else {
      setB(false);
    }
  };
  const onB2ValueChange = () => {
    setB2(!b2);
    if (b1 === true && b2 === false) {
      setB(true);
    } else {
      setB(false);
    }
  };
  const onBValueChange = () => {
    if (b1 === false || b2 === false) {
      setB1(true);
      setB2(true);
    } else {
      setB1(false);
      setB2(false);
    }
    setB(!b);
  };
  const onC1ValueChange = () => {
    setC1(!c1);
    if (c1 === false && c2 === true) {
      setC(true);
    } else {
      setC(false);
    }
  };
  const onC2ValueChange = () => {
    setC2(!c2);
    if (c1 === true && c2 === false) {
      setC(true);
    } else {
      setC(false);
    }
  };
  const onCValueChange = () => {
    if (c1 === false || c2 === false) {
      setC1(true);
      setC2(true);
    } else {
      setC1(false);
      setC2(false);
    }
    setC(!c);
  };
  const onD1ValueChange = () => {
    setD1(!d1);
    if (d1 === false && d2 === true) {
      setD(true);
    } else {
      setD(false);
    }
  };
  const onD2ValueChange = () => {
    setD2(!d2);
    if (d1 === true && d2 === false) {
      setD(true);
    } else {
      setD(false);
    }
  };
  const onDValueChange = () => {
    if (d1 === false || d2 === false) {
      setD1(true);
      setD2(true);
    } else {
      setD1(false);
      setD2(false);
    }
    setD(!d);
  };
  return (
    <>
      <MainContainer>
        <ButtonDiv>
          <ButtonBackground>
            <InputLabel>
              A1
              <InputCheckBox
                type="checkbox"
                checked={a1}
                onChange={() => onA1ValueChange()}
              />
            </InputLabel>
            <InputLabel>
              A2
              <InputCheckBox
                type="checkbox"
                checked={a2}
                onChange={() => onA2ValueChange()}
              />
            </InputLabel>
            <SwitchButton
              type="checkbox"
              checkedIcon={false}
              uncheckedIcon={false}
              checked={a}
              onChange={() => onAValueChange()}
              height={20}
              handleDiameter={18}
            />
          </ButtonBackground>

          <ButtonBackground>
            <InputLabel>
              B1
              <InputCheckBox
                type="checkbox"
                checked={b1}
                onChange={() => onB1ValueChange()}
              />
            </InputLabel>
            <InputLabel>
              B2
              <InputCheckBox
                type="checkbox"
                checked={b2}
                onChange={() => onB2ValueChange()}
              />
            </InputLabel>
            <SwitchButton
              type="checkbox"
              checkedIcon={false}
              uncheckedIcon={false}
              checked={b}
              onChange={() => onBValueChange()}
              height={20}
              handleDiameter={18}
            />
          </ButtonBackground>
        </ButtonDiv>

        <CenterImg>
          <img
            src={process.env.PUBLIC_URL + "/images/login/illus_ace.png"}
            alt="logo"
            width="280"
          />
        </CenterImg>

        <ButtonRightDiv>
          <ButtonBackground>
            <InputLabel>
              C1
              <InputCheckBox
                type="checkbox"
                checked={c1}
                onChange={() => onC1ValueChange()}
              />
            </InputLabel>
            <InputLabel>
              C2
              <InputCheckBox
                type="checkbox"
                checked={c2}
                onChange={() => onC2ValueChange()}
              />
            </InputLabel>
            <SwitchButton
              type="checkbox"
              checkedIcon={false}
              uncheckedIcon={false}
              checked={c}
              onChange={() => onCValueChange()}
              height={20}
              handleDiameter={18}
            />
          </ButtonBackground>

          <ButtonBackground>
            <InputLabel>
              D1
              <InputCheckBox
                type="checkbox"
                checked={d1}
                onChange={() => onD1ValueChange()}
              />
            </InputLabel>
            <InputLabel>
              D2
              <InputCheckBox
                type="checkbox"
                checked={d2}
                onChange={() => onD2ValueChange()}
              />
            </InputLabel>
            <SwitchButton
              type="checkbox"
              checkedIcon={false}
              uncheckedIcon={false}
              checked={d}
              onChange={() => onDValueChange()}
              height={20}
              handleDiameter={18}
            />
          </ButtonBackground>
        </ButtonRightDiv>
      </MainContainer>
      <br />
      <BottomContainer
        to="/input-output"
        prev="/learn-mid"
        showPrevbtn="false"
      />
    </>
  );
};

export default Port;
