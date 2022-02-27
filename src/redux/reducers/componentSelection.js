if (sessionStorage.getItem("concept") != null) {
  var concept = sessionStorage.getItem("concept");
  concept = JSON.parse(concept);
} else {
  var concept = {
    counter: [],
    componentProps: {},
    Index: [],
    internalaccessories: {
      Four_in_one_sensor: {
        isDistanceSensors: false,
        isGestureSensor: false,
        isLightSensor: false,
        isColorSensor: false,
      },
      isFour_in_one_sensor: false,

      // input
      isTouchZero: false,
      isTouchOne: false,
      isTouchTwo: false,
      // output
      isTouchZeroOutput: false,
      isTouchOneOutput: false,
      isTouchTwoOutput: false,

      isMic: false,
      isTemperature: false,

      isLeftEye: false,
      isRightEye: false,
      isbuzzer: false,

      isSmileOne: false,
      isSmileTwo: false,
      isSmileThree: false,
      isSmileFour: false,
    },
  };
}

// if (sessionStorage.getItem("internalaccessories") !== null) {
//   var internalaccessories = sessionStorage.getItem("internalaccessories");
//   internalaccessories = JSON.parse(internalaccessories);
// } else {
//   var internalaccessories = {
//     Four_in_one_sensor: {
//       isDistanceSensors: false,
//       isGestureSensor: false,
//       isLightSensor: false,
//       isColorSensor: false,
//     },
//     isMic: false,
//     isTouchZero: false,
//     isTouchOne: false,
//     isTouchTwo: false,

//     isLeftEye: false,
//     isRightEye: false,
//     isbuzzer: false,

//     isSmileOne: false,
//     isSmileTwo: false,
//     isSmileThree: false,
//     isSmileFour: false,
//   };
// }

const selectedCompo_Reducer = (state = concept, action) => {
  switch (action.type) {
    case "INTERNAL_ACCESSORIES":
      console.log("INTERNAL_ACCESSORIES REDUX");
      var counter = action.payload;
      console.log(counter, "countercountercounter");

      Object.keys(counter).map((val, index) => {
        console.log("KEYS", val);
        console.log("value", counter[val]);

        if (
          val == "isColorSensor" ||
          val == "isDistanceSensors" ||
          val == "isGestureSensor" ||
          val == "isLightSensor"
        ) {
          state.internalaccessories.Four_in_one_sensor[val] = counter[val];
        } else {
          state.internalaccessories[val] = counter[val];
        }
      });

      var data = { ...state };
      sessionStorage.setItem("concept", JSON.stringify(data));
      return data;

    case "COMPONENT_SELECTION":
      var counter = action.payload;

      var data = { ...state, counter };
      console.log("COUNTER COMPONENT_SELECTION", counter);
      sessionStorage.setItem("concept", JSON.stringify(data));
      return data;

    case "Index_selection":
      var Index = action.payload;

      var data = { ...state, Index };
      console.log("COUNTER Index_selection", Index);
      sessionStorage.setItem("concept", JSON.stringify(data));
      return data;

    case "COMPONENT_PROPS":
      var componentProps = action.payload;

      var data = { ...state, componentProps };
      console.log("COUNTER COMPONENT_PROPS", Index);

      return data;

    case "COMPONENT":
      var { payload } = action;
      var { counter, componentProps } = payload;

      var data = { ...state, counter, componentProps };
      console.log("COUNTER COMPONENT", Index);

      return data;

    default:
      sessionStorage.setItem("concept", JSON.stringify(state));
      return state;
  }
};

export default selectedCompo_Reducer;
