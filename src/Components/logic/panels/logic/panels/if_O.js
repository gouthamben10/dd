import React, { Component } from 'react'
import HexTypes from '../HexTypes'
import Select from './helpers/Select'
import Slider from './helpers/Slider'
// import componentProps from '../../../componentProps'
import IOComponents from '../IOComponents'
import logicVariables from '../logicVariables'
import PortValuesRangeMapping from '../PortValuesRangeMapping'
import PortConnections from '../../Assembly/PortConnections'
import { Link } from 'react-router-dom'



// var componentType = localStorage.getItem("biboxTypes");
// setInterval(() => {
//     componentType = localStorage.getItem("biboxTypes");
// } 100);
const hours = {
    "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
    "11": 11, "12": 12, "13": 13, "14": 14, "15": 15, "16": 16, "17": 17, "18": 18, "19": 19, "20": 20,
    "21": 21, "22": 22, "23": 23
};
const minutes = {
    "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
    "11": 11, "12": 12, "13": 13, "14": 14, "15": 15, "16": 16, "17": 17, "18": 18, "19": 19, "20": 20,
    "21": 21, "22": 22, "23": 23, "24": 24, "25": 25, "26": 26, "27": 27, "28": 28, "29": 29, "30": 30,
    "31": 31, "32": 32, "33": 33, "34": 34, "35": 35, "36": 36, "37": 37, "38": 38, "39": 39, "40": 40,
    "41": 41, "42": 42, "43": 43, "44": 44, "45": 45, "46": 46, "47": 47, "48": 48, "49": 49, "50": 50,
    "51": 51, "52": 52, "53": 53, "54": 54, "55": 55, "56": 56, "57": 57, "58": 58, "59": 59
};

class IfPanel extends Component {
    constructor(props) {
        super(props);
        const { state, onChange } = this.props;
        if (Object.keys(state).length <= 0) {
            state['source'] = 'battery';
            state['value'] = 0;
            state['value2'] = 0;
            state['hour'] = 0;
            state['hour2'] = 0;
            state['minute'] = 0;
            state['minute2'] = 0;
        }
        onChange(state, "sensor");


        this.state = state
    }

    hexTypeCheck = () => {
        this.props.hexTypeCheck("sensor")
    }

    onChange(key, value) {
        const { state, onChange } = this.props;
        state[key] = value;
        if (key == 'source') {
            state['condition'] = 'gt';
        }

        onChange(state, "sensor");

    }
    render() {
        const { state, startState, PortConnections, componentProps } = this.props;
        console.log("state------------------> state", state)


        var portsConnectedArray = [];
        for (var eachConnection in PortConnections) {
            portsConnectedArray.push(eachConnection);
        }



        for (var n = 0; n < portsConnectedArray.length; n++) {
            if (portsConnectedArray[n].length == 1 && PortConnections[portsConnectedArray[n]]) {
                if (PortConnections[portsConnectedArray[n]].type != "dual_splitter") {
                    PortConnections[portsConnectedArray[n] + "1"] = PortConnections[portsConnectedArray[n]]
                    PortConnections[portsConnectedArray[n]] = null;
                }
            }
            console.log("portsConnected------------------> 1", PortConnections, PortConnections[portsConnectedArray[n]])
        }


        var sourceOptionsOrder = [], sourceOptions = {};
        Object.keys(PortConnections).forEach((port) => {

            if (port != "undefined" && PortConnections[port]) {
                console.log("port1234=========>", port, PortConnections[port].type)

                if (!PortConnections[port]) return;
                var type = PortConnections[port].type;
                if (type == "4_in_1_sensor") {
                    var positionPorts = ['Red', 'Green', 'Blue', 'Dist', 'Light', 'Motion'];
                    for (var i = 0; i < positionPorts.length; i++) {
                        sourceOptionsOrder.push(positionPorts[i]);
                        sourceOptions[positionPorts[i]] = componentProps[type].name + ' \u2192 ' + positionPorts[i];
                    }
                }
                else {
                    if (IOComponents[type].input) {
                        sourceOptionsOrder.push(port);
                        sourceOptions[port] = componentProps[type].name + ' \u2192 ' + port;
                    }
                }


            }
        })
        //sourceOptionsOrder.push('irr');
        //sourceOptions.irr = 'IR Remote \u2192 IR';
        Object.keys(startState).forEach((name) => {
            if (!startState[name] || name === 'bmp3') return;
            // sourceOptionsOrder.push(name);
            sourceOptions[name] = logicVariables[name];
        })

        if (this.props.startState && this.props.startState.slider) {
            sourceOptions.slider = 'BT Slider';
        }

        if (this.props.startState && this.props.startState.bts) {
            sourceOptionsOrder.push('remote');
            sourceOptions.remote = 'BT Speech';
        }
        if (this.props.startState && this.props.startState.btr) {
            sourceOptionsOrder.push('remote');
            sourceOptions.remote = 'BT Remote';
        }

        sourceOptionsOrder.push('battery');
        sourceOptions.battery = 'Battery %';
        // sourceOptionsOrder.push('timeElapsed');
        // sourceOptions.timeElapsed = 'Time elapsed(sec)';
        // sourceOptionsOrder.push('time');
        // sourceOptions.time = 'Time';
        if (this.props.startState && this.props.startState.iot) {
            for (var i = 1; i <= 10; i++) {
                // sourceOptionsOrder.push('IOT' + i);
                sourceOptions['IOT' + i] = 'IOT' + i;
            }
        }
        var conditions, max, min = 0, source = state.source || 'battery';
        conditions = {
            lt: 'Less than',
            gt: 'Greater than',
            eq: 'Equal to',
            ne: 'Not equal to'
        };
        if (source != 'timeElapsed') {
            conditions['bw'] = 'In between';
            //conditions['nbw']='Not in between';
        }
        if (sourceOptionsOrder.indexOf(source) < 0) source = 'slider';
        if (source === 'irr' || source.startsWith('bic') || source.startsWith('bid') || source.startsWith('IOT')) max = 65535;
        else if (source === 'slider' || source === 'remote' || source === 'time') max = 255;
        else if (source === 'timeElapsed') max = 2147483;
        else if (source === 'battery') max = 100;
        else if (source.startsWith('bif')) max = 1;
        else {

            var componentType = localStorage.getItem('biboxTypes');

            console.log(componentType, "khushboo LOCAL STORAGE");



            var Originalport;
            var compName


            //change it to R again


            if (source == "R" || source == "G" || source == "B" || source == "D" || source == "M" || source == "L") {
                Originalport = "G1";
            }
            else Originalport = source;

            console.log("componentProps", componentProps);
            console.log("PORT CONNECTION", Originalport, source);
            if (Originalport != undefined) {
                var comp = PortConnections[Originalport].type;
                var compName = comp.toLowerCase();
                var range = PortValuesRangeMapping[Originalport][compName](Originalport);
            }
            else {
                var comp = PortConnections[source].type;
                var compName = comp.toLowerCase();
                var range = PortValuesRangeMapping[source][compName](source);

            }




            min = range.min;
            max = range.max;

            // commented for tern+
            // if (source == "D" || source == "M" || source == "L") {
            //   min = 0;
            //   max = 4;
            // }

            // if (source == "B2" || source == "B3" || source == "B4") {
            //     if (PortConnections[source]) {
            //         if (PortConnections[source].type == "tact_switch" || PortConnections[source].type == "tact_switch" || PortConnections[source].type == "tact_switch") {
            //             min = 0;
            //             max = 1;
            //         }
            //     }




            // }









        }
        if (state.value > max) state.value = max;
        var ifOutputRow1 = (
            <div style={{ height: '50px', width: '90%', marginLeft: '30px', marginTop: '20px' }}>
                <Slider value={state.value || 0} onChange={(value) => this.onChange('value', value)} max={max} min={min} />
            </div>
        ), ifOutputRow2 = '', display = 'inline-block';
        var defaultCssStyle = {
            height: '50px', width: '90%', marginLeft: '20%'
        };
        if (state.condition == 'bw' || state.condition == 'nbw') {
            ifOutputRow2 = (
                <div style={{ height: '5px', width: '90%', marginLeft: '30px' }}>
                    <Slider value={state.value2 || 0} onChange={(value) => this.onChange('value2', value)} max={max} min={min} />
                </div>
            );
        } else {
            ifOutputRow2 = '';
        }
        if (source == 'time') {
            if (state.condition == 'bw' || state.condition == 'nbw') {
                ifOutputRow2 = '';
            } else {
                display = 'none';
                defaultCssStyle = {
                    height: '50px', width: '90%', marginLeft: '40%'
                };
            }
            ifOutputRow1 = (
                <div style={defaultCssStyle}>
                    <span style={{
                        color: 'white',
                        fontWeight: 'bold'
                    }}>{"Hours"}</span>
                    <Select onChange={(value) => this.onChange('hour', value)} color={HexTypes['if'].color}
                        options={hours} selected={state.hour} />
                    <span style={{
                        color: 'white',
                        fontWeight: 'bold'
                    }}>{"Min"}</span>
                    <Select onChange={(value) => this.onChange('minute', value)} color={HexTypes['if'].color}
                        options={minutes} selected={state.minute} />


                    <span style={{
                        marginLeft: '20%',
                        color: 'white',
                        fontWeight: 'bold',
                        display: display
                    }}>{"Hours"}</span>
                    <Select style={{ display: display }} onChange={(value) => this.onChange('hour2', value)} color={HexTypes['if'].color}
                        options={hours} selected={state.hour2} />
                    <span style={{
                        color: 'white',
                        fontWeight: 'bold',
                        display: display
                    }}>{"Min"}</span>
                    <Select style={{ display: display }} onChange={(value) => this.onChange('minute2', value)} color={HexTypes['if'].color}
                        options={minutes} selected={state.minute2} />
                </div>
            );
        }

        console.log(sourceOptions, "sourceOptions");
        var defaultsourceOptions = {} = sourceOptions;


        return (
            <div className="outertabDiv">
                <div className="tabDiv">
                    <Link className="tabActive" onClick={() => this.props.hexChange("sensor")}><div>Sensor</div></Link>
                    <Link className="tabButton" onClick={() => this.props.hexChange("variable")}><div> Variable  </div></Link>
                    {/* <Link onClick={() => this.change("start")}><div >Variable</div></Link> */}
                </div>
                <table width='100%' height='100%'>

                    <tbody id="main">
                        <tr style={{ height: '72px', width: "68%" }}>
                            <td width='10%'>
                                <Select onChange={(value) => this.onChange('source', value)} color={HexTypes['if'].color}
                                    options={sourceOptions} order={sourceOptionsOrder} selected={source} />
                            </td>
                            <td width='10%'>
                                <Select onChange={(value) => this.onChange('condition', value)} color={HexTypes['if'].color}
                                    options={conditions} selected={state.condition || 'gt'} />
                            </td>
                            <td>
                                {ifOutputRow1}
                                {ifOutputRow2}
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* <button onClick={this.hexTypeCheck}>OK</button> */}

            </div>
        );

    }

}

export default IfPanel;

