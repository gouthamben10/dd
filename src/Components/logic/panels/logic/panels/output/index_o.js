

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SliderRow from './SliderRow'
import AssignRow from './AssignRow'
import FlagRow from './FlagRow'
import CountRow from './CountRow'
import SwitchesRow from './SwitchesRow'
import TextRow from './TextRow'
import IotRow from './IotRow'
import IOComponents from '../../IOComponents'
import PortValuesRangeMapping from '../../PortValuesRangeMapping'

const startStateOrder = ['bid1', 'bid2', 'bid3', 'bif1', 'bif2', 'bif3', 'bic1', 'bic2', 'bic3', 'btr', 'iot'];
var SelectOptions, SelectOptionsOrder;





class OutputPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onChange = (key, value) => {

    console.log("change===>", key, value);
    const { state, onChange } = this.props;
    state[key] = value;

    onChange(state, "hardware");//Important for Type change for hardware

  }
  hexTypeCheck = () => {

    const { state, onChange } = this.props;

    onChange(state, "hardware")

  }
  render() {
    const { state, startState, PortConnections, bottomPanelDeleteKey } = this.props;
    const componentProps = this.props.concept.componentProps

    SelectOptionsOrder = ['edt'/*, 'bpr', 'irr'*/, 'btr', 'bts'];
    // startStateOrder.forEach((name) => {
    //   // console.log("startState[name]",startState,name)
    //   if (startState[name]) {
    //     if (name != "iot") { SelectOptionsOrder.push(name); }
    //   }
    // });



    var portsConnectedArray = [];
    for (var eachConnection in PortConnections) {

      portsConnectedArray.push(eachConnection);
    }
    for (var n = 0; n < portsConnectedArray.length; n++) {
      if (portsConnectedArray[n].length == 1 && PortConnections[portsConnectedArray[n]]) {
        if (PortConnections[portsConnectedArray[n]].type !== "dual_splitter" && PortConnections[portsConnectedArray[n]].type !== "servo_extender") {
          PortConnections[portsConnectedArray[n] + "1"] = PortConnections[portsConnectedArray[n]]
          // PortConnections[portsConnectedArray[n]] = null;
          // console.log("portsConnected------------------> 12", PortConnections)

        }
      }
      else {
        if (PortConnections[portsConnectedArray[n]]) {
          if (PortConnections[portsConnectedArray[n]].type == "servo_extender") {
            // PortConnections[portsConnectedArray[n]] = null;
            // console.log("portsConnected------------------> 12", PortConnections)
          }
        }

      }
      //     console.log("portsConnected------------------> 1", PortConnections, PortConnections[portsConnectedArray[n]])
      // }
      // console.log("portsConnected------------------> 2 ", PortConnections)
    }



    Object.keys(PortConnections).forEach((port) => {
      if (PortConnections[port]) {
        if (port === 'BC' || port === 'DE') {
          port.split('').forEach((char) => {
            [1, 2, 3, 4].forEach((number) => {
              SelectOptionsOrder.push(char + number);
            })
          })
        } else if (port === 'MOTOR1') {
          SelectOptionsOrder.push('M1');
          SelectOptionsOrder.push('M2');
        } else if (port === 'MOTOR2') {
          SelectOptionsOrder.push('M3');
          SelectOptionsOrder.push('M4');
        } else SelectOptionsOrder.push(port);
      }
    })

    return (



      <div className="outertabDiv" >
        <div className="tabDiv">
          <Link className="tabActive" onClick={() => this.props.hexChange("hardware")}><div > Hardware  </div></Link>
          <Link className="tabButton" onClick={() => this.props.hexChange("wait")}><div >Wait</div></Link>
          <Link className="tabButton" onClick={() => this.props.hexChange("variable_output")}><div >Variable</div></Link>
        </div>
        <table width='70%' height='100%'>
          <tbody>


            {Object.keys(PortConnections).map((port) => {
              if (!PortConnections[port]) return null;
              // console.log(PortConnections, "Gesture")

              var type = PortConnections[port].type;
              // console.log(type, "gesture1");
              var max, min;
              if (port !== "undefined" && type !== "dual_splitter" && type !== "servo_extender") {
                var compName = type.toLowerCase();
                console.log(type, "gesture1", PortValuesRangeMapping, port, compName);

                var range = PortValuesRangeMapping[port][compName](port);
                min = range.min;
                max = range.max;
              }
              if (IOComponents[type].output) {


                // if (port === 'B' || port === 'BC' || port === "B12" || port === "C12") {
                //   if (type == "dot_matrix") {
                //     return (
                //       <TextRow name={componentProps[type].name} port={port} state={state}
                //         key={port} assign={state['assign' + port]} onChange={this.onChange} />);
                //   } else {
                //     return (
                //       <SwitchesRow name={componentProps[type].name} port={port} state={state}
                //         key={port} assign={state['assign' + port]} onChange={this.onChange} />);
                //   }
                // }
                // All only for tern+
                // else
                // console.log("fffff", this.props.concept.componentProps)
                // console.log("port !== undefined", port)
                // if (port.length == 1 && type !== "dual_splitter" && type !== "servo_extender") {
                //   return (
                //     <SliderRow name={componentProps[type].name} port={port + "1"} value={state['value' + port + "1"]}
                //       key={port + "1"} assign={state['assign' + port + "1"]} onChange={this.onChange} min={min} max={max} />)
                // }





                if (port !== "undefined" && port.length !== 1 && type !== "dual_splitter" && type !== "servo_extender") {
                  return (
                    <SliderRow name={componentProps[type].name} port={port} value={state['value' + port]}
                      key={port} assign={state['assign' + port]} onChange={this.onChange} min={min} max={max} />)
                } else return null;


              }

            })}
            {/*<SliderRow name='BEEPER' port='Beeper' value={state['valueBeeper']} assign={state['assignBeeper']} onChange={this.onChange} max={65535}/>
            {startState.bmp3 && <SliderRow name='BTMp3' port='BTMp3' value={state['valueBTMp3']} assign={state['assignBTMp3']} onChange={this.onChange} max={65535}/>}*/}

            {/*<AssignRow name={'btr'} key={'btr'} assign={state['assignbtr']} value={state['valuebtr']}
               valuenum={state['valuenumbtr']} onChange={this.onChange} SelectOptionsOrder={['edt']}/>
            <AssignRow name={'irr'} key={'irr'} assign={state['assignirr']} value={state['valueirr']}
               valuenum={state['valuenumirr']} onChange={this.onChange} SelectOptionsOrder={SelectOptionsOrder}/>*/}
            {/* {startStateOrder.map((name) => {
              if (!name.startsWith('bic')) return null;
              if (startState[name])
                return (
                  <CountRow name={name} key={name} assign={state['assignCount' + name]}
                    value={state['valueCount' + name]} valueNum={state['valueNumCount' + name]}
                    onChange={this.onChange} />
                );
              else return null;
            })} */}
            {/* {startStateOrder.map((name) => {
              if (!name.startsWith('bif')) return null;
              if (startState[name])
                return (
                  <FlagRow name={name} key={name} assign={state['assign' + name]} value={state['value' + name]}
                    onChange={this.onChange} />
                );
              else return null;
            })}
            {startStateOrder.map((name) => {
              // console.log("startStateOrder", startStateOrder, name)
              if (name.startsWith('bif')) {
                return null;
              }
              if ((name.startsWith('btr') || name.startsWith('bic')) && startState[name]) {
                return (
                  <AssignRow name={name} key={name} assign={state['assign' + name]} value={state['value' + name]}
                    valuenum={state['valuenum' + name]} onChange={this.onChange} SelectOptionsOrder={['edt']} />
                );
              }
              else if (name.startsWith('iot') && startState[name]) {




                var iotSelectOptions = ['IOT1', 'IOT2', 'IOT3', 'IOT4', 'IOT5', 'IOT6', 'IOT7', 'IOT8', 'IOT9', 'IOT10'];
                var rows_state;
                if (state.IOTROW) {
                  rows_state = state.IOTROW;
                } else {
                  rows_state = [{
                    assign: false,
                    dropdown1: 'IOT1',
                    dropdown2: 'edt',
                    valuenum: '0',
                  }];
                }

                for (let i = 0; i < iotSelectOptions.length; i++) {
                  SelectOptionsOrder.push(iotSelectOptions[i])
                }

                return (
                  <IotRow state={state} rows_state={rows_state} bottomPanelDeleteKey={bottomPanelDeleteKey}
                    onChange={this.onChange} SelectOptions={iotSelectOptions} SelectOptionsOrder={SelectOptionsOrder} />

                );
              }
              else if (name.startsWith('bid') && startState[name]) {



                return (
                  // <IotRow state={state} rows_state={rows_state} bottomPanelDeleteKey={bottomPanelDeleteKey}
                  //   onChange={this.onChange} SelectOptions={iotSelectOptions} SelectOptionsOrder={SelectOptionsOrder} />

                  <AssignRow name={name} key={name} assign={state['assign' + name]} value={state['value' + name] || 'edt'}
                    valuenum={state['valuenum' + name]} onChange={this.onChange} SelectOptionsOrder={SelectOptionsOrder} />

                );
              }
              else if (startState[name]) {
                return (
                  <AssignRow name={name} key={name} assign={state['assign' + name]} value={state['value' + name] || 'edt'}
                    valuenum={state['valuenum' + name]} onChange={this.onChange} SelectOptionsOrder={SelectOptionsOrder} />
                );
              }
              else {
                return null;
              }
            })} */}
          </tbody>
        </table >
        {/* <button onClick={this.hexTypeCheck}>OK</button> */}
      </div>
    );
  }

}


const mapStateToProps = state => {
  return state
}

// export default DragSource("data", cardSource, collect1)(Sidebar);

export default connect(mapStateToProps)(OutputPanel);

