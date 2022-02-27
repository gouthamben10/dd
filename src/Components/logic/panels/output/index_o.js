import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SliderRow from "./SliderRow";
import AssignRow from "./AssignRow";
import FlagRow from "./FlagRow";
import CountRow from "./CountRow";
import SwitchesRow from "./SwitchesRow";
import TextRow from "./TextRow";
import IotRow from "./IotRow";
import IOComponents from "../../IOComponents";
import PortValuesRangeMapping from "../../PortValuesRangeMapping";

import { rangeStoreVal } from "../../../Assembly/CheckboxData";
import { Controls } from "react-flow-renderer";
import RadioBtn from "../../../ReusableComponents/RadioBtn/RadioBtn";

import { HumanoidAction, HumanoidActiveBtn } from "../../HumanoidActionData";
import LogicSwitchComp from "../helpers/SwitchComp/LogicSwitchComp";

const startStateOrder = [
  "bid1",
  "bid2",
  "bid3",
  "bif1",
  "bif2",
  "bif3",
  "bic1",
  "bic2",
  "bic3",
  "btr",
  "iot",
];
var SelectOptions, SelectOptionsOrder;
var HumanoidactionName, HumanoidactionValue;

var prevHumanoidAction = null;

var currentHumanoidAction = null;

class OutputPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // NEW UI STATE
      isClickTouchZeroOutput: false,
      isClickTouchOneOutput: false,
      isClickTouchTwoOutput: false,

      isClickSmileOne: false,
      isClickSmileTwo: false,
      isClickSmileThree: false,
      isClickSmileFour: false,
      isClickBuzzer: false,
      isClickBuzzerFrequency: false,
      isClickBuzzerTone: false,

      setportName: "",

      isClickLeftEye: false,
      isClickRightEye: false,

      isClickLeftEyeR: false,
      isClickLeftEyeG: false,
      isClickLeftEyeB: false,

      isClickRightEyeR: false,
      isClickRightEyeG: false,
      isClickRightEyeB: false,

      isClickSTMP: false,
      isClickSTMP_SWITCH: false,

      isClickSTMP_SWITCH_A1: false,
      isClickSTMP_SWITCH_A2: false,
      isClickSTMP_SWITCH_B1: false,
      isClickSTMP_SWITCH_B2: false,
      isClickSTMP_SWITCH_C1: false,
      isClickSTMP_SWITCH_C2: false,
      isClickSTMP_SWITCH_D1: false,
      isClickSTMP_SWITCH_D2: false,

      isClickRadio: "false",
      name: "asd",

      // NEW UI DATA

      curValTouchZeroOutput: 0,
      curValTouchOneOutput: 0,
      curValTouchTwoOutput: 0,

      curValSmileOne: 0,
      curValSmileTwo: 0,
      curValSmileThree: 0,
      curValSmileFour: 0,

      curValBuzzer: 0,
      curValBuzzerFrequency: 0,
      curValBuzzerTone: 0,

      curValLeftEyeR: 0,
      curValLeftEyeG: 0,
      curValLeftEyeB: 0,

      curValRightEyeR: 0,
      curValRightEyeG: 0,
      curValRightEyeB: 0,

      HumanoidactionName: null,
      HumanoidactionValue: null,
    };
  }

  componentDidMount() {
    console.log("componentDidMount CALLING5.0");
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps CALLING5.0");
    console.log("getDerivedStateFromProps");
    console.log("props", props);
    console.log("state", state);

    console.log(HumanoidActiveBtn, "HumanoidActiveBtnFILE");

    console.log(props.state, "HHAHAHAHA");

    let myObject = props.state;

    let radioChecked = "false";
    for (const property in myObject) {
      if (myObject[property] === true) {
        console.log(`${property}: ${myObject[property]}`);

        console.log(property.slice(6, property.length), "gogooo");

        radioChecked = property.slice(6, property.length).toString();
      }
    }

    console.log(radioChecked, "radioChecked");
    return {
      // New Ui Data for VALUE
      curValTouchZeroOutput: props.state.valueTouchZeroOutput,
      curValTouchOneOutput: props.state.valueTouchOneOutput,
      curValTouchTwoOutput: props.state.valueTouchTwoOutput,

      curValSmileOne: props.state.valueSmileOne,
      curValSmileTwo: props.state.valueSmileTwo,
      curValSmileThree: props.state.valueSmileThree,
      curValSmileFour: props.state.valueSmileFour,

      curValBuzzer: props.state.valueBuzzer,
      curValBuzzerFrequency: props.state.valueBuzzerFrequency,
      curValBuzzerTone: props.state.valueBuzzerTone,

      curValLeftEyeR: props.state.valueLeftEyeR,
      curValLeftEyeG: props.state.valueLeftEyeG,
      curValLeftEyeB: props.state.valueLeftEyeB,
      curValRightEyeR: props.state.valueRightEyeR,
      curValRightEyeG: props.state.valueRightEyeG,
      curValRightEyeB: props.state.valueRightEyeB,

      // New UI Data isCLick
      isClickTouchZeroOutput: props.state.assignTouchZeroOutput,
      isClickTouchOneOutput: props.state.assignTouchOneOutput,
      isClickTouchTwoOutput: props.state.assignTouchTwoOutput,

      isClickSmileOne: props.state.assignSmileOne,
      isClickSmileTwo: props.state.assignSmileTwo,
      isClickSmileThree: props.state.assignSmileThree,
      isClickSmileFour: props.state.assignSmileFour,

      isClickBuzzer: props.state.assignBuzzer,
      isClickBuzzerFrequency: props.state.assignBuzzerFrequency,
      isClickBuzzerTone: props.state.assignBuzzerTone,

      isClickLeftEye: props.state.assignLeftEye,
      isClickRightEye: props.state.assignRightEye,

      isClickLeftEyeR: props.state.assignLeftEyeR,
      isClickLeftEyeB: props.state.assignLeftEyeB,
      isClickLeftEyeG: props.state.assignLeftEyeG,

      isClickRightEyeR: props.state.assignRightEyeR,
      isClickRightEyeB: props.state.assignRightEyeB,
      isClickRightEyeG: props.state.assignRightEyeG,

      // DRIVER MOTOR
      isClickSTMP: props.state.assignSTMP,

      // HUMANOID
      isClickRadio: `${radioChecked}#true`,
    };
  }

  onChange = (key, value) => {
    console.log("ONCHANGE SLIDER CLICKED::");

    console.log("change===>", key, value); // valueA1 83

    //state = activeRef.state is coming from programTodraw file by props

    const { state, onChange } = this.props;

    console.log(this.props);

    let dataas = key.slice(key.length - 2, key.length);

    let asdasdasd =
      this.props.PortConnections[key.slice(key.length - 2, key.length)].type;

    state[key] = value;

    onChange(state, "hardware"); //Important for Type change for hardware
  };

  handleSTPM = () => {
    const { state, onChange } = this.props;

    // isPC_DRIVER_MOTOR is connected if conneted get the connectTo port;
    let isPC_DRIVER_MOTOR = JSON.parse(sessionStorage.getItem("assembly"))[
      "workspace"
    ]["components"]["pc_motor_driver"];

    // use checkboxData.js file to store the value of STPM
    if (this.state.isClickSTMP) {
      console.log("TRUE TRUE");
      this.setState({
        isClickSTMP: false,
      });

      state[`assignSTMP`] = false;

      rangeStoreVal["STPM"].isChecked = false;

      // WHEN STPM is OFF passing data as false as assign value
      if (isPC_DRIVER_MOTOR !== undefined) {
        let isConnected = isPC_DRIVER_MOTOR[0]["connectedTo"];

        if (isConnected == "B" || isConnected == "D") {
          state[`assignB1`] = false;
          state[`valueB1`] = 0;
          state[`assignB2`] = false;
          state[`valueB2`] = 0;
          state[`assignD1`] = false;
          state[`valueD1`] = 0;
          state[`assignD2`] = false;
          state[`valueD2`] = 0;
        }
        if (isConnected == "A" || isConnected == "C") {
          state[`assignA1`] = false;
          state[`valueA1`] = 0;
          state[`assignA2`] = false;
          state[`valueA2`] = 0;
          state[`assignC1`] = false;
          state[`valueC1`] = 0;
          state[`assignC2`] = false;
          state[`valueC2`] = 0;
        }
      }
    } else {
      this.setState({
        isClickSTMP: true,
      });

      state[`assignSTMP`] = true;
      rangeStoreVal["STPM"].isChecked = true;

      console.log(
        "session data 002",
        JSON.parse(sessionStorage.getItem("assembly"))["workspace"][
          "components"
        ]["pc_motor_driver"]
      );

      // SETTING INITIAL VALUE SWITCH BTN value to backend byets as 0

      if (isPC_DRIVER_MOTOR !== undefined) {
        let isConnected = isPC_DRIVER_MOTOR[0]["connectedTo"];

        if (isConnected == "B" || isConnected == "D") {
          state[`assignB1`] = true;
          state[`valueB1`] = 0;
          state[`assignB2`] = true;
          state[`valueB2`] = 0;
          state[`assignD1`] = true;
          state[`valueD1`] = 0;
          state[`assignD2`] = true;
          state[`valueD2`] = 0;
        }
        if (isConnected == "A" || isConnected == "C") {
          state[`assignA1`] = true;
          state[`valueA1`] = 0;
          state[`assignA2`] = true;
          state[`valueA2`] = 0;
          state[`assignC1`] = true;
          state[`valueC1`] = 0;
          state[`assignC2`] = true;
          state[`valueC2`] = 0;
        }
      }
    }

    console.log(rangeStoreVal, "/***********/");

    onChange(state, "hardware");
  };

  // toggel btn
  handleSTMPswitch = (e) => {
    const { state, onChange } = this.props;

    console.log(this.state.isClickSTMP);

    console.log("handleSTMPswitch", e.target.value);
    console.log("handleSTMPswitch", e.target.checked);
    console.log("props/////", this.props);

    if (this.state.isClickSTMP) {
      if (e.target.checked) {
        state[`value${e.target.value}`] = 1;
        state[`assign${e.target.value}`] = true;

        rangeStoreVal["STPM_SWITCH"][e.target.value].isChecked = true;
        rangeStoreVal["STPM_SWITCH"][e.target.value].value = 1;

        console.log("HAVE SOME DATA", rangeStoreVal.STPM_SWITCH);

        this.setState({
          isClickSTMP_SWITCH: true,
        });
      }
      if (!e.target.checked) {
        state[`value${e.target.value}`] = 0;
        state[`assign${e.target.value}`] = true;

        rangeStoreVal["STPM_SWITCH"][e.target.value].isChecked = false;
        rangeStoreVal["STPM_SWITCH"][e.target.value].value = 0;

        console.log("HAVE SOME DATA", rangeStoreVal.STPM_SWITCH);

        this.setState({
          isClickSTMP_SWITCH: false,
        });
      }
    }

    onChange(state, "hardware");
  };

  onChangehandleRadioBtn = (e) => {
    const { state, onChange } = this.props;

    console.log(e.target, "element");
    console.log(e.target.value, "radio Value");
    console.log(e.target.checked, "radio checked");

    HumanoidActiveBtn.isCheckRadioAction = `${e.target.value}#${e.target.checked}`;

    sessionStorage.setItem(
      "HumanoidActiveBtn",
      `${e.target.value}#${e.target.checked}`
    );

    let actionName = e.target.value.replace(/\s+/g, "_");
    console.log(actionName, "actionName");

    let portNumber = HumanoidAction(actionName);

    currentHumanoidAction = actionName;

    console.log("actionName: ", actionName, " actionValue: ", portNumber);

    // HumanoidactionName = actionName;
    // HumanoidactionValue = portNumber;

    // console.log(HumanoidactionName);

    // console.log(HumanoidactionValue);
    // this.setState({
    //   HumanoidactionName: actionName,
    //   HumanoidactionValue: portNumber,
    // });

    // get the data in second render

    console.log(this.state, "DATA STATEs");

    console.log(prevHumanoidAction, "prevHumanoidAction");

    // here setting previous to false
    if (
      prevHumanoidAction != null &&
      prevHumanoidAction != currentHumanoidAction
    ) {
      state[`assign${prevHumanoidAction}`] = false;
    }
    state[`assign${actionName}`] = true;

    state[`value${actionName}`] = portNumber;
    onChange(state, "hardware"); //Important for Type change for hardware

    this.setState({
      isClickRadio: `${e.target.value}#${e.target.checked}`,
    });
    prevHumanoidAction = currentHumanoidAction;
    console.log(
      "prevHumanoidAction",
      prevHumanoidAction,
      " currentHumanoidAction",
      currentHumanoidAction
    );

    // console.log(this.props.state, "DATA2..0 STATEs");

    // let myKey = Object.keys(this.props.state);
    // console.log(myKey);
  };

  // NEW UI
  // SMILE ONE , TWO, Three, Four
  onSmileOneHandle = () => {
    const { state, onChange } = this.props;

    if (this.state.isClickSmileOne) {
      this.setState({
        isClickSmileOne: false,
      });
      state[`assignSmileOne`] = false;

      rangeStoreVal["SmileOne"].isChecked = false;
    } else {
      this.setState({
        isClickSmileOne: true,
      });
      state[`assignSmileOne`] = true;
      rangeStoreVal["SmileOne"].isChecked = true;
    }

    console.log(this.state.isClickSmileOne, "SMILE ONE CLICK");
    console.log(this.state.isClickSmileOne, "SMILE ONE CLICK");

    onChange(state, "hardware");
  };
  onSmileTwoHandle = () => {
    const { state, onChange } = this.props;

    if (this.state.isClickSmileTwo) {
      this.setState({
        isClickSmileTwo: false,
      });
      state[`assignSmileTwo`] = false;

      rangeStoreVal["SmileTwo"].isChecked = false;
    } else {
      this.setState({
        isClickSmileTwo: true,
      });
      state[`assignSmileTwo`] = true;
      rangeStoreVal["SmileTwo"].isChecked = true;
    }

    console.log(this.state.isClickSmileTwo, "SMILE ONE CLICK");

    onChange(state, "hardware");
  };
  onSmileThreeHandle = () => {
    const { state, onChange } = this.props;

    if (this.state.isClickSmileThree) {
      this.setState({
        isClickSmileThree: false,
      });
      state[`assignSmileThree`] = false;

      rangeStoreVal["SmileThree"].isChecked = false;
    } else {
      this.setState({
        isClickSmileThree: true,
      });
      state[`assignSmileThree`] = true;
      rangeStoreVal["SmileThree"].isChecked = true;
    }

    console.log(this.state.isClickSmileThree, "SMILE ONE CLICK");

    onChange(state, "hardware");
  };
  onSmileFourHandle = () => {
    const { state, onChange } = this.props;

    if (this.state.isClickSmileFour) {
      this.setState({
        isClickSmileFour: false,
      });
      state[`assignSmileFour`] = false;

      rangeStoreVal["SmileFour"].isChecked = false;
    } else {
      this.setState({
        isClickSmileFour: true,
      });
      state[`assignSmileFour`] = true;
      rangeStoreVal["SmileFour"].isChecked = true;
    }

    console.log(this.state.isClickSmileFour, "SMILE ONE CLICK");

    onChange(state, "hardware");
  };

  onLeftEeyHandle = () => {
    const { state, onChange } = this.props;

    console.log("left EYE CLICK");
    if (this.state.isClickLeftEye) {
      this.setState({
        isClickLeftEye: false,
      });

      state[`assignLeftEye`] = false;
      state[`assignLeftEyeR`] = false;
      state[`assignLeftEyeG`] = false;
      state[`assignLeftEyeB`] = false;

      rangeStoreVal["LeftEye"].isChecked = false;
    } else {
      this.setState({
        isClickLeftEye: true,
      });
      state[`assignLeftEye`] = true;

      state[`assignLeftEyeR`] = true;
      state[`assignLeftEyeG`] = true;
      state[`assignLeftEyeB`] = true;

      rangeStoreVal["LeftEye"].isChecked = true;
    }

    onChange(state, "hardware");
  };

  onRightEeyHandle = () => {
    const { state, onChange } = this.props;

    if (this.state.isClickRightEye) {
      this.setState({
        isClickRightEye: false,
      });

      state[`assignRightEye`] = false;

      state[`assignRightEyeR`] = false;
      state[`assignRightEyeG`] = false;
      state[`assignRightEyeB`] = false;

      rangeStoreVal["RightEye"].isChecked = false;
    } else {
      this.setState({
        isClickRightEye: true,
      });
      state[`assignRightEye`] = true;
      state[`assignRightEyeR`] = true;
      state[`assignRightEyeG`] = true;
      state[`assignRightEyeB`] = true;
      rangeStoreVal["RightEye"].isChecked = true;
    }

    onChange(state, "hardware");
  };

  onRightEye_B_Handle = () => {
    const { state, onChange } = this.props;

    if (this.state.isClickRightEyeB) {
      this.setState({
        isClickRightEyeB: false,
      });
      state[`assignRightEyeB`] = false;
      rangeStoreVal["RightEye"]["B"].isChecked = false;
    } else {
      this.setState({
        isClickRightEyeB: true,
      });
      state[`assignRightEyeB`] = true;
      rangeStoreVal["RightEye"]["B"].isChecked = true;
    }

    console.log(this.state.isClickRightEyeB, "SMILE ONE CLICK");

    onChange(state, "hardware");
  };

  // New UI Buzzer
  onChangeCheckboxBuzzer = () => {
    // const { state } = this.props;

    const { state, onChange } = this.props;

    if (this.state.isClickBuzzer) {
      this.setState({
        isClickBuzzer: false,
      });
      state[`assignBuzzer`] = false;

      state[`assignBuzzerFrequency`] = false;
      state[`assignBuzzerTone`] = false;
      rangeStoreVal["BuzzerFrequency"].isChecked = false;
      rangeStoreVal["BuzzerTone"].isChecked = false;

      rangeStoreVal["Buzzer"].isChecked = false;
    } else {
      this.setState({
        isClickBuzzer: true,
      });
      state[`assignBuzzer`] = true;
      rangeStoreVal["Buzzer"].isChecked = true;

      state[`assignBuzzerFrequency`] = true;
      state[`assignBuzzerTone`] = false;
      rangeStoreVal["BuzzerFrequency"].isChecked = true;
      rangeStoreVal["BuzzerTone"].isChecked = false;
    }

    onChange(state, "hardware");
  };

  onChangeCheckboxTouchZeroOutput = () => {
    const { state, onChange } = this.props;

    if (this.state.isClickTouchZeroOutput) {
      this.setState({
        isClickTouchZeroOutput: false,
      });
      state[`assignTouchZeroOutput`] = false;

      rangeStoreVal["TouchZeroOutput"].isChecked = false;
    } else {
      this.setState({
        isClickTouchZeroOutput: true,
      });
      state[`assignTouchZeroOutput`] = true;
      rangeStoreVal["TouchZeroOutput"].isChecked = true;
    }

    console.log(this.state.isClickTouchZeroOutput, "BUZZER CLICK");

    onChange(state, "hardware");
  };
  onChangeCheckboxTouchOneOutput = () => {
    const { state, onChange } = this.props;

    if (this.state.isClickTouchOneOutput) {
      this.setState({
        isClickTouchOneOutput: false,
      });
      state[`assignTouchOneOutput`] = false;

      rangeStoreVal["TouchOneOutput"].isChecked = false;
    } else {
      this.setState({
        isClickTouchOneOutput: true,
      });
      state[`assignTouchOneOutput`] = true;
      rangeStoreVal["TouchOneOutput"].isChecked = true;
    }

    console.log(this.state.isClickTouchOneOutput, "BUZZER CLICK");

    onChange(state, "hardware");
  };

  onChangeCheckboxTouchTwoOutput = () => {
    const { state, onChange } = this.props;

    if (this.state.isClickTouchTwoOutput) {
      this.setState({
        isClickTouchTwoOutput: false,
      });
      state[`assignTouchTwoOutput`] = false;

      rangeStoreVal["TouchTwoOutput"].isChecked = false;
    } else {
      this.setState({
        isClickTouchTwoOutput: true,
      });
      state[`assignTouchTwoOutput`] = true;
      rangeStoreVal["TouchTwoOutput"].isChecked = true;
    }

    console.log(this.state.isClickTouchTwoOutput, "BUZZER CLICK");

    onChange(state, "hardware");
  };

  onRangeValue_Buzzer_smile_Eyes = (name, portName, value) => {
    console.log("RANGE VALUE click");

    console.log(name, "NAME");
    console.log(portName, "portName");
    console.log(value, "value");

    const { state, onChange } = this.props;

    console.log("RANGE VALUE CHECKBOX", this.props.state);

    console.log("data::", name, portName, value);

    console.log(name, "name");

    console.log(portName, "portName");
    if (name == "TouchZeroOutput") {
      rangeStoreVal[name].value = value;
      state["valueTouchZeroOutput"] = value;
    } else if (name == "TouchOneOutput") {
      rangeStoreVal[name].value = value;
      state["valueTouchOneOutput"] = value;
    } else if (name == "TouchTwoOutput") {
      rangeStoreVal[name].value = value;
      state["valueTouchTwoOutput"] = value;
    } else if (name == "SmileOne") {
      rangeStoreVal[name].value = value;
      state["valueSmileOne"] = value;
    } else if (name == "SmileTwo") {
      rangeStoreVal[name].value = value;
      state["valueSmileTwo"] = value;
    } else if (name == "SmileThree") {
      rangeStoreVal[name].value = value;
      state["valueSmileThree"] = value;
    } else if (name == "SmileFour") {
      rangeStoreVal[name].value = value;
      state["valueSmileFour"] = value;
    } else if (name == "Buzzer") {
      rangeStoreVal[`${name}${portName}`].value = value;
      state[`valueBuzzer${portName}`] = value;
    } else if (name == "LeftEye") {
      this.setState({ setportName: portName });
      rangeStoreVal[name][portName].value = value;
      state[`value${name}${portName}`] = value;
    } else if (name == "RightEye") {
      rangeStoreVal[name][portName].value = value;
      state[`value${name}${portName}`] = value;
    }
    console.log("rangeStoreVal", rangeStoreVal);

    sessionStorage.setItem("rangeValCheckbox", JSON.stringify(rangeStoreVal));

    onChange(state, "hardware"); //Important for Type change for hardware
  };
  // onChangeSliderValue =

  hexTypeCheck = () => {
    const { state, onChange } = this.props;

    // onChange(state, "hardware");
  };

  renderSTPM = () => {
    if (this.props.PortConnections["STPM"] != null) {
      var type = this.props.PortConnections["STPM"].type;
      var port = "STPM";

      // console.log(type, "gesture1");
      var max, min;
      var compName = type.toLowerCase();

      var range = PortValuesRangeMapping[port][compName](port);
      console.log("RANGE 003", range);
      min = range.min;
      max = range.max;
      const componentProps = this.props.concept.componentProps;

      return (
        <SliderRow
          type={type}
          name={componentProps[type].name}
          port={port}
          value={this.props.state["value" + port]}
          key={port}
          assign={this.state.isClickSTMP}
          onChangeSTPM={this.handleSTPM}
          min={min}
          max={max}
        />
      );
    } else {
      return null;
    }
  };

  renderStepperToggle = () => {
    // return (
    //   <>
    //     <p>asd</p>
    //     <p>asd</p>
    //     <p>asd</p>
    //     <p>asd</p>
    //   </>
    // );
    if (this.props.PortConnections["STPM"] != null) {
      const componentProps = this.props.concept.componentProps;
      return Object.keys(this.props.PortConnections).map((port) => {
        console.log(port);
        if (!this.props.PortConnections[port]) return null;
        var type = this.props.PortConnections[port].type;
        var max, min;
        if (type == "stepper_motor" && port !== "STPM") {
          return (
            <>
              <SliderRow
                type={type}
                name={componentProps[type].name}
                port={port}
                value={rangeStoreVal["STPM_SWITCH"][port].value}
                assign={rangeStoreVal["STPM_SWITCH"][port].isChecked}
                key={port}
                onChange={this.handleSTMPswitch}
                min={min}
                max={max}
                isClickSTMP={this.state.isClickSTMP}
              />
            </>
          );
        } else {
          return null;
        }
        // console.log(type, "gesture1");
      });
    } else {
      return null;
    }
  };

  render() {
    // for (const key in rangeStoreVal) {
    //   // console.log(rangeStoreVal[key]);

    //   // console.log(rangeStoreVal);
    //   // console.log(key, "KEYS");

    //   if (key == "RGBLED") {
    //     console.log("RBG ");
    //   }
    //   if (key == "Buzzer") {
    //     console.log("BUZZER");

    //     if (rangeStoreVal[key].isChecked) {
    //       const { state } = this.props;
    //       state["valueBuzzer"] = rangeStoreVal[key].isChecked;
    //       state["assignBuzzer"] = rangeStoreVal[key].value;
    //     }
    //   }
    // }

    const { state, startState, PortConnections, bottomPanelDeleteKey } =
      this.props;

    console.log(this.props, "PROPS DATATA");

    const componentProps = this.props.concept.componentProps;

    SelectOptionsOrder = ["edt" /*, 'bpr', 'irr'*/, "btr", "bts"];
    // startStateOrder.forEach((name) => {
    //   // console.log("startState[name]",startState,name)
    //   if (startState[name]) {
    //     if (name != "iot") { SelectOptionsOrder.push(name); }
    //   }
    // });

    const assemblyCheckbox = JSON.parse(
      sessionStorage.getItem("assemblyCheckbox")
    );

    const internalAccessories = JSON.parse(
      sessionStorage.getItem("concept")
    ).internalaccessories;

    // console.log("YELO DATA", internalAccessories);

    console.log(assemblyCheckbox, "assemblyCheckbox");

    var portsConnectedArray = [];
    for (var eachConnection in PortConnections) {
      portsConnectedArray.push(eachConnection);
    }
    for (var n = 0; n < portsConnectedArray.length; n++) {
      if (
        portsConnectedArray[n].length == 1 &&
        PortConnections[portsConnectedArray[n]]
      ) {
        if (
          PortConnections[portsConnectedArray[n]].type !== "dual_splitter" &&
          PortConnections[portsConnectedArray[n]].type !== "pc_motor_driver" &&
          PortConnections[portsConnectedArray[n]].type !== "servo_extender"
        ) {
          PortConnections[portsConnectedArray[n] + "1"] =
            PortConnections[portsConnectedArray[n]];
          // PortConnections[portsConnectedArray[n]] = null;
          // console.log("portsConnected------------------> 12", PortConnections)
        }
      } else {
        if (PortConnections[portsConnectedArray[n]]) {
          if (
            PortConnections[portsConnectedArray[n]].type == "servo_extender"
          ) {
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
        if (port === "BC" || port === "DE") {
          port.split("").forEach((char) => {
            [1, 2, 3, 4].forEach((number) => {
              SelectOptionsOrder.push(char + number);
            });
          });
        } else if (port === "MOTOR1") {
          SelectOptionsOrder.push("M1");
          SelectOptionsOrder.push("M2");
        } else if (port === "MOTOR2") {
          SelectOptionsOrder.push("M3");
          SelectOptionsOrder.push("M4");
        } else SelectOptionsOrder.push(port);
      }
    });

    return (
      <div className="outertabDiv-Hardware">
        {/* radio box for Humanoid */}
        {sessionStorage.getItem("connectedDevice") == "Humanoid" ? (
          <div className="radioMainContainer">
            <div className="radioItems">
              <RadioBtn
                val="Attention"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Forward"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Backward"
                isClickRadio={this.state.isClickRadio}
                handleRadioBtn={this.onChangehandleRadioBtn}
              />
              <RadioBtn
                val="Mourn"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Left"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Right"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Wave"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Bow"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Wings"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />

              <RadioBtn
                val="Hook Left"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Hook Right"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Right Curved Hook"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Left Curved Hook"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Push up"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Sit up"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Squat"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Laugh"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Box Forward"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Box Squat"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Box Left"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Box Right"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Break Dance"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
              <RadioBtn
                val="Gangnam style"
                handleRadioBtn={this.onChangehandleRadioBtn}
                isClickRadio={this.state.isClickRadio}
              />
            </div>
          </div>
        ) : null}

        {/* COMMENT FOR NEW UI  */}
        {/* STEPPER MOTOR  UNCOMMENT THIS FOR STEPPER MOTOR*/}
        {/* <div id="Stepper-Main">
          <div className="STPM-MAIN">{this.renderSTPM()}</div>
          <div className="Stepper-Toggle-Switch">
            {this.renderStepperToggle()}
          </div>
        </div> */}

        <table
          width="85%"
          height="100%"
          style={{
            marginLeft: "7%",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            {/* New CheckBox */}
            {Object.keys(internalAccessories).map((value, index) => {
              if (value == "isSmileOne") {
                if (internalAccessories[value] == true) {
                  console.log(PortValuesRangeMapping[value]);
                  return (
                    <SliderRow
                      name="smile"
                      port="S1"
                      value={this.state.curValSmileOne}
                      key="smileOne"
                      title="SmileOne"
                      assign={this.state.isClickSmileOne}
                      handlecheckbox={this.onSmileOneHandle}
                      min={0}
                      max={1}
                      getRangeVal={this.onRangeValue_Buzzer_smile_Eyes}
                    />
                  );
                  // return <input type="range" />;
                }
              } else if (value == "isSmileTwo") {
                if (internalAccessories[value] == true) {
                  console.log(PortValuesRangeMapping[value]);
                  return (
                    <SliderRow
                      name="smile"
                      port="S2"
                      value={this.state.curValSmileTwo}
                      key="smileTwo"
                      title="SmileTwo"
                      assign={this.state.isClickSmileTwo}
                      handlecheckbox={this.onSmileTwoHandle}
                      min={0}
                      max={1}
                      getRangeVal={this.onRangeValue_Buzzer_smile_Eyes}
                    />
                  );
                  // return <input type="range" />;
                }
              } else if (value == "isSmileThree") {
                if (internalAccessories[value] == true) {
                  console.log(PortValuesRangeMapping[value]);
                  return (
                    <SliderRow
                      name="smile"
                      port="S3"
                      value={this.state.curValSmileThree}
                      key="smileThree"
                      title="SmileThree"
                      assign={this.state.isClickSmileThree}
                      handlecheckbox={this.onSmileThreeHandle}
                      min={0}
                      max={1}
                      getRangeVal={this.onRangeValue_Buzzer_smile_Eyes}
                    />
                  );
                  // return <input type="range" />;
                }
              } else if (value == "isSmileFour") {
                if (internalAccessories[value] == true) {
                  console.log(PortValuesRangeMapping[value]);
                  return (
                    <SliderRow
                      name="smile"
                      port="S4"
                      value={this.state.curValSmileFour}
                      key="smileFour"
                      title="SmileFour"
                      assign={this.state.isClickSmileFour}
                      handlecheckbox={this.onSmileFourHandle}
                      min={0}
                      max={1}
                      getRangeVal={this.onRangeValue_Buzzer_smile_Eyes}
                    />
                  );
                  // return <input type="range" />;
                }
              } else if (value == "isbuzzer") {
                if (internalAccessories[value] == true) {
                  console.log(PortValuesRangeMapping[value]);
                  return (
                    <SliderRow
                      changeState={this.props}
                      name="Buzzer"
                      port="buzzer"
                      valueBuzzerFrequency={this.state.curValBuzzerFrequency}
                      valueBuzzerTone={this.state.curValBuzzerTone}
                      key="Buzzer"
                      title="Buzzer"
                      assign={this.state.isClickBuzzer}
                      handlecheckbox={this.onChangeCheckboxBuzzer}
                      min={0}
                      max={9000}
                      getRangeVal={this.onRangeValue_Buzzer_smile_Eyes}
                    />
                  );
                  // return <input type="range" />;
                }
              } else if (value == "isTouchZeroOutput") {
                if (internalAccessories[value] == true) {
                  return (
                    <SliderRow
                      name="touchPadOutput"
                      port=""
                      value={this.state.curValTouchZeroOutput}
                      key="TouchZeroOutput"
                      title="Touch 0 Output"
                      assign={this.state.isClickTouchZeroOutput}
                      handlecheckbox={this.onChangeCheckboxTouchZeroOutput}
                      min={0}
                      max={1}
                      getRangeVal={this.onRangeValue_Buzzer_smile_Eyes}
                    />
                  );
                  // return <input type="range" />;
                }
              } else if (value == "isTouchOneOutput") {
                if (internalAccessories[value] == true) {
                  return (
                    <SliderRow
                      name="touchPadOutput"
                      port=""
                      value={this.state.curValTouchOneOutput}
                      key="TouchOneOutput"
                      title="Touch 1 Output"
                      assign={this.state.isClickTouchOneOutput}
                      handlecheckbox={this.onChangeCheckboxTouchOneOutput}
                      min={0}
                      max={1}
                      getRangeVal={this.onRangeValue_Buzzer_smile_Eyes}
                    />
                  );
                  // return <input type="range" />;
                }
              } else if (value == "isTouchTwoOutput") {
                if (internalAccessories[value] == true) {
                  return (
                    <SliderRow
                      name="touchPadOutput"
                      port=""
                      value={this.state.curValTouchTwoOutput}
                      key="TouchTwoOutput"
                      title="Touch 2 Output"
                      assign={this.state.isClickTouchTwoOutput}
                      handlecheckbox={this.onChangeCheckboxTouchTwoOutput}
                      min={0}
                      max={1}
                      getRangeVal={this.onRangeValue_Buzzer_smile_Eyes}
                    />
                  );
                  // return <input type="range" />;
                }
              } else if (value == "isLeftEye") {
                if (internalAccessories[value] == true) {
                  console.log(PortValuesRangeMapping[value]);
                  return (
                    <>
                      <SliderRow
                        name="LeftEye"
                        port={this.state.setportName}
                        value={
                          this.state[`curValLeftEye${this.state.portName}`]
                        }
                        key="LeftEye"
                        title="LeftEye"
                        assign={this.state.isClickLeftEye}
                        handlecheckbox={this.onLeftEeyHandle}
                        min={0}
                        max={100}
                        onSetSliderPort={this.onSetSliderPort}
                        getRangeVal={this.onRangeValue_Buzzer_smile_Eyes}
                      />
                    </>
                  );
                }
              } else if (value == "isRightEye") {
                if (internalAccessories[value] == true) {
                  console.log(PortValuesRangeMapping[value]);
                  return (
                    <>
                      <SliderRow
                        name="RightEye"
                        port={this.state.setportName}
                        value={
                          this.state[`curValRightEye${this.state.portName}`]
                        }
                        key="RightEye"
                        title="RightEye"
                        assign={this.state.isClickRightEye}
                        handlecheckbox={this.onRightEeyHandle}
                        min={0}
                        max={100}
                        onSetSliderPort={this.onSetSliderPort}
                        getRangeVal={this.onRangeValue_Buzzer_smile_Eyes}
                      />
                    </>
                  );
                }
              }
            })}

            {Object.keys(PortConnections).map((port) => {
              if (!PortConnections[port]) return null;
              // console.log(PortConnections, "Gesture")

              var type = PortConnections[port].type;

              // console.log(type, "gesture1");
              var max, min;

              if (type == "4_in_1_sensor" || type == "microphone") {
                console.log("4_in_1_sensor OR microphone");
                return 0;
              }

              console.log(port, "port");
              if (
                port !== "undefined" &&
                type !== "dual_splitter" &&
                type !== "servo_extender" &&
                type !== "pc_motor_driver"
              ) {
                console.log(port, "port");

                console.log("SENSOR SENSOR + + + + + + + + + + + + + + + + +");

                var compName = type.toLowerCase();

                console.log(
                  type,
                  "gesture1",
                  PortValuesRangeMapping,
                  port,
                  compName
                );

                var range = PortValuesRangeMapping[port][compName](port);
                console.log("RANGE 003", range);
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

                console.log(type, port);

                console.log(port);

                if (
                  port !== "undefined" &&
                  port.length !== 1 &&
                  type !== "dual_splitter" &&
                  type !== "servo_extender" &&
                  type !== "pc_motor_driver" &&
                  type !== "stepper_motor"
                ) {
                  // if (
                  //   port == "STPM" ||
                  //   componentProps[type].name == "STEPPER MOTOR"
                  // ) {
                  //   return (
                  //     <div className="Stepper-Main">
                  //       <div className="STPM-MAIN"></div>
                  //       <div className=""></div>
                  //     </div>
                  //   );
                  // }

                  // if (port == "STPM") {
                  //   return (
                  //     <div
                  //       id="STPM"
                  //       style={
                  //         {
                  //           /*background: "red"*/
                  //         }
                  //       }
                  //     >
                  //       <SliderRow
                  //         type={type}
                  //         name={componentProps[type].name}
                  //         port={port}
                  //         value={state["value" + port]}
                  //         key={port}
                  //         assign={this.state.isClickSTMP}
                  //         onChangeSTPM={this.handleSTPM}
                  //         min={min}
                  //         max={max}
                  //       />{" "}
                  //     </div>
                  //   );
                  // } else if (type == "stepper_motor") {
                  //   return (
                  //     <SliderRow
                  //       type={type}
                  //       name={componentProps[type].name}
                  //       port={port}
                  //       value={state["value" + port]}
                  //       key={port}
                  //       assign={state["assign" + port]}
                  //       onChange={this.handleSTMPswitch}
                  //       min={min}
                  //       max={max}
                  //       isClickSTMP={this.state.isClickSTMP}
                  //     />
                  //   );
                  // }
                  // else {
                  return (
                    <SliderRow
                      name={componentProps[type].name}
                      port={port}
                      value={state["value" + port]}
                      key={port}
                      assign={state["assign" + port]}
                      onChange={this.onChange}
                      min={min}
                      max={max}
                    />
                  );
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
        </table>
        {/* <button onClick={this.hexTypeCheck}>OK</button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

// export default DragSource("data", cardSource, collect1)(Sidebar);

export default connect(mapStateToProps)(OutputPanel);
