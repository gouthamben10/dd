

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

var showContent='block';



class OutputPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidUpdate(){
        showContent='block'
        console.log("Start State",this.props.startState);
        Object.values(this.props.startState).map(ev=>{
            if(ev){
           console.log("IFFFFFF");
             showContent="none"
            }
        })
    }
    onChange = (key, value) => {
        const { state, onChange } = this.props;
        state[key] = value;
        onChange(state);
        onChange(state, "variable_output");//Important for Type change variable 

    }
    hexTypeCheck = () => {

        const { state, onChange } = this.props;

        onChange(state, "variable_output")

    }
    render() {
        const { state, startState, PortConnections, bottomPanelDeleteKey } = this.props;
        const componentProps = this.props.concept.componentProps
         
        SelectOptionsOrder = ['edt'/*, 'bpr', 'irr'*/, 'btr', 'bts'];
        startStateOrder.forEach((name) => {
            // console.log("startState[name]",startState,name)
            if (startState[name]) {
                if (name != "iot") { SelectOptionsOrder.push(name); }
            }
        });

      

        return (
            <div className="outertabDiv">
                <div className="tabDiv">
                    <Link className="tabButton" onClick={() => this.props.hexChange("hardware")}><div > Hardware  </div></Link>
                    <Link className="tabButton" onClick={() => this.props.hexChange("wait")}><div >Wait</div></Link>
                    <Link className="tabActive" onClick={() => this.props.hexChange("variable_output")}><div >Variable</div></Link>
                </div>

                <table width='100%' height='100%'>
                    <tbody id="mainVariable">



                   
                      <tr>
                          <td>
                              <p className="display_variable" style={{display:`${showContent}`}}>
                               Enable a variable at start block's property panel to use it here.
                              </p>
                          </td>
                      </tr>

                        {/*<SliderRow name='BEEPER' port='Beeper' value={state['valueBeeper']} assign={state['assignBeeper']} onChange={this.onChange} max={65535}/>
            {startState.bmp3 && <SliderRow name='BTMp3' port='BTMp3' value={state['valueBTMp3']} assign={state['assignBTMp3']} onChange={this.onChange} max={65535}/>}*/}

                        {/*<AssignRow name={'btr'} key={'btr'} assign={state['assignbtr']} value={state['valuebtr']}
               valuenum={state['valuenumbtr']} onChange={this.onChange} SelectOptionsOrder={['edt']}/>
            <AssignRow name={'irr'} key={'irr'} assign={state['assignirr']} value={state['valueirr']}
               valuenum={state['valuenumirr']} onChange={this.onChange} SelectOptionsOrder={SelectOptionsOrder}/>*/}
                        {startStateOrder.map((name) => {
                            if (!name.startsWith('bic')) return null;
                            if (startState[name])
                                return (
                                    <CountRow name={name} key={name} assign={state['assignCount' + name]}
                                        value={state['valueCount' + name]} valueNum={state['valueNumCount' + name]}
                                        onChange={this.onChange} />
                                );
                            else return null;
                        })}
                        {startStateOrder.map((name) => {
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
                        })}
                    </tbody>
                </table >

            </div>
        );
    }

}


const mapStateToProps = state => {
    return state
}

// export default DragSource("data", cardSource, collect1)(Sidebar);

export default connect(mapStateToProps)(OutputPanel);

