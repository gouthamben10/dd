import React, { Component } from "react";
import Bottom from "./Bottom";
import { Nav } from "react-bootstrap";
import Myflowchart from "./FlowchartConnections/Myflowchart/Myflowchart";
import flowchartImg from "../../Assets/img/simulate bar@2x.png";
import secondaryImg from "../../Assets/img/save - secondary.png";
import strokeImg from "../../Assets/img/button 52x52 - stroke.png";
import connectionImg from "../../Assets/img/connection status - on.png";
import "./Navbar.css";
import "./style.css";
class FlowchartPage extends Component {
  render() {
    return (
      <div>
        <div className="HeaderContainer">
        <div
          style={{
            height: "10%",
            width: "100%",
            // border: "1px solid red",
            // background: "red",
            position: "absolute",
            userSelect: "none",
          }}
        >
  <div className="flowchart-navbarContainer navbarContainer" style={{ zIndex: "1000" }}>
            <div className="flowchart-navbar_content navbar_content">
              <div className="flowchart-navbar_new navbar_new" href="/">Select Ports</div>
              <div className="flowchart-navbar_new navbar_new" href="/input-output" eventKey="link-1">Input/Output</div>
              <div className="flowchart-navbar_new navbar_new" href="/digital-analog" eventKey="link-2">Digital/Analog</div>
              <div className="flowchart-navbar_new navbar_new isActive" href="/flowchart" eventKey="link-3">Flowchart</div>    
            </div>
            <img src={flowchartImg} style={{ height: "100%" ,width: "52%" ,position: "relative" , right : '25vw'  }} />
            <div className="flowchart-navbar-Action navbar-Action">
                  <img
                   className="flowchart-iconBtnSize iconBtnSize"
                   style={{ width: "61px", height:"61px",marginRight: "10px" }}
                  src={secondaryImg}
                  ></img>
                  <img
                     className="flowchart-iconBtnSize iconBtnSize"
                     style={{width: "61px", height:"61px", marginRight: "10px" }}
                    src={strokeImg}
                  ></img>
                  <img
                    style={{ marginRight: "0px" }}
                    src={connectionImg}
                  ></img>
            </div>
        </div>
        </div>
        </div>
        <div>
          <Myflowchart />
        </div>
        <Bottom className="flowchart" prev="/flow/digital-analog"/>
      </div>
    );
  }
}

export default FlowchartPage;
