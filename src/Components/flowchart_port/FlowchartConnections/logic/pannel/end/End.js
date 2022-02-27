import React, { Component } from "react";
import Logic from "..";
import "./end.css";

import LogicSwitchComp from "../helpers/SwitchComp/LogicSwitchComp";

// import SwitchComp from "../../../../humanoidFlowChart/ReusableComp/SwitchComp/SwitchComp";
// import SwitchCompThree from "../../../../humanoidFlowChart/ReusableComp/SwitchCompThree/SwitchCompThree";
// import SwitchCompTwo from "../../../../humanoidFlowChart/ReusableComp/SwitchCompTwo/SwitchCompTwo";
// import Colors from "../../Colors";
let count = [];
let chk = [];
for (let i = 0; i < 1000; i++) {
  count[i] = "Loop";
  chk[i] = false;
}
class End extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: count[this.props.check],
      checked: chk[this.props.check],
    };
  }
  componentWillUnmount() {
    count[this.props.check] = this.state.name;
    chk[this.props.check] = this.state.checked;
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
      // sessionStorage.setItem("SelectedStatus", "end");

      this.setState({
        name: "End",
      });
      this.setState({ checked: true });
      this.props.onChange("end");
      console.log("hi@@@@@@@@@");
      let pass = this.props.passEnd;
      console.log("@@@@@@@@#####", pass);
      this.props.handler(pass, "end");
    } else {
      this.setState({
        name: "Loop",
      });
      // sessionStorage.setItem("SelectedStatus", "rep");
      this.setState({ checked: false });
      this.props.onChange("repeat");
      let pass = this.props.passEnd;
      this.props.handler(pass, "end/repeat");
    }
  };

  render() {
    return (
      <div className="outertabDiv-end">
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          {console.log("@@@@", this.state.checked)}
          <LogicSwitchComp
            ComponentName="END/Loop"
            switchActionHandler={this.switchActionHandler}
            checked={this.state.checked}
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
