export var activeCheckBox = {
  RGB: false,
  FOUR_in_ONE_Sensor: false,
  Buzzer: false,
  MICROPHONE: false,
};

// this is for storing the range value for the checkbox components only : red, buzzer , 4in1sensor, microphone
export var rangeStoreVal = {
  // OLD UI 4-in-1 sensor
  FOUR_in_ONE_Sensor: {
    "4-IN-1 SENSOR  →  RED": {
      condition: null,
      source: "4-IN-1 SENSOR  →  RED",
      value: 0,
    },

    "4-IN-1 SENSOR  →  GREEN": {
      condition: null,
      source: "4-IN-1 SENSOR  →  GREEN",
      value: 0,
    },

    "4-IN-1 SENSOR  →  BLUE": {
      condition: null,
      source: "4-IN-1 SENSOR  →  BLUE",
      value: 0,
    },

    "4-IN-1 SENSOR  →  DIST": {
      condition: null,
      source: "4-IN-1 SENSOR  →  DIST",
      value: 0,
    },

    "4-IN-1 SENSOR  →  LIGHT": {
      condition: null,
      source: "4-IN-1 SENSOR  →  LIGHT",
      value: 0,
    },

    "4-IN-1 SENSOR  →  MOTION": {
      condition: null,
      source: "4-IN-1 SENSOR  →  MOTION",
      value: 0,
    },

    "4-IN-1 SENSOR  →  GESTURE": {
      condition: null,
      source: "4-IN-1 SENSOR  →  GESTURE",
      value: 0,
    },
  },

  // DRIVER MOTOR
  STPM_SWITCH: {
    A1: {
      isChecked: false,
      value: 0,
    },
    A2: {
      isChecked: false,
      value: 0,
    },
    B1: {
      isChecked: false,
      value: 0,
    },
    B2: {
      isChecked: false,
      value: 0,
    },
    C1: {
      isChecked: false,
      value: 0,
    },
    C2: {
      isChecked: false,
      value: 0,
    },
    D1: {
      isChecked: false,
      value: 0,
    },
    D2: {
      isChecked: false,
      value: 0,
    },
  },

  // OLD UI
  RGBLED: {
    R: {
      value: 0,
      isChecked: false,
    },

    G: {
      value: 0,
      isChecked: false,
    },
    B: {
      value: 0,
      isChecked: false,
    },
  },

  //UI New Data
  "TOUCH ZERO": {
    value: 0,
    source: "TOUCH ZERO",
    condition: null,
  },
  "TOUCH TWO": {
    value: 0,
    source: "TOUCH TWO",
    condition: null,
  },
  "TOUCH ONE": {
    value: 0,
    source: "TOUCH ONE",
    condition: null,
  },
  MICROPHONE: {
    condition: null,
    source: "MICROPHONE",
    value: 0,
  },
  TEMPERATURE: {
    condition: null,
    source: "TEMPERATURE",
    value: 0,
  },

  "4-IN-1 SENSOR  →  DIST": {
    condition: null,
    source: "4-IN-1 SENSOR  →  DIST",
    value: 0,
  },
  "4-IN-1 SENSOR  →  GESTURE": {
    condition: null,
    source: "4-IN-1 SENSOR  →  GESTURE",
    value: 0,
  },
  "4-IN-1 SENSOR  →  LIGHT": {
    condition: null,
    source: "4-IN-1 SENSOR  →  LIGHT",
    value: 0,
  },

  "4-IN-1 SENSOR  →  RED": {
    condition: null,
    source: "4-IN-1 SENSOR  →  RED",
    value: 0,
  },

  "4-IN-1 SENSOR  →  GREEN": {
    condition: null,
    source: "4-IN-1 SENSOR  →  GREEN",
    value: 0,
  },

  "4-IN-1 SENSOR  →  BLUE": {
    condition: null,
    source: "4-IN-1 SENSOR  →  BLUE",
    value: 0,
  },

  // NEW UI DATA

  TouchZeroOutput: { value: 0, isChecked: false },
  TouchOneOutput: { value: 0, isChecked: false },
  TouchTwoOutput: { value: 0, isChecked: false },

  SmileOne: {
    value: 0,
    isChecked: false,
  },
  SmileTwo: {
    value: 0,
    isChecked: false,
  },
  SmileThree: {
    value: 0,
    isChecked: false,
  },
  SmileFour: {
    value: 0,
    isChecked: false,
  },
  Buzzer: {
    value: 0,
    isChecked: false,
  },

  BuzzerFrequency: {
    value: 0,
    isChecked: false,
  },

  BuzzerTone: {
    value: 0,
    isChecked: false,
  },

  LeftEye: {
    isChecked: false,
    R: {
      value: 0,
      isChecked: false,
    },

    G: {
      value: 0,
      isChecked: false,
    },
    B: {
      value: 0,
      isChecked: false,
    },
  },
  RightEye: {
    isChecked: false,

    R: {
      value: 0,
      isChecked: false,
    },

    G: {
      value: 0,
      isChecked: false,
    },
    B: {
      value: 0,
      isChecked: false,
    },
  },

  STPM: {
    isChecked: false,
  },
};
