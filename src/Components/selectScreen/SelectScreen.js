import React, { useState } from "react";
import "./SelectScreen.css";

/*COMPONENTS -n- FILES */
import InternalAccessoriesScreen from "./InternalAccessoriesScreen/index";
import ExternalAccessoriesScreen from "./ExternalAccessoriesScreen/index";
import { createBrowserHistory } from "history";

/*ICONS IMPORTS */
import {
  saveBtnActive,
  usbOFF,
  usbON,
  saveBtnInActive,
  helpBtnActive,
  helpBtnInActive,
  bluetoothBtnActive,
  bluetoothBtnInActive,
  backBtn,
  nextBtn,
  toggle,
  externalAccessoriesBtnAtive,
  externalAccessoriesBtnInAtive,
  pcInternalSensorsActive,
  pcInternalSensorsInActive,
  selectbar,
} from "../../source/index";
import renderPrgImage from "../../source/programImg";

const history = createBrowserHistory();

function SelectScreen(props) {
  /* COUSTOME STYLE  */
  const styleToggle = {
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/Bisoft_UI/Play/PNG/piano_toggle_bg@2x.png"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
  };

  /* Hooks*/
  const [isPcInternalSensors, setPcInternalSensors] = useState(true);
  const [isExternalAccessories, setExternalAccessories] = useState(false);

  /* FUNCTIONS*/
  const handleOnOFF = (e) => {
    let elementName = e.target.alt;

    switch (elementName) {
      case "PcInternalSensors": {
        if (isPcInternalSensors) {
          setPcInternalSensors(false);
          setExternalAccessories(true);
        } else {
          setPcInternalSensors(true);
          setExternalAccessories(false);
        }
        break;
      }

      case "ExternalAccessories":
        {
          if (isExternalAccessories) {
            setExternalAccessories(false);
            setPcInternalSensors(true);
          } else {
            setExternalAccessories(true);
            setPcInternalSensors(false);
          }
        }
        break;
    }
  };

  return (
    <div className="SelectScreen-Main">
      <div className="navbarContainer">
        <div className="navbar_content">
          <div className="navbar_new isActive">Select</div>
          <div className="navbar_new">Assemble</div>
          <div className="navbar_new">Create</div>
          <div className="navbar_new">Simulate</div>
        </div>

        <img
          src={renderPrgImage("selectbar")}
          style={{ height: "100%", width: "15%" }}
        />

        <div className="navbar-Action">
          <img
            src={renderPrgImage("saveBtnActive")}
            className="iconBtnSize"
            style={{ marginRight: "25px" }}
          />

          <img
            className="iconBtnSize"
            src={renderPrgImage("helpBtnInActive")}
            style={{ marginRight: "25px" }}
          />

          <img src={renderPrgImage("usbOFF")} />
        </div>
      </div>

      {/* MID-PART */}
      <div className="SelectScreen_ToggleBtn" style={styleToggle}>
        <img
          src={
            isPcInternalSensors
              ? renderPrgImage("pcInternalSensorsActive")
              : renderPrgImage("pcInternalSensorsInActive")
          }
          alt="PcInternalSensors"
          onClick={handleOnOFF}
          className="ToggleImgExternalAccessor"
        />
        <img
          src={
            isExternalAccessories
              ? renderPrgImage("externalAccessoriesBtnAtive")
              : renderPrgImage("externalAccessoriesBtnInAtive")
          }
          alt="ExternalAccessories"
          onClick={handleOnOFF}
          className="ToggleImgInternalSensor"
        />
      </div>
      {/* <div className="SelectScreen_Container">
        TWO SREEN ExternalAccessories n PcInternalSensors
        {isExternalAccessories ? (
          <ExternalAccessoriesScreen />
        ) : (
          <InternalAccessoriesScreen />
        )}
      </div> */}

      <div className="SelectScreen-Container">
        {isExternalAccessories ? (
          <ExternalAccessoriesScreen history={history} />
        ) : (
          <InternalAccessoriesScreen />
        )}
      </div>

      {/* BOTTOM BACK,NEXT BTN and discription
      <div className="SelectScreenBottom">
        <div className="bottom-child">
          <img className="iconBtnSize imgBackBtn" src={backBtn} />
          <div className="decription">
            <p>
              Tap on the icons to select the in built Play Computer features
            </p>
          </div>
          <img className="iconBtnSize imgNextBtn" src={nextBtn} />
        </div>
      </div> */}
    </div>
  );

  // return (
  //   <div className="SelectScreen-Main">
  //     {/* NAV BAR */}
  //     <div className="navbarContainer">
  //       <div className="navbar_content">
  //         <div className="navbar_new isActive">Select</div>
  //         <div className="navbar_new">Assemble</div>
  //         <div className="navbar_new">Create</div>
  //         <div className="navbar_new">Simulate</div>
  //       </div>

  //       <div className="navbarContainer_concept"></div>

  //       <div className="navbar-Action">
  //         <img
  //           src={saveBtnActive}
  //           className="iconBtnSize"
  //           style={{ marginRight: "25px" }}
  //         />

  //         <img
  //           className="iconBtnSize"
  //           src={helpBtnInActive}
  //           style={{ marginRight: "25px" }}
  //         />

  //         <img src={bluetoothBtnActive} />
  //       </div>
  //     </div>

  //     {/* MID-PART */}

  //     <div className="SelectScreen_ToggleBtn" style={styleToggle}>
  //       <img
  //         src={
  //           isPcInternalSensors
  //             ? pcInternalSensorsActive
  //             : pcInternalSensorsInActive
  //         }
  //         alt="PcInternalSensors"
  //         onClick={handleOnOFF}
  //         className="ToggleImgInternalSensor"
  //       />

  //       <img
  //         src={
  //           isExternalAccessories
  //             ? externalAccessoriesBtnAtive
  //             : externalAccessoriesBtnInAtive
  //         }
  //         alt="ExternalAccessories"
  //         onClick={handleOnOFF}
  //         className="ToggleImgExternalAccessor"
  //       />
  //     </div>

  //     <div className="SelectScreen_Container">
  //       {/* TWO SREEN ExternalAccessories n PcInternalSensors */}
  //       {isExternalAccessories ? (
  //         <ExternalAccessoriesScreen />
  //       ) : (
  //         <InternalAccessoriesScreen />
  //       )}
  //     </div>

  //     {/* BOTTOM BACK,NEXT BTN and discription*/}
  //     {/* <div className="SelectScreenBottom">
  //       <img className="iconBtnSize V_Center" src={backBtn} />
  //       <div className="decription">
  //         <p>Tap on the icons to select the in built Play Computer features</p>
  //       </div>
  //       <img className="iconBtnSize V_Center ItemAlignCenter" src={nextBtn} />
  //     </div> */}
  //   </div>
  // );
}

export default SelectScreen;
