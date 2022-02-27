import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import data from "../concept/data";
import { DropTarget } from "react-dnd";
import Card from "./DraggableSidebarCard";
import ItemTypes from "./ItemTypes";
import renderPrgImage from "../../source/programImg";
import { withRouter } from "react-router-dom";

import Sizes from "../../helpers/Sizes";
// var DropTarget from 'react-dnd').DropTarget;
import DraggingInfo from "./DraggingInfo";
import {
  smallleftComponentBar,
  leftComponentBar,
  CloseleftComponentBar,
  OpenleftComponentBar,
  backBtn,
} from "../../source/index";

const sidebarTarget = {
  drop(props, monitor) {
    DraggingInfo.isDragging = false;
    const item = monitor.getItem();

    if (DraggingInfo.draggingComponentOld) props.removeFromWorkspace(item);
    else DraggingInfo.sidebarOldOffset = 0;
  },
};

/**
 * A boolean which is turned to false which is turned true when a function
 * doesnot want to force a rerender
 * @type {Boolean}
 */
var shouldNotUpdate = false;

var scrolling = false,
  scrollingTimeoutId;

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpand: true,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shouldNotUpdate;
  }
  // componentDidUpdate(prevProps, prevState) {
  //    ReactDOM.findDOMNode(this).scrollTop = this.state.scrollTop;
  // }
  /**
   * Updates the sidebar scroll with the given offset
   * @param {number}   offset The offset to add
   * @param {Function} cb     Callback
   */
  setScroll(offset, cb) {
    offset -= DraggingInfo.sidebarOldOffset;
    this.setState(
      {
        scrollTop: this.state.scrollTop - offset,
      },
      cb
    );
  }
  /**
   * Updates the state scrollTop without triggering a state update
   */
  // onScroll() {
  //    if (scrolling) {
  //       window.clearTimeout(scrollingTimeoutId);
  //    } else scrolling = true;
  //    scrollingTimeoutId = window.setTimeout(() => {
  //       shouldNotUpdate = true;
  //       this.setState({
  //          // scrollTop: ReactDOM.findDOMNode(this).scrollTop
  //       }, () => {
  //          shouldNotUpdate = false;
  //          scrolling = false;
  //          scrollingTimeoutId = null;
  //       });
  //    }, 100);
  // }

  handleExpand = (action) => {
    switch (action) {
      case "open": {
        this.setState({
          isExpand: true,
        });
        break;
      }
      case "close": {
        this.setState({
          isExpand: false,
        });
        break;
      }
    }
  };

  randomEvent = () => {
    // console.log("clcikc");
  };

  backBtn = () => {
    this.props.history.push("/selectScreen/ExternalAccessories");
  };
  render() {
    var DD;
    //  const { isDragging, connectDragSource } = this.props;
    if (sessionStorage.getItem("SelectedComp") != null) {
      DD = JSON.parse(sessionStorage.getItem("SelectedComp"));
    } else {
      DD = this.props.selectedComponents.concept.counter;
    }
    // const { isDragging, connectDragSource } = this.props;

    return this.props.connectDropTarget(
      <div>
        <img
          className="iconBtnSize imgBackBtn"
          src={renderPrgImage("backBtn")}
          onClick={this.backBtn}
          draggable="false"
          style={{
            zIndex: "80",
            position: "absolute",
            bottom: "1%",
            left: "2.5%",
            cursor: "pointer",
          }}
        />
        {DD.length !== 0 ? (
          this.state.isExpand ? (
            <>
              <div
                className="user-select assemblySidebar"
                style={{
                  height: Sizes.mainHeight - 14,
                  overflowY: "scroll",
                  width: "211px",
                  height: "100vh",
                  backgroundImage: `url("${renderPrgImage(
                    "leftComponentBar"
                  )}")`,
                  backgroundRepeat: "no-repeat",
                  animation: "3s linear .5s colorIt",
                  marginTop: "-5px",
                }}
              >
                {/* <img style={{ height: "10%", width: "5%", margin: "2% 0 0 3%", float: "left" }} src="images/Learn/login_button_back.png" /> */}
                {/* <Link to="/concept">
                <div className="back_btn_assembly">BACK</div>
                </Link> */}

                {/* <img style={{height:"200px",width:"150px"}} src={`images/oldImages/component_`+this.props.data.type+'.png'}/> */}
                {DD.map((indComp, index) => {
                  return (
                    <div
                      key={index}
                      className="items"
                      style={{
                        position: "relative",
                        marginBottom: "10px",
                        // left: "24px",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          background: "#F5F5F5",
                          height: "23vh",
                          width: "71%",
                          borderRadius: "12px",
                          margin: "0 auto",
                        }}
                      >
                        <div
                          style={{
                            height: "21.4vh",
                            width: "94%",
                            backgroundColor: "rgba(245, 244, 244, 0.98)",
                            position: "absolute",
                            top: "5px",
                            left: "4px",
                            borderRadius: "16px 16px 16px 16px",
                          }}
                        >
                          <Card height="150" key={index} type={indComp.type} />
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* <Card /> */}
              </div>

              <div
                style={{
                  position: "absolute",
                  height: "100px",
                  width: "50px",
                  top: "50%",
                  left: "211px",
                  transform: "translateY(-50%)",
                  backgroundImage: `url("${renderPrgImage(
                    "CloseleftComponentBar"
                  )}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  zIndex: "150",
                }}
                onClick={() => {
                  this.handleExpand("close");
                }}
              ></div>
            </>
          ) : (
            <>
              <div
                style={{
                  height: Sizes.mainHeight - 14,
                  overflowY: "scroll",
                  width: "28px",
                  height: "100vh",
                  // backgroundColor: "#dfe4eb",
                  backgroundImage: `url("${renderPrgImage(
                    "smallleftComponentBar"
                  )}")`,
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  height: "100px",
                  width: "50px",
                  top: "50%",
                  left: "28px",
                  transform: "translateY(-50%)",
                  backgroundImage: `url("${renderPrgImage(
                    "OpenleftComponentBar"
                  )}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
                onClick={() => {
                  this.handleExpand("open");
                }}
              ></div>
            </>
          )
        ) : null}

        {}
      </div>
    );
  }
}

Sidebar = DropTarget(ItemTypes.COMPONENT, sidebarTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))(Sidebar);

const mapStateToProps = (state) => {
  return {
    selectedComponents: state,
  };
};

Sidebar = withRouter(connect(mapStateToProps)(Sidebar));
// Sidebar = DragSource('items', itemSource, collect)(Sidebar)
export default Sidebar;
// export default DragSource('items', itemSource, collect)(connect(mapStateToProps)(Sidebar));
