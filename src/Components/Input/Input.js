import React, { useState } from "react";
import { MainInputComponent } from "./Input.styles";
import SwitchButton from "../SwitchButton/SwitchButton";
import BottomContainer from "../BottomContainer/BottomContainer";
import PopupMenu from "../Popup/Popup.jsx";
import "./Input.styles.scss";
import useLocalStorage from "../LocalStorage/LocalStorage";
import Header from "../Header/Header";
function InputOutput(props) {
  const A1 = JSON.parse(sessionStorage.getItem("A1"));
  const A2 = JSON.parse(sessionStorage.getItem("A2"));
  const B1 = JSON.parse(sessionStorage.getItem("B1"));
  const B2 = JSON.parse(sessionStorage.getItem("B2"));
  const C1 = JSON.parse(sessionStorage.getItem("C1"));
  const C2 = JSON.parse(sessionStorage.getItem("C2"));
  const D1 = JSON.parse(sessionStorage.getItem("D1"));
  const D2 = JSON.parse(sessionStorage.getItem("D2"));

  const [a1Checked, setA1Checked] = useLocalStorage("a1-I/O", false);
  const [a2Checked] = useLocalStorage("a2-I/O", false);
  const [b1Checked, setB1Checked] = useLocalStorage("b1-I/O", false);
  const [b2Checked, setB2Checked] = useLocalStorage("b2-I/O", false);
  const [c1Checked] = useLocalStorage("c1-I/O", false);
  const [c2Checked] = useLocalStorage("c2-I/O", false);
  const [d1Checked, setD1Checked] = useLocalStorage("d1-I/O", false);
  const [d2Checked, setD2Checked] = useLocalStorage("d2-I/O", false);

  const [uart, setUart] = useLocalStorage("uart", false);
  const [spi, setSpi] = useLocalStorage("spi", false);
  const [i2c, setI2c] = useLocalStorage("i2c", false);

  const [showPopupUart, setShowPopupUart] = useState(false);
  const [showPopupSpi, setShowPopupSpi] = useState(false);
  const [showPopupI2c, setShowPopupI2c] = useState(false);

  const closeModalUart = () => {
    setShowPopupUart(false);
  };

  const closeModalSp1 = () => {
    setShowPopupSpi(false);
  };

  const closeModalI2c = () => {
    setShowPopupI2c(false);
  };

  const activateModalUart = () => {
    setUart(true);
    setShowPopupUart(false);
    closeModalUart();
  };

  const deactivateModalUart = () => {
    setUart(false);
    setShowPopupUart(false);
    closeModalUart();
  };

  const toggleUart = () => {
    setUart(!uart);
    setShowPopupUart(false);
  };

  const activateModalSp1 = () => {
    setSpi(true);
    setShowPopupSpi(false);
    closeModalSp1();
  };

  const deactivateModalSp1 = () => {
    setSpi(false);
    setShowPopupSpi(false);
    closeModalSp1();
  };

  const toggleSp1 = () => {
    setSpi(!spi);
    setShowPopupSpi(false);
  };

  const activateModalI2c = () => {
    setI2c(true);
    setShowPopupI2c(false);
    closeModalI2c();
  };

  const deactivateModalI2c = () => {
    setI2c(false);
    setShowPopupI2c(false);
    closeModalI2c();
  };

  const toggleI2c = () => {
    setI2c(!i2c);
    setShowPopupI2c(false);
  };

  const a1CheckedState = () => {
    setA1Checked(!a1Checked);
  };

  const b1CheckedState = () => {
    setB1Checked(!b1Checked);
  };

  const b2CheckedState = () => {
    setB2Checked(!b2Checked);
  };

  const d1CheckedState = () => {
    setD1Checked(!d1Checked);
  };

  const d2CheckedState = () => {
    setD2Checked(!d2Checked);
  };

  const onSpiCircleClick = () => {
    if (C1 && C2 && D1 && D2) {
      setShowPopupSpi(!showPopupSpi);
    }
  };

  const onUartCircleChange = () => {
    if (B1 && B2) {
      setShowPopupUart(!showPopupUart);
    }
  };

  const onI2cCircleChange = () => {
    if (D1 && D2) {
      setShowPopupI2c(!showPopupI2c);
    }
  };

  let buttonModal;
  let buttonModalSp1;
  let buttonModalI2c;
  let UART;
  let SP1;
  let I2c;

  //UART
  if (showPopupUart) {
    buttonModal = (
      <PopupMenu
        open={showPopupUart}
        close={closeModalUart}
        click={closeModalUart}
        onActivation={activateModalUart}
        onDeactivation={deactivateModalUart}
      >
        <span>
          {" "}
          Activating the UART protocol will <br /> enable the B port
        </span>
        <br />
        <br />
        <span> Continue? </span>
        <br />
      </PopupMenu>
    );
  }
  if (uart) {
    UART = (
      <div className="activatedUart">
        <span>
          {" "}
          UART protocol <br /> activated
        </span>
        <input
          type="checkbox"
          className="circle arrangecircle"
          onChange={toggleUart}
          checked={uart}
        />
        {showPopupUart ? buttonModal : null}
      </div>
    );
  } else {
    UART = (
      <div className="left-lower">
        <div className={(B1 && B2) + "text-circle I2c uart"}>
          <label className={(B1 || false) + "-span"}>
            UART
            <input
              type="checkbox"
              className="i2cinput extra-uart circle"
              disabled={!B1 && !B2}
              onChange={onUartCircleChange}
              checked={uart}
            />
            {showPopupUart ? buttonModal : null}
          </label>
        </div>
        <label className={B1 + "input upper-label-input"}>
          <span className={(B1 || false) + "-span"}>B1</span>
          <SwitchButton
            disabled={!B1}
            checked={b1Checked}
            onChange={b1CheckedState}
          />
        </label>
        <label className={B2 + "input lower-label-input input-bd"}>
          <span className={(B2 || false) + "-span"}> B2</span>
          <SwitchButton
            disabled={!B2}
            checked={b2Checked}
            onChange={b2CheckedState}
          />
        </label>
      </div>
    );
  }

  //I2C
  if (showPopupI2c) {
    buttonModalI2c = (
      <PopupMenu
        open={showPopupI2c}
        close={closeModalI2c}
        click={closeModalI2c}
        onActivation={activateModalI2c}
        onDeactivation={deactivateModalI2c}
      >
        <span>
          Activating the I2C protocol will <br /> enable the D port
        </span>
        <br />
        <br />
        <span> Continue? </span>
        <br />
      </PopupMenu>
    );
  }

  if (i2c) {
    I2c = (
      <div className="right-lower exLower">
        <span>
          {" "}
          I2C protocol <br /> activated
        </span>
        <input
          type="checkbox"
          className="circle arrangecircleI2c"
          onChange={toggleI2c}
          checked={i2c}
        />
        {showPopupI2c ? buttonModalI2c : null}
      </div>
    );
  }

  // SP1 popup
  if (showPopupSpi) {
    buttonModalSp1 = (
      <PopupMenu
        open={showPopupSpi}
        close={closeModalSp1}
        click={closeModalSp1}
        onActivation={activateModalSp1}
        onDeactivation={deactivateModalSp1}
      >
        <span>
          {" "}
          Activating the SPI protocol will <br /> enable the C and D ports{" "}
        </span>
        <br />
        <br />
        <span> Continue?</span>
        <br />
      </PopupMenu>
    );
  }
  //sp1 activated
  if (spi) {
    SP1 = (
      <div className="activatedSp1">
        <span> SPI protocol activated</span>
        <br />
        <input
          type="checkbox"
          className="circle arrangecircleSp1"
          checked={spi}
          onChange={toggleSp1}
        />
        {showPopupSpi ? buttonModalSp1 : null}
      </div>
    );
  } else {
    //sp1 code
    SP1 = (
      <>
        <div className={(C1 && C2) + "text-circle sp"}>
          <label className={((C1 && C2 && D1 && D2) || false) + "-span"}>
            SPI
          </label>
          <input
            type="checkbox"
            className={(D1 && D2) + "text-circle i2cinput circle spicircle"}
            disabled={!(D2 || D1) && !(C1 && C2)}
            onChange={onSpiCircleClick}
            checked={spi}
          />
          {showPopupSpi ? buttonModalSp1 : null}
        </div>
        <div className="right-upper">
          <label className={C1 + "input upper-label-input"}>
            <span className={(C1 || false) + "-span"}>C1</span>
            <SwitchButton
              disabled={!C1}
              checked={c1Checked}
              onChange={() => true}
              removeButton={true}
            />
          </label>
          <label className={C2 + "input lower-label-input input-bd"}>
            <span className={(C2 || false) + "-span"}> C2</span>
            <SwitchButton
              disabled={!C2}
              removeButton={true}
              checked={c2Checked}
              onChange={() => true}
            />
          </label>
        </div>

        {JSON.parse(sessionStorage.getItem("i2c")) ? (
          I2c
        ) : (
          <>
            <div className="right-lower">
              <div className={(D1 && D2) + "text-circle I2c"}>
                <label className={(D1 || false) + "-span"}>
                  I2C
                  <input
                    type="checkbox"
                    className="i2cinput circle"
                    onChange={onI2cCircleChange}
                    disabled={!D1 && !D2}
                    checked={i2c}
                  />
                  {showPopupI2c ? buttonModalI2c : null}
                </label>
              </div>
              <label className={D1 + "input upper-label-input lower"}>
                <span className={(D1 || false) + "-span"}>D1</span>
                <SwitchButton
                  disabled={!D1}
                  checked={d1Checked}
                  onChange={d1CheckedState}
                />
              </label>
              <label
                className={D2 + "input lower-label-input input-left input-D2"}
              >
                <span className={(D2 || false) + "-span"}> D2 </span>
                <SwitchButton
                  className="ADSwitch"
                  disabled={!D2}
                  checked={d2Checked}
                  onChange={d2CheckedState}
                />
              </label>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <Header prev="/" topbackbtnVisibility={props.topbackbtnVisibility} />
      <MainInputComponent>
        <div className="flex">
          <div className="input_output_left">
            <div className="left-upper">
              <label className={A1 + "input upper-label-input"}>
                <span className={(A1 || false) + "-span"}>A1</span>
                <SwitchButton
                  disabled={!A1}
                  checked={a1Checked}
                  onChange={a1CheckedState}
                />
              </label>
              <label className={A2 + "input lower-label-input input-left"}>
                <span className={(A2 || false) + "-span"}> A2 </span>
                <SwitchButton
                  disabled={!A2}
                  checked={a2Checked}
                  onChange={() => true}
                  removeButton={true}
                />
              </label>
            </div>

            {UART}
          </div>
          <div className={spi === true ? "" : "input_output_right"}>{SP1}</div>
        </div>
      </MainInputComponent>
      <br />
      <BottomContainer to="/digital-analog" prev="/" />
    </>
  );
}

export default InputOutput;
