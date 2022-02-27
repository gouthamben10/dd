// var componentType = localStorage.getItem("biboxTypes");

// if (componentType == "*SNI#") {
//   module.exports = {
//     PA: {
//       joystick: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       motor_driver: function (port) {
//         return { min: 0, max: 255 };
//       },
//       dual_splitter: function (port) {
//         return { min: 0, max: 255 };
//       },
//       led: function (port) {
//         return { min: 0, max: 1 };
//       },
//       laser: function (port) {
//         return { min: 0, max: 1 };
//       },
//       beeper: function (port) {
//         return { min: 0, max: 1 };
//       },
//       light_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       bend_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       gas_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       distance_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       sound_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       temperature_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rain_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rotational_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       accelerometer: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       solar_panel: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       humidity_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       hall_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       metal_detector: function (port) {
//         return { min: 0, max: 1 };
//       },
//       heartbeat_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       dual_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       touch_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       pir_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       "4_in_1_sensor": function (port) {
//         return { min: 0, max: 65535 };
//       }
//     },
//     AB: {
//       servo_motor: function (port) {
//         return { min: 0, max: 180 };
//       }
//     },
//     AC: {
//       servo_motor: function (port) {
//         return { min: 0, max: 180 };
//       }
//     },

//     PC: {
//       beeper: function (port) {
//         return { min: 0, max: 1 };
//       },
//       joystick: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       motor_driver: function (port) {
//         return { min: 0, max: 255 };
//       },
//       dual_splitter: function (port) {
//         return { min: 0, max: 255 };
//       },
//       // "led": function (port) { return { "min": 0, "max": 255 } },
//       // "laser": function (port) { return { "min": 0, "max": 1 } },
//       // "servo_extender": function (port) { return { "min": 0, "max": 1 } },
//       // "servo_motor": function (port) { return { "min": 0, "max": 180 } },
//       // "beeper": function (port) { return { "min": 0, "max": 1 } },
//       // "light_sensor": function (port) { return { "min": 0, "max": 1024 } },
//       // "bend_sensor": function (port) { return { "min": 0, "max": 1024 } },
//       // "gas_sensor": function (port) { return { "min": 0, "max": 1024 } },
//       // "distance_sensor": function (port) { return { "min": 0, "max": 1024 } },
//       // "sound_sensor": function (port) { return { "min": 0, "max": 1024 } },
//       // "temperature_sensor": function (port) { return { "min": 0, "max": 1024 } },
//       // "rain_sensor": function (port) { return { "min": 0, "max": 1024 } },
//       // "rotational_sensor": function (port) { return { "min": 0, "max": 1024 } },
//       // "accelerometer": function (port) { return { "min": 0, "max": 1024 } },
//       // "solar_panel": function (port) { return { "min": 0, "max": 1024 } },
//       // "humidity_sensor": function (port) { return { "min": 0, "max": 1024 } },
//       // "hall_sensor": function (port) { return { "min": 0, "max": 1024 } },
//       // "metal_detector": function (port) { return { "min": 0, "max": 1 } },
//       // "heartbeat_sensor": function (port) { return { "min": 0, "max": 1 } },
//       // "tact_switch": function (port) { return { "min": 0, "max": 1 } },
//       // "dual_switch": function (port) { return { "min": 0, "max": 1 } },
//       // "touch_sensor": function (port) { return { "min": 0, "max": 1 } },
//       // "pir_sensor": function (port) { return { "min": 0, "max": 1 } },

//       led: function (port) {
//         return { min: 0, max: 65535 };
//       },
//       laser: function (port) {
//         return { min: 0, max: 65535 };
//       },
//       beeper: function (port) {
//         return { min: 0, max: 1 };
//       },
//       servo_motor: function (port) {
//         return { min: 0, max: 180 };
//       },
//       servo_extender: function (port) {
//         return { min: 0, max: 1 };
//       },
//       light_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       bend_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       gas_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       distance_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       sound_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       temperature_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rain_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rotational_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       accelerometer: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       solar_panel: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       humidity_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       hall_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       metal_detector: function (port) {
//         return { min: 0, max: 1 };
//       },
//       heartbeat_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       dual_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       touch_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       pir_sensor: function (port) {
//         return { min: 0, max: 1 };
//       }
//     },
//     G12: {
//       motor_driver: function (port) {
//         return { min: 0, max: 255 };
//       },
//       dual_splitter: function (port) {
//         return { min: 0, max: 255 };
//       },
//       led: function (port) {
//         return { min: 0, max: 1 };
//       },
//       laser: function (port) {
//         return { min: 0, max: 1 };
//       },
//       beeper: function (port) {
//         return { min: 0, max: 1 };
//       },
//       light_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       bend_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       gas_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       distance_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       sound_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       temperature_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rain_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rotational_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       accelerometer: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       solar_panel: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       humidity_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       hall_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       metal_detector: function (port) {
//         return { min: 0, max: 1 };
//       },
//       heartbeat_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       dual_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       touch_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       pir_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       "4_in_1_sensor": function (port) {
//         return { min: 0, max: 65535 };
//       }
//     },
//     F12: {
//       mp3: function (port) {
//         return { min: 0, max: 255 };
//       },
//       motor_driver: function (port) {
//         return { min: 0, max: 255 };
//       },
//       dual_splitter: function (port) {
//         return { min: 0, max: 255 };
//       },
//       led: function (port) {
//         return { min: 0, max: 1 };
//       },
//       laser: function (port) {
//         return { min: 0, max: 1 };
//       },
//       beeper: function (port) {
//         return { min: 0, max: 1 };
//       },
//       light_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       bend_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       gas_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       distance_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       sound_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       temperature_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rain_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rotational_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       accelerometer: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       solar_panel: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       humidity_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       hall_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       metal_detector: function (port) {
//         return { min: 0, max: 1 };
//       },
//       heartbeat_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       dual_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       touch_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       pir_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       "4_in_1_sensor": function (port) {
//         return { min: 0, max: 65535 };
//       }
//     },
//     A1: {
//       ultrasonic_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       dc_motor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       led: function (port) {
//         return { min: 0, max: 1 };
//       },
//       laser: function (port) {
//         return { min: 0, max: 1 };
//       },
//       beeper: function (port) {
//         return { min: 0, max: 1 };
//       },
//       light_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       bend_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       gas_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       distance_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       sound_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       temperature_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rain_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rotational_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       accelerometer: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       solar_panel: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       humidity_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       hall_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       metal_detector: function (port) {
//         return { min: 0, max: 1 };
//       },
//       heartbeat_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       dual_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       touch_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       pir_sensor: function (port) {
//         return { min: 0, max: 1 };
//       }
//     },
//     A2: {
//       dc_motor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       led: function (port) {
//         return { min: 0, max: 65535 };
//       },
//       laser: function (port) {
//         return { min: 0, max: 65535 };
//       },
//       beeper: function (port) {
//         return { min: 0, max: 1 };
//       },
//       servo_motor: function (port) {
//         return { min: 0, max: 180 };
//       },
//       light_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       bend_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       gas_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       distance_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       sound_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       temperature_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rain_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rotational_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       accelerometer: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       solar_panel: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       humidity_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       hall_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       metal_detector: function (port) {
//         return { min: 0, max: 1 };
//       },
//       heartbeat_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       dual_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       touch_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       pir_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       servo_extender: function (port) {
//         return { min: 0, max: 1 };
//       }
//     },
//     A3: {
//       dc_motor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       led: function (port) {
//         return { min: 0, max: 65535 };
//       },
//       laser: function (port) {
//         return { min: 0, max: 65535 };
//       },
//       beeper: function (port) {
//         return { min: 0, max: 1 };
//       },
//       servo_extender: function (port) {
//         return { min: 0, max: 1 };
//       },
//       servo_motor: function (port) {
//         return { min: 0, max: 180 };
//       },
//       light_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       bend_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       gas_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       distance_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       sound_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       temperature_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rain_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rotational_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       accelerometer: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       solar_panel: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       humidity_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       hall_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       metal_detector: function (port) {
//         return { min: 0, max: 1 };
//       },
//       heartbeat_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       dual_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       touch_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       pir_sensor: function (port) {
//         return { min: 0, max: 1 };
//       }
//     },
//     A4: {
//       dc_motor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       led: function (port) {
//         return { min: 0, max: 1 };
//       },
//       laser: function (port) {
//         return { min: 0, max: 1 };
//       },
//       beeper: function (port) {
//         return { min: 0, max: 1 };
//       },
//       servo_extender: function (port) {
//         return { min: 0, max: 1 };
//       },
//       servo_motor: function (port) {
//         return { min: 0, max: 180 };
//       },
//       light_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       bend_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       gas_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       distance_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       sound_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       temperature_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rain_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       rotational_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       accelerometer: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       solar_panel: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       humidity_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       hall_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       metal_detector: function (port) {
//         return { min: 0, max: 1 };
//       },
//       heartbeat_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       dual_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       touch_sensor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       pir_sensor: function (port) {
//         return { min: 0, max: 1 };
//       }
//     },

//     F: {
//       ultrasonic_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       color_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       mp3: function (port) {
//         return { min: 0, max: 255 };
//       },
//       dual_splitter: function (port) {
//         return { min: 0, max: 255 };
//       },
//       dual_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       }
//     },
//     G: {
//       ultrasonic_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       color_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       dual_splitter: function (port) {
//         return { min: 0, max: 255 };
//       },
//       "4_in_1_sensor": function (port) {
//         return { min: 0, max: 65535 };
//       }
//     },
//     FG: {
//       accelerometer: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       ultrasonic_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       color_sensor: function (port) {
//         return { min: 0, max: 1024 };
//       },
//       dual_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       }
//     },
//     F1: {
//       dc_motor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       led: function (port) {
//         return { min: 0, max: 1 };
//       },
//       laser: function (port) {
//         return { min: 0, max: 1 };
//       },
//       beeper: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       dual_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       }
//     },
//     F2: {
//       dc_motor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       led: function (port) {
//         return { min: 0, max: 1 };
//       },
//       laser: function (port) {
//         return { min: 0, max: 1 };
//       },
//       beeper: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       dual_switch: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       }
//     },
//     G1: {
//       dc_motor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       led: function (port) {
//         return { min: 0, max: 1 };
//       },
//       laser: function (port) {
//         return { min: 0, max: 1 };
//       },
//       beeper: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       }
//     },
//     G2: {
//       dc_motor: function (port) {
//         return { min: 0, max: 1 };
//       },
//       led: function (port) {
//         return { min: 0, max: 1 };
//       },
//       laser: function (port) {
//         return { min: 0, max: 1 };
//       },
//       beeper: function (port) {
//         return { min: 0, max: 1 };
//       },
//       tact_switch: function (port) {
//         return { min: 0, max: 1 };
//       }
//     }
//   };
// } else {
//   module.exports
var PortValuesRangeMapping;

export default PortValuesRangeMapping = {
  F12: {
    mp3: function (port) {
      return { min: 0, max: 255 };
    },
  },
  MOTOR1: {
    geared_motor: function (port) {
      return { min: -20, max: 20 };
    },
    mini_geared_motor: function (port) {
      return { min: -20, max: 20 };
    },
    dc_motor: function (port) {
      return { min: -20, max: 20 };
    },
    relay: function (port) {
      return { min: -20, max: 20 };
    },
    electromagnet: function (port) {
      return { min: -20, max: 20 };
    },
  },
  MOTOR2: {
    geared_motor: function (port) {
      return { min: -20, max: 20 };
    },
    mini_geared_motor: function (port) {
      return { min: -20, max: 20 };
    },
    dc_motor: function (port) {
      return { min: -20, max: 20 };
    },
    relay: function (port) {
      return { min: -20, max: 20 };
    },
    electromagnet: function (port) {
      return { min: -20, max: 20 };
    },
  },
  A: {
    joystick: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_dew: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_gas: function (port) {
      return { min: 0, max: 1024 };
    },
    rotatory: function (port) {
      return { min: 0, max: 1024 };
    },
    geared_motor: function (port) {
      return { min: 0, max: 1024 };
    },
    mini_geared_motor: function (port) {
      return { min: 0, max: 1024 };
    },

    dc_motor: function (port) {
      return { min: 0, max: 1024 };
    },

    servo_motor: function (port) {
      return { min: 0, max: 180 };
    },

    servo_motor_360: function (port) {
      return { min: -100, max: +100 };
    },

    dual_splitter: function (port) {
      return { min: 0, max: 225 };
    },
    led: function (port) {
      return { min: 0, max: 1 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    ultrasonic_sensor: function (port) {
      return { min: 0, max: 400 };
    },
  },
  A1: {
    joystick: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_dew: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_gas: function (port) {
      return { min: 0, max: 1024 };
    },

    rotatory: function (port) {
      return { min: 0, max: 1024 };
    },
    geared_motor: function (port) {
      return { min: -20, max: +20 };
    },

    mini_geared_motor: function (port) {
      return { min: -20, max: +20 };
    },

    dc_motor: function (port) {
      return { min: -20, max: +20 };
    },
    servo_motor_360: function (port) {
      return { min: -100, max: +100 };
    },

    servo_motor: function (port) {
      return { min: 0, max: 180 };
    },
    stepper_motor: function (port) {
      return { min: 0, max: 1 };
    },

    led: function (port) {
      if (sessionStorage.getItem("connectedDevice") == "Ace") {
        return { min: 0, max: 100 };
      } else {
        return { min: 0, max: 100 };
      }
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },

    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    ultrasonic_sensor: function (port) {
      return { min: 0, max: 400 };
    },
  },
  A2: {
    joystick: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_dew: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_gas: function (port) {
      return { min: 0, max: 1024 };
    },
    rotatory: function (port) {
      return { min: 0, max: 1024 };
    },
    servo_motor_360: function (port) {
      return { min: -100, max: +100 };
    },

    servo_motor: function (port) {
      return { min: 0, max: 180 };
    },
    stepper_motor: function (port) {
      return { min: 0, max: 1 };
    },

    led: function (port) {
      return { min: 0, max: 100 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    servo_extender: function (port) {
      return { min: 0, max: 1 };
    },

    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  I2: {
    led: function (port) {
      return { min: 0, max: 1 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  I1: {
    led: function (port) {
      return { min: 0, max: 1 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  I: {
    dual_splitter: function (port) {
      return { min: 0, max: 225 };
    },
    led: function (port) {
      return { min: 0, max: 1 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  H2: {
    led: function (port) {
      return { min: 0, max: 1 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  H1: {
    led: function (port) {
      return { min: 0, max: 1 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  H: {
    dual_splitter: function (port) {
      return { min: 0, max: 225 };
    },
    led: function (port) {
      return { min: 0, max: 1 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  G2: {
    led: function (port) {
      return { min: 0, max: 1 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  G1: {
    "4_in_1_sensor": function (port) {
      return { min: 0, max: 65535 };
    },
    led: function (port) {
      return { min: 0, max: 1 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    ultrasonic_sensor: function (port) {
      return { min: 0, max: 400 };
    },
  },
  G: {
    "4_in_1_sensor": function (port) {
      return { min: 0, max: 65535 };
    },
    ultrasonic_sensor: function (port) {
      return { min: 0, max: 400 };
    },
    dual_splitter: function (port) {
      return { min: 0, max: 225 };
    },
    led: function (port) {
      return { min: 0, max: 1 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  F2: {
    led: function (port) {
      return { min: 0, max: 1 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  F1: {
    servo_extender: function (port) {
      return { min: 0, max: 1 };
    },
    servo_motor: function (port) {
      return { min: 0, max: 180 };
    },
    led: function (port) {
      return { min: 0, max: 65535 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  F: {
    servo_extender: function (port) {
      return { min: 0, max: 1 };
    },
    servo_motor: function (port) {
      return { min: 0, max: 180 };
    },
    led: function (port) {
      return { min: 0, max: 65535 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },

  E2: {
    led: function (port) {
      return { min: 0, max: 1 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  E1: {
    led: function (port) {
      return { min: 0, max: 1 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  E: {
    dual_splitter: function (port) {
      return { min: 0, max: 225 };
    },
    led: function (port) {
      return { min: 0, max: 1 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  D2: {
    temp_dew: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_gas: function (port) {
      return { min: 0, max: 1024 };
    },
    rotatory: function (port) {
      return { min: 0, max: 1024 };
    },

    servo_motor_360: function (port) {
      return { min: -100, max: +100 };
    },

    servo_motor: function (port) {
      return { min: 0, max: 180 };
    },
    stepper_motor: function (port) {
      return { min: 0, max: 1 };
    },

    led: function (port) {
      return { min: 0, max: 100 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  D1: {
    temp_dew: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_gas: function (port) {
      return { min: 0, max: 1024 };
    },
    rotatory: function (port) {
      return { min: 0, max: 1024 };
    },

    servo_motor_360: function (port) {
      return { min: -100, max: +100 };
    },

    servo_motor: function (port) {
      return { min: 0, max: 180 };
    },
    stepper_motor: function (port) {
      return { min: -20, max: +20 };
    },

    geared_motor: function (port) {
      return { min: -20, max: +20 };
    },
    mini_geared_motor: function (port) {
      return { min: -20, max: +20 };
    },
    dc_motor: function (port) {
      return { min: -20, max: +20 };
    },

    led: function (port) {
      if (sessionStorage.getItem("connectedDevice") == "Ace") {
        return { min: 0, max: 100 };
      } else {
        return { min: 0, max: 100 };
      }
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    ultrasonic_sensor: function (port) {
      return { min: 0, max: 400 };
    },
  },
  D: {
    temp_dew: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_gas: function (port) {
      return { min: 0, max: 1024 };
    },
    rotatory: function (port) {
      return { min: 0, max: 1024 };
    },
    ultrasonic_sensor: function (port) {
      return { min: 0, max: 400 };
    },
    dual_splitter: function (port) {
      return { min: 0, max: 225 };
    },
    led: function (port) {
      return { min: 0, max: 100 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    servo_motor: function (port) {
      return { min: 0, max: 180 };
    },
    servo_motor_360: function (port) {
      return { min: -100, max: +100 };
    },
  },
  C2: {
    joystick: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_dew: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_gas: function (port) {
      return { min: 0, max: 1024 };
    },
    rotatory: function (port) {
      return { min: 0, max: 1024 };
    },
    servo_motor_360: function (port) {
      return { min: -100, max: +100 };
    },

    servo_motor: function (port) {
      return { min: 0, max: 180 };
    },
    stepper_motor: function (port) {
      return { min: 0, max: 1 };
    },

    led: function (port) {
      return { min: 0, max: 100 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  C1: {
    joystick: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_dew: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_gas: function (port) {
      return { min: 0, max: 1024 };
    },
    rotatory: function (port) {
      return { min: 0, max: 1024 };
    },
    geared_motor: function (port) {
      return { min: -20, max: +20 };
    },
    mini_geared_motor: function (port) {
      return { min: -20, max: +20 };
    },
    dc_motor: function (port) {
      return { min: -20, max: +20 };
    },
    servo_motor_360: function (port) {
      return { min: -100, max: +100 };
    },

    servo_motor: function (port) {
      return { min: 0, max: 180 };
    },
    stepper_motor: function (port) {
      return { min: 0, max: 1 };
    },
    led: function (port) {
      if (sessionStorage.getItem("connectedDevice") == "Ace") {
        return { min: 0, max: 100 };
      } else {
        return { min: 0, max: 1 };
      }
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },

    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    ultrasonic_sensor: function (port) {
      return { min: 0, max: 400 };
    },
  },
  C: {
    joystick: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_dew: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_gas: function (port) {
      return { min: 0, max: 1024 };
    },
    rotatory: function (port) {
      return { min: 0, max: 1024 };
    },
    servo_motor_360: function (port) {
      return { min: -100, max: +100 };
    },

    servo_motor: function (port) {
      return { min: 0, max: 180 };
    },
    led: function (port) {
      return { min: 0, max: 100 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    ultrasonic_sensor: function (port) {
      return { min: 0, max: 400 };
    },
  },
  B2: {
    joystick: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_dew: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_gas: function (port) {
      return { min: 0, max: 1024 };
    },
    rotatory: function (port) {
      return { min: 0, max: 1024 };
    },
    servo_motor_360: function (port) {
      return { min: -100, max: +100 };
    },

    servo_motor: function (port) {
      return { min: 0, max: 180 };
    },
    stepper_motor: function (port) {
      return { min: 0, max: 1 };
    },

    led: function (port) {
      return { min: 0, max: 100 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  B1: {
    joystick: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_dew: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_gas: function (port) {
      return { min: 0, max: 1024 };
    },
    rotatory: function (port) {
      return { min: 0, max: 1024 };
    },
    geared_motor: function (port) {
      return { min: -20, max: +20 };
    },
    mini_geared_motor: function (port) {
      return { min: -20, max: +20 };
    },
    dc_motor: function (port) {
      return { min: -20, max: +20 };
    },

    servo_motor_360: function (port) {
      return { min: -100, max: +100 };
    },

    servo_motor: function (port) {
      return { min: 0, max: 180 };
    },
    stepper_motor: function (port) {
      return { min: 0, max: 1 };
    },

    led: function (port) {
      return { min: 0, max: 100 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },
  B: {
    joystick: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_dew: function (port) {
      return { min: 0, max: 1024 };
    },
    temp_gas: function (port) {
      return { min: 0, max: 1024 };
    },
    rotatory: function (port) {
      return { min: 0, max: 1024 };
    },
    servo_motor_360: function (port) {
      return { min: -100, max: +100 };
    },

    servo_extender: function (port) {
      return { min: 0, max: 1 };
    },
    servo_motor: function (port) {
      return { min: 0, max: 180 };
    },
    dual_splitter: function (port) {
      return { min: 0, max: 225 };
    },
    led: function (port) {
      return { min: 0, max: 100 };
    },
    laser: function (port) {
      return { min: 0, max: 1 };
    },
    beeper: function (port) {
      return { min: 0, max: 1 };
    },
    light_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    bend_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    gas_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    distance_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    sound_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    temperature_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rain_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    rotational_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    accelerometer: function (port) {
      return { min: 0, max: 1024 };
    },
    solar_panel: function (port) {
      return { min: 0, max: 1024 };
    },
    humidity_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    hall_sensor: function (port) {
      return { min: 0, max: 1024 };
    },
    metal_detector: function (port) {
      return { min: 0, max: 1 };
    },
    heartbeat_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    tact_switch: function (port) {
      return { min: 0, max: 1 };
    },
    dual_switch: function (port) {
      return { min: 0, max: 1 };
    },
    touch_sensor: function (port) {
      return { min: 0, max: 1 };
    },
    pir_sensor: function (port) {
      return { min: 0, max: 1 };
    },
  },

  STPM: {
    stepper_motor: function (port) {
      return { min: 0, max: 1 };
    },
  },

  // OLD UI DATA
  FOUR_in_ONE_Sensor: {
    FOUR_in_ONE_Sensor_RED: function () {
      return { min: 0, max: 65535 };
    },
    FOUR_in_ONE_Sensor_BLUE: function () {
      return { min: 0, max: 65535 };
    },
    FOUR_in_ONE_Sensor_GREEN: function () {
      return { min: 0, max: 65535 };
    },
    FOUR_in_ONE_Sensor_DIST: function () {
      return { min: 0, max: 65535 };
    },

    FOUR_in_ONE_Sensor_MOTION: function () {
      return { min: 0, max: 4 };
    },
  },

  // NEW UI DATA
  MICROPHONE: function () {
    return { min: 0, max: 65535 };
  },

  TEMPERATURE: function () {
    return { min: 0, max: 1024 };
  },

  TOUCHZERO: function () {
    return { min: 0, max: 1024 };
  },
  TOUCHONE: function () {
    return { min: 0, max: 1024 };
  },
  TOUCHTWO: function () {
    return { min: 0, max: 1024 };
  },
  FOUR_in_ONE_Sensor_DIST_: function () {
    return { min: 0, max: 255 };
  },
  FOUR_in_ONE_Sensor_GESTURE_: function () {
    return { min: 0, max: 255 };
  },
  FOUR_in_ONE_Sensor_LIGHT_: function () {
    return { min: 0, max: 255 };
  },
  FOUR_in_ONE_Sensor_RED_: function () {
    return { min: 0, max: 100 };
  },
  FOUR_in_ONE_Sensor_BLUE_: function () {
    return { min: 0, max: 100 };
  },
  FOUR_in_ONE_Sensor_GREEN_: function () {
    return { min: 0, max: 100 };
  },
};

// module.exports = {
//   F12: {
//     mp3: function (port) {
//       return { min: 0, max: 255 };
//     }
//   },
//   A1: {
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     light_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     bend_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     gas_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     distance_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     sound_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     temperature_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     rain_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     rotational_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     accelerometer: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     solar_panel: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     humidity_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     hall_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     metal_detector: function (port) {
//       return { min: 0, max: 1 };
//     },
//     heartbeat_sensor: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     },
//     dual_switch: function (port) {
//       return { min: 0, max: 1 };
//     },
//     touch_sensor: function (port) {
//       return { min: 0, max: 1 };
//     },
//     pir_sensor: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   A2: {
//     led: function (port) {
//       return { min: 0, max: 65535 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 65535 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     servo_extender: function (port) {
//       return { min: 0, max: 1 };
//     },
//     servo_motor: function (port) {
//       return { min: 0, max: 180 };
//     },
//     light_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     bend_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     gas_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     distance_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     sound_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     temperature_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     rain_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     rotational_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     accelerometer: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     solar_panel: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     humidity_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     hall_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     metal_detector: function (port) {
//       return { min: 0, max: 1 };
//     },
//     heartbeat_sensor: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     },
//     dual_switch: function (port) {
//       return { min: 0, max: 1 };
//     },
//     touch_sensor: function (port) {
//       return { min: 0, max: 1 };
//     },
//     pir_sensor: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   A3: {
//     led: function (port) {
//       return { min: 0, max: 65535 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 65535 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     servo_motor: function (port) {
//       return { min: 0, max: 180 };
//     },
//     servo_extender: function (port) {
//       return { min: 0, max: 1 };
//     },
//     light_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     bend_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     gas_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     distance_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     sound_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     temperature_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     rain_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     rotational_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     accelerometer: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     solar_panel: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     humidity_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     hall_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     metal_detector: function (port) {
//       return { min: 0, max: 1 };
//     },
//     heartbeat_sensor: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     },
//     dual_switch: function (port) {
//       return { min: 0, max: 1 };
//     },
//     touch_sensor: function (port) {
//       return { min: 0, max: 1 };
//     },
//     pir_sensor: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   A4: {
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     light_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     bend_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     gas_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     distance_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     sound_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     temperature_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     rain_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     rotational_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     accelerometer: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     solar_panel: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     humidity_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     hall_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     metal_detector: function (port) {
//       return { min: 0, max: 1 };
//     },
//     heartbeat_sensor: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     },
//     dual_switch: function (port) {
//       return { min: 0, max: 1 };
//     },
//     touch_sensor: function (port) {
//       return { min: 0, max: 1 };
//     },
//     pir_sensor: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   BC: {
//     "7segment_display": function (port) {
//       return { min: 0, max: 1 };
//     },
//     led_strip: function (port) {
//       return { min: 0, max: 1 };
//     },
//     accelerometer: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     rfid: function (port) {
//       return { min: 0, max: 65535 };
//     },
//     dot_matrix: function (port) {
//       return { min: 0, max: 5 };
//     },
//     "4_ch_relay": function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   B: {
//     accelerometer: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     rfid: function (port) {
//       return { min: 0, max: 65535 };
//     },
//     dot_matrix: function (port) {
//       return { min: 0, max: 5 };
//     },
//     octa_splitter: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     },
//     joystick: function (port) {
//       return { min: 0, max: 1024 };
//     }
//   },
//   F: {
//     ultrasonic_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     color_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     mp3: function (port) {
//       return { min: 0, max: 255 };
//     },
//     dual_splitter: function (port) {
//       return { min: 0, max: 255 };
//     },
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     },
//     dual_switch: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   G: {
//     ultrasonic_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     color_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     dual_splitter: function (port) {
//       return { min: 0, max: 255 };
//     },
//     "4_in_1_sensor": function (port) {
//       return { min: 0, max: 65535 };
//     },
//     gyro_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     compass: function (port) {
//       return { min: 0, max: 360 };
//     },
//     accelerometer: function (port) {
//       return { min: -1024, max: 1024 };
//     }
//   },
//   FG: {
//     accelerometer: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     ultrasonic_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     color_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     }
//   },
//   MOTOR1: {
//     geared_motor: function (port) {
//       return { min: -20, max: 20 };
//     },
//     mini_geared_motor: function (port) {
//       return { min: -20, max: 20 };
//     },
//     dc_motor: function (port) {
//       return { min: -20, max: 20 };
//     },
//     relay: function (port) {
//       return { min: -20, max: 20 };
//     },
//     electromagnet: function (port) {
//       return { min: -20, max: 20 };
//     }
//   },
//   MOTOR2: {
//     geared_motor: function (port) {
//       return { min: -20, max: 20 };
//     },
//     mini_geared_motor: function (port) {
//       return { min: -20, max: 20 };
//     },
//     dc_motor: function (port) {
//       return { min: -20, max: 20 };
//     },
//     relay: function (port) {
//       return { min: -20, max: 20 };
//     },
//     electromagnet: function (port) {
//       return { min: -20, max: 20 };
//     }
//   },
//   F1: {
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   F2: {
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   G1: {
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   G2: {
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   B12: {
//     dual_splitter: function (port) {
//       return { min: 0, max: 255 };
//     },
//     dot_matrix: function (port) {
//       return { min: 0, max: 5 };
//     },
//     "4_ch_relay": function (port) {
//       return { min: 0, max: 1 };
//     },
//     stepper_motor: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   B34: {
//     dual_splitter: function (port) {
//       return { min: 0, max: 255 };
//     },
//     joystick: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     "4_ch_relay": function (port) {
//       return { min: 0, max: 1 };
//     },
//     stepper_motor: function (port) {
//       return { min: 0, max: 1 };
//     },
//     rfid: function (port) {
//       return { min: 0, max: 65535 };
//     },
//     dot_matrix: function (port) {
//       return { min: 0, max: 5 };
//     }
//   },
//   C12: {
//     dual_splitter: function (port) {
//       return { min: 0, max: 255 };
//     },
//     "4_ch_relay": function (port) {
//       return { min: 0, max: 1 };
//     },
//     stepper_motor: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   C34: {
//     dual_splitter: function (port) {
//       return { min: 0, max: 255 };
//     }
//   },
//   B1: {
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   B2: {
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     },
//     light_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     bend_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     gas_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     distance_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     sound_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     temperature_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     rain_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     humidity_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     }
//   },
//   B3: {
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     light_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     bend_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     gas_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     distance_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     sound_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     temperature_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     rain_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     humidity_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     joystick: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   B4: {
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     light_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     bend_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     gas_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     distance_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     sound_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     temperature_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     rain_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     humidity_sensor: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     joystick: function (port) {
//       return { min: 0, max: 1024 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   C1: {
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   C2: {
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   C3: {
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   C4: {
//     led: function (port) {
//       return { min: 0, max: 1 };
//     },
//     laser: function (port) {
//       return { min: 0, max: 1 };
//     },
//     beeper: function (port) {
//       return { min: 0, max: 1 };
//     },
//     tact_switch: function (port) {
//       return { min: 0, max: 1 };
//     }
//   },
//   A22: {
//     servo_motor: function (port) {
//       return { min: 0, max: 180 };
//     }
//   },
//   A33: {
//     servo_motor: function (port) {
//       return { min: 0, max: 180 };
//     }
//   }
// };
// }
