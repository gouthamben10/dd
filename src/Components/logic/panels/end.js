import React, { Component } from "react";
import Logic from "..";

import LogicSwitchComp from "./helpers/SwitchComp/LogicSwitchComp";

import SwitchComp from "../../humanoidFlowChart/ReusableComp/SwitchComp/SwitchComp";
import SwitchCompThree from "../../humanoidFlowChart/ReusableComp/SwitchCompThree/SwitchCompThree";
import SwitchCompTwo from "../../humanoidFlowChart/ReusableComp/SwitchCompTwo/SwitchCompTwo";
import Colors from "../Colors";

class End extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Loop",
    };
  }
  selectRepeat = () => {
    sessionStorage.setItem("SelectedStatus", "rep");
  };
  selectEnd = () => {
    sessionStorage.setItem("SelectedStatus", "end");
  };

  switchActionHandler = (e) => {
    let value = e.target.value;
    let isChecked = e.target.checked;

    if (isChecked) {
      sessionStorage.setItem("SelectedStatus", "end");

      this.setState({
        name: "End",
      });

      this.props.onChange("end");
    } else {
      this.setState({
        name: "Loop",
      });
      sessionStorage.setItem("SelectedStatus", "rep");
      this.props.onChange("repeat");
    }
  };

  render() {
    const { state, onChange } = this.props;

    return (
      <div
        style={{
          textAlign: "center",
          color: "black",
          width: "80%",
          height: "100%",
          marginTop: "-5%",
          position: "relative",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <LogicSwitchComp
            ComponentName="END/Loop"
            switchActionHandler={this.switchActionHandler}
          />
        </div>
        <p
          style={{
            color: "#311B92",
            fontSize: "20px",
            fontWeight: "500",
            position: "absolute",
            left: "54%",
            top: "50%",
            transform: "translate(-54%,-50%)",
          }}
        >
          {this.state.name}
        </p>
      </div>
    );
  }
}

export default End;

//var React = require('react');
// var PropTypes = React.PropTypes;

// var End = React.createClass({

//   selectRepeat:function(){
//     sessionStorage.setItem('SelectedStatus',"rep");
//   },
//   selectEnd:function(){
//     sessionStorage.setItem('SelectedStatus','end');
//   },
//   render: function() {
//     const { state, onChange } = this.props;
//     return (
//       <div style={{
//           textAlign: 'center'
//         }}>
//         <label><input type='radio' onClick={this.selectRepeat} onChange={()=>onChange('repeat')} name='logicEndPanelRadio' checked={state === 'repeat'}/> Repeat</label>&nbsp;
//         <label><input type='radio' onClick={this.selectEnd} onChange={()=>onChange('end')} name='logicEndPanelRadio' checked={state === 'end'}/> End</label>
//       </div>
//     );
//   }

// });

// module.exports = End;
