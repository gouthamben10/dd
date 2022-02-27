import React, { useState } from "react";
import "./VisualProgram.css";
import { Link, useHistory } from "react-router-dom";
import {
  backBtn,
  blockbased,
  Cgroupbutton,
  flowchartbasedgroupbutton,
  programmenucard,
  projectbased,
  pythoncodingbutton,
} from "../../../source/index";
import renderPrgImage from "../../../source/programImg";
import VisualPrgm from "../../ReusableComponents/PrgmSlider/VisualPrgm/VisualPrgm";
function VisualProgram() {
  const item1Styl = {
    backgroundImage: `url("${renderPrgImage("flowchartbasedgroupbutton")}")`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  };
  const item2Styl = {
    backgroundImage: `url("${renderPrgImage("projectbased")}")`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  };
  const item3Styl = {
    backgroundImage: `url("${renderPrgImage("blockbased")}")`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  };
  const item4Styl = {
    backgroundImage: `url("${renderPrgImage("Cgroupbutton")}")`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    opacity: "70%",
  };
  const item5Styl = {
    backgroundImage: `url("${renderPrgImage("pythoncodingbutton")}")`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    opacity: "70%",
  };
  const [isHelp, setHelp] = useState(false);

  const handleHelpBtn = (e) => {
    if (isHelp == true) {
      setHelp(false);
    } else {
      setHelp(true);
    }
  };
  function blockbasedbtn() {
    // window.location.assign("http://dev.bibox.in/");
    window.location.assign("http://scratch.plode.org");
  }

  const history = useHistory();
  return (
    <div className="visualProgram-container">
      <img
        src={renderPrgImage("backBtn")}
        className="iconBtnSize VP-backbtn"
        onClick={() => {
          history.push("/Selection");
        }}
      />
      {isHelp == false ? (
        <img
          className="iconBtnSize helpiconBtnSize"
          src={renderPrgImage("helpBtnInActive")}
          style={{ marginRight: "25%" }}
          onClick={handleHelpBtn}
        ></img>
      ) : (
        <div className="S_slide">
          {" "}
          <VisualPrgm />{" "}
        </div>
      )}
      {isHelp ? (
        <img
          className="helpClose"
          src={renderPrgImage("closBtn")}
          onClick={handleHelpBtn}
        ></img>
      ) : null}

      <img
        src={renderPrgImage("programmenucard")}
        className="VP-programmenucard"
      />
      <p className="VP-txt-Menu">Program</p>

      <p className="VP-txt-Heading"> Visual Programming</p>

      <hr className="VP-hr" />

      <p className="VP-txt-Heading2"> Script Programming</p>

      <hr className="VP-hr2" />
      <div>
        {/* ITEM - 1 */}

        <Link to="/flow">
          <div className="VP-flowchartbased vp-item1" style={item1Styl}>
            <div className="VP-sub1">
              <p className="VP-sub-txt">
                Flowchart <br />
                Based
              </p>
            </div>
          </div>
        </Link>

        {/* ITEM - 2 */}
        <Link to="/programSelection">
          <div className="VP-programbased vp-item2" style={item2Styl}>
            <div className="VP-sub2">
              <p className="VP-sub2-txt">
                Project <br />
                Based
              </p>
            </div>
          </div>
        </Link>

        {/* Item 3*/}
        <div
          className="VP-blockbased vp-item3"
          style={item3Styl}
          onClick={blockbasedbtn}
        >
          <div className="VP-sub3">
            <p className="VP-sub3-txt">
              Block <br />
              Based
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#8ACDEA",
          opacity: "10%",
        }}
      ></div>
      {/* Item 4 */}
      <div className="VP-CCoding vp-item4" style={item4Styl}>
        <div className="VP-sub4">
          <p className="VP-sub4-txt">
            C <br />
            Coding
          </p>
        </div>
      </div>

      {/*Item 5 */}
      <div className="VP-pythoncodingbutton vp-item5" style={item5Styl}>
        <div className="VP-sub5">
          <p className="VP-sub5-txt">
            Python <br />
            Coding
          </p>
        </div>
      </div>
    </div>
  );
}

export default VisualProgram;
