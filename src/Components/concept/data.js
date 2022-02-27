var componentType = sessionStorage.getItem("connectedDevice");

if (componentType == "Ace") {
  module.exports = [
    {
      type: "led",
      description:
        "Led: It emits light when powered up, available in different colors",
      color: "#15909d",
      name: "led",
      signalType: "null",
    },
    {
      type: "laser",
      description:
        "Laser: It emits a narrow and focussed LASER beam, which travels long distance (avoid eye contact)",
      color: "#15909d",
      name: "laser",
      signalType: "null",
    },
    {
      type: "servo_motor",
      description:
        "Servo Motor 180: It is a motor with angular control, you can control its rotation from 0 to 180 degree.",
      color: "#15909d",
      name: "servo motor",
    },

    {
      type: "servo_motor_360",
      description:
        "Servo Motor 360: It is a continous rotation motor, You can control its rotation in both direction.",
      color: "#15909d",
      name: "servo motor 360",
    },
    {
      type: "tact_switch",
      description:
        "Tact Switch: It is a simple tactile switch used for toggle operation",
      color: "#ff8c19",
      name: "tact switch",
      signalType: "analog",
    },
    {
      type: "touch_sensor",
      description:
        "Touch Sensor: This is a button less switch, works on capacitive touch sensor",
      color: "#ff8c19",
      name: "touch sensor",
      signalType: "analog",
    },
    {
      type: "dual_switch",
      description: "Dual Switch: It is simple On-Off Switch",
      color: "#ff8c19",
      name: "dual switch",
      signalType: "analog",
    },
    {
      type: "rotatory",
      description:
        "Rotatory: It is a Rotatory sensor used for sensing amount of rotation",
      color: "#15909d",
      name: "Rotatory",
      signalType: "analog",
    },
    {
      type: "joystick",
      description: "Joystick: A 2-axis joystick sensor",
      color: "#15909d",
      name: "joystick",
      signalType: "analog",
    },
    {
      type: "light_sensor",
      description:
        "Light Sensor: It is used to measure various levels of visible light intensity  (even darkness)",
      color: "#ff8c19",
      name: "light sensor",
      signalType: "analog",
    },
    {
      type: "distance_sensor",
      description:
        "Distance Sensor: It is an IR sensor used to measure the distance of the object from it (max range 3-6cm)",
      color: "#ff8c19",
      name: "distance sensor",
      signalType: "null",
    },
    {
      type: "temp_dew",
      description:
        "Temp Dew: It is a 2-in-1 sensor, with temperature sensor on channel 1 & humidity on channel 2",
      color: "#15909d",
      name: "Temp - Dew",
      signalType: "analog",
    },
    {
      type: "temp_gas",
      description:
        "Temp Gas: It is a 2-in-1 sensor, with temperature sensor at channel 1 & gas sensor at channel 2",
      color: "#15909d",
      name: "Temp - Gas",
      signalType: "analog",
    },
    {
      type: "ultrasonic_sensor",
      description:
        "Ultrasonic Sensor: It is an acoustic sensor used to measure distance of the object from it (range 0-400cm)",
      color: "#ff8c19",
      name: "ultrasonic sensor",
      signalType: "analog",
    },

    // NEW UI DATA LASER,LED,RANGE,9-Axis,Rotatory,touchSwitch,Temp-dew,button,light,temp-gas,ultrasonice,RGBled,DOTmatrix

    // {
    //   type: "9Axis",
    //   description: "A triple axis Accelerometer + Gyro sensor",
    //   color: "#15909d",
    //   name: "9 Axis",
    // },

    // {
    //   type: "RGB",
    //   description:
    //     "It is a serially connectable RGB LED with individual LED controls",
    //   color: "#15909d",
    //   name: "RBG",
    //   signalType: "null",
    // },

    // {
    //   type: "dot_matrix",
    //   description:
    //     "It's a 2 dimensional LED array(8x8) used to display text and symbols. Can be serially connected",
    //   color: "#15909d",
    //   name: "dot matrix",
    // },
    // {
    //   type: "2channel_relay",
    //   description: "A 2 channel RELAY unit, for controlling AC applicances",
    //   color: "#15909d",
    //   name: "2 channel relay",
    // },
    // {
    //   type: "dc_motor",
    //   description:
    //     "It rotates when you power it up, speed and direction of rotation can be varied",
    //   color: "#15909d",
    //   name: "dc motor",
    // },
    // {
    //   type: "stepper_motor",
    //   description: "A Motor which rotates in steps of 1 degree each",
    //   color: "#15909d",
    //   name: "stepper motor",
    // },

    //

    // {
    //   type: "geared_motor",
    //   description:
    //     "It is similar to DC motor, but with gears So it has more power to pull loads but lacks speed",
    //   color: "#15909d",
    //   name: "geared motor",
    // },
    // {
    //   type: "mini_geared_motor",
    //   description:
    //     "It is similar to Geared motor, smaller in size and efficient but with metal gears",
    //   color: "#15909d",
    //   name: "mini geared motor",
    // },

    // {
    //   type: "dc_motor",
    //   description:
    //     "It rotates when you power it up, speed and direction of rotation can be varied",
    //   color: "#15909d",
    //   name: "dc motor",
    // },

    // {
    //   type: "stepper_motor",
    //   description: "A Motor which rotates in steps of 1 degree each",
    //   color: "#15909d",
    //   name: "stepper motor",
    // },
    // {
    //   type: "dual_splitter",
    //   description:
    //     "Splits a single two channel port into two single channel port",
    //   color: "#15909d",
    //   name: "dual splitter",
    // },

    // {
    //   type: "pc_motor_driver",
    //   description: "It is motor driver for running DC motor",
    //   color: "#15909d",
    //   name: "motor driver",
    // },

    // { type: 'beeper', description: 'It emits sharp intensity tones, used for alarms', color: '#15909d', name: 'beeper' },
    // {
    //   type: "servo_extender",
    //   description:
    //     "It is an accessory used to connect servo motor to BIBOX board",
    //   color: "#15909d",
    //   name: "servo extender",
    // },
    // { type: '4_CH_relay', description: 'A 4 channel RELAY unit, for controlling AC applicances', color: '#15909d', name: '4 CH relay' },
    //{type: '4channel_relay', description: 'An electrically operated switch that can control high voltage devices',color: '#30A8AD',name: '4 channel relay'},
    // { type: 'electromagnet', description: 'Can turn into a magnet when electrified', color: '#15909d', name: 'electromagnet' },
    //{type: 'led_strip', description: 'An array of 8 lights stacked one after another',color: '#30A8AD',name: 'led strip'},
    // { type: 'dot_matrix', description: 'It\'s a 2 dimensional LED array(8x8) used to display text and symbols. Can be serially connected', color: '#15909d', name: 'dot matrix' },
    // { type: 'mp3', description: 'Play Mp3 songs', color: '#15909d', name: 'mp3' },

    //   { type: 'motor_driver', description: 'It is motor driver for running DC motor', color: '#15909d', name: 'motor driver' },

    // {
    //   type: "7segment_display",
    //   description:
    //     "It is used to display numbers from 0 to 9 and some alphabets",
    //   color: "#15909d",
    //   name: "7 segment display",
    // },

    // {
    //   type: "octa_splitter",
    //   description:
    //     "Converts B-C ports from pin type connector to audio jack type connector",
    //   color: "#15909d",
    //   name: "octa splitter",
    // },
    // {
    //   type: "tact_switch",
    //   description: "It is a simple tactile switch used for toggle operation",
    //   color: "#ff8c19",
    //   name: "tact switch",
    // },
    // {
    //   type: "dual_switch",
    //   description: "It is simple On-Off Switch",
    //   color: "#ff8c19",
    //   name: "dual switch",
    // },
    // {
    //   type: "touch_sensor",
    //   description:
    //     "This is a button less switch, works on capacitive touch sensor",
    //   color: "#ff8c19",
    //   name: "touch sensor",
    // },
    // {
    //   type: "metal_detector",
    //   description: "It detects metal upto 2cms distance",
    //   color: "#ff8c19",
    //   name: "metal_detector",
    // },
    // {
    //   type: "heartbeat_sensor",
    //   description: "It detects heart beat through one's fingertip",
    //   color: "#ff8c19",
    //   name: "heartbeat_sensor",
    // },

    // { type: 'pir_sensor', description: 'This sensor that can be used as a motion detector', color: '#ff8c19', name: 'pir sensor' },
    // { type: 'joystick', description: 'A 2-axis joystick sensor', color: '#ff8c19', name: 'joystick' },

    //   type: "light_sensor",
    //   description:
    //     "It is used to measure various levels of visible light intensity  (even darkness)",
    //   color: "#ff8c19",
    //   name: "light sensor",
    // },

    // {
    //   type: "temperature_sensor",
    //   description:
    //     "It is used to measure various levels of heat/temperature (even cold) in its environment",
    //   color: "#ff8c19",
    //   name: "temperature sensor",
    // },
    // {
    //   type: "sound_sensor",
    //   description:
    //     "It is used to detect variations in sound levels (even air blowing/wind)",
    //   color: "#ff8c19",
    //   name: "sound sensor",
    // },
    // {
    //   type: "rain_sensor",
    //   description:
    //     "It is used to detect water drops on the sensor. Can also act as a bare hand touch sensor",
    //   color: "#ff8c19",
    //   name: "rain sensor",
    // },
    // {
    //   type: "gas_sensor",
    //   description:
    //     "It is used to detect variations in Alcohol and Carbon Monoxide levels in its environment",
    //   color: "#ff8c19",
    //   name: "gas sensor",
    // },
    // {
    //   type: "bend_sensor",
    //   description:
    //     "It is used to detect the bending angle or force/pressure applied on it",
    //   color: "#ff8c19",
    //   name: "bend sensor",
    // },
    // {
    //   type: "humidity_sensor",
    //   description:
    //     "It is used to detect the variations in water vapour(humidity) content in air",
    //   color: "#ff8c19",
    //   name: "humidity sensor",
    // },
    // { type: 'gyro_sensor', description: 'A triple axis Accelerometer + Gyro sensor', color: '#ff8c19', name: 'gyro sensor' },
    // { type: 'compass', description: '3-Axis Digital Compass', color: '#ff8c19', name: 'compass' },
    // {
    //   type: "hall_sensor",
    //   description: "It measures the magnetic field of an object",
    //   color: "#ff8c19",
    //   name: "hall_sensor",
    // },

    //  { type: '4_in_1_sensor', description: 'A special sensor, that can detect, gesture, colour, light intensity and distance from object', color: '#ff8c19', name: '4 in 1 sensor' },

    // { type: 'rotational_sensor', description: 'This can be used to determine the amount of rotation applied', color: '#ff8c19', name: 'rotational sensor' },
    // { type: 'accelerometer', description: 'This can determine acceleration/tilt angle in the x, y, z planes', color: '#ff8c19', name: 'accelerometer' },
    // { type: 'color_sensor', description: 'It is used to detect variations in 3 Primary colors of RED,GREEN and BLUE', color: '#ff8c19', name: 'color sensor' },
    // { type: 'gesture_sensor', description: 'A special sensor, that can detect, gesture, colour, light intensity and distance from object', color: '#ff8c19', name: 'gesture sensor' },
    // { type: 'rfid', description: 'It detects RFID cards and their values', color: '#ff8c19', name: 'rfid' },
    // { type: 'solar_panel', description: 'Measures the intensity of sunlight falling in the solar panel. ', color: '#ff8c19', name: 'solar panel' },
    /*{type: 'battery', description: 'Rechargeable power source for the BIBOX',color:'#DA1B1B',name: 'battery'},*/
  ];
} else {
  module.exports = [
    //   { type: 'joystick', description: 'A 2-axis joystick sensor', color: '#ff8c19', name: 'joystick' },
    //   { type: 'led', description: 'It emits light when powered up, available in different colors', color: '#15909d', name: 'led' },
    //   { type: 'laser', description: 'It emits a narrow and focussed LASER beam, which travels long distance (avoid eye contact)', color: '#15909d', name: 'laser' },
    //   { type: 'beeper', description: 'It emits sharp intensity tones, used for alarms', color: '#15909d', name: 'beeper' },
    //   { type: 'servo_extender', description: 'It is an accessory used to connect servo motor to BIBOX board', color: '#15909d', name: 'servo extender' },
    //   { type: 'servo_motor', description: 'It is a motor with angular control, you can control its rotation from 0 to 180 degree. Use it with Servo Extender', color: '#15909d', name: 'servo motor' },
    //   { type: 'mp3', description: 'Play Mp3 songs', color: '#15909d', name: 'mp3' },
    //   { type: 'dual_splitter', description: 'Splits a single two channel port into two single channel port', color: '#15909d', name: 'dual splitter' },
    //   { type: 'motor_driver', description: 'It is motor driver for running DC motor', color: '#15909d', name: 'motor driver' },
    //   { type: 'dc_motor', description: 'DC Motor', color: '#15909d', name: 'dual splitter' },
    //   { type: 'tact_switch', description: 'It is a simple tactile switch used for toggle operation', color: '#ff8c19', name: 'tact switch' },
    //   { type: 'dual_switch', description: 'It is simple On-Off Switch', color: '#ff8c19', name: 'dual switch' },
    //   { type: 'touch_sensor', description: 'This is a button less switch, that works on capacitive touch', color: '#ff8c19', name: 'touch sensor' },
    //   { type: 'heartbeat_sensor', description: "It detects heart beat through one's fingertip", color: '#ff8c19', name: 'heartbeat_sensor' },

    //   { type: 'pir_sensor', description: 'This sensor that can be used as a motion detector', color: '#ff8c19', name: 'pir sensor' },
    //   { type: 'light_sensor', description: 'It is used to measure various levels of visible light intensity (even darkness)', color: '#ff8c19', name: 'light sensor' },
    //   { type: 'distance_sensor', description: 'It is kind of light sensor used to measure the distance of the object from the sensor(max range 3-6cm)', color: '#ff8c19', name: 'distance sensor' },
    //   { type: 'temperature_sensor', description: 'It is used to measure various levels of heat/temparature (even cold) in its environment', color: '#ff8c19', name: 'temperature sensor' },
    //   { type: 'sound_sensor', description: 'It is used to detect variations in sound levels (even air blowing/wind)', color: '#ff8c19', name: 'sound sensor' },
    //   { type: 'rain_sensor', description: 'It is used to detect water drops on the sensor, Can also act as a bare hand touch sensor', color: '#ff8c19', name: 'rain sensor' },
    //   { type: 'gas_sensor', description: 'It is used to detect variations in Alcohol and Carbon Monoxide levels in its environment', color: '#ff8c19', name: 'gas sensor' },
    //   { type: 'bend_sensor', description: 'It is used to detect the bending angle or force/pressure applied on it', color: '#ff8c19', name: 'bend sensor' },
    //   { type: 'humidity_sensor', description: 'It is used to detect the variations in water vapour(humidity) content in air', color: '#ff8c19', name: 'humidity sensor' },
    //   { type: 'metal_detector', description: 'It detects metal upto 2cms distance', color: '#ff8c19', name: 'metal_detector' },
    //   { type: 'rotational_sensor', description: 'This can be used to determine the amount of rotation applied', color: '#ff8c19', name: 'rotational sensor' },
    //   { type: 'hall_sensor', description: 'It measures the magnetic field of an object', color: '#ff8c19', name: 'hall_sensor' },
    //   { type: '4_in_1_sensor', description: 'A special sensor, that can detect, gesture, colour, light intensity and distance from object', color: '#ff8c19', name: '4 in 1 sensor' },
    // ]

    {
      type: "led",
      description:
        "It emits light when powered up, available in different colors",
      color: "#15909d",
      name: "led",
    },
    {
      type: "laser",
      description:
        "It emits a narrow and focussed LASER beam, which travels long distance (avoid eye contact)",
      color: "#15909d",
      name: "laser",
    },
    {
      type: "beeper",
      description: "It emits sharp intensity tones, used for alarms",
      color: "#15909d",
      name: "beeper",
    },
    //{ type: 'servo_extender', description: 'It is an accessory used to connect servo motor to BIBOX board', color: '#15909d', name: 'servo extender' },
    //{ type: 'servo_motor', description: 'It is a motor with angular control, you can control its rotation from 0 to 180 degree. Use it with Servo Extender', color: '#15909d', name: 'servo motor' },
    //{ type: 'dc_motor', description: 'It rotates when you power it up, speed and direction of rotation can be varied', color: '#15909d', name: 'dc motor' },
    // { type: 'stepper_motor', description: 'A Motor which rotates in steps of 1 degree each', color: '#15909d', name: 'stepper motor' },
    // { type: '7segment_display', description: 'It is used to display numbers from 0 to 9 and some alphabets', color: '#15909d', name: '7 segment display' },
    // { type: '4_CH_relay', description: 'A 4 channel RELAY unit, for controlling AC applicances', color: '#15909d', name: '4 CH relay' },
    //{type: '4channel_relay', description: 'An electrically operated switch that can control high voltage devices',color: '#30A8AD',name: '4 channel relay'},
    // { type: 'electromagnet', description: 'Can turn into a magnet when electrified', color: '#15909d', name: 'electromagnet' },
    //{type: 'led_strip', description: 'An array of 8 lights stacked one after another',color: '#30A8AD',name: 'led strip'},
    // { type: 'dot_matrix', description: 'It\'s a 2 dimensional LED array(8x8) used to display text and symbols. Can be serially connected', color: '#15909d', name: 'dot matrix' },
    // { type: 'mp3', description: 'Play Mp3 songs', color: '#15909d', name: 'mp3' },
    {
      type: "dual_splitter",
      description:
        "Splits a single two channel port into two single channel port",
      color: "#15909d",
      name: "dual splitter",
    },
    // { type: 'octa_splitter', description: 'Converts B-C ports from pin type connector to audio jack type connector', color: '#15909d', name: 'octa splitter' },
    {
      type: "tact_switch",
      description: "It is a simple tactile switch used for toggle operation",
      color: "#ff8c19",
      name: "tact switch",
    },
    {
      type: "dual_switch",
      description: "It is simple On-Off Switch",
      color: "#ff8c19",
      name: "dual switch",
    },
    {
      type: "touch_sensor",
      description:
        "This is a button less switch, works on capacitive touch sensor",
      color: "#ff8c19",
      name: "touch sensor",
    },
    {
      type: "metal_detector",
      description: "It detects metal upto 2cms distance",
      color: "#ff8c19",
      name: "metal_detector",
    },
    {
      type: "heartbeat_sensor",
      description: "It detects heart beat through one's fingertip",
      color: "#ff8c19",
      name: "heartbeat_sensor",
    },

    // { type: 'pir_sensor', description: 'This sensor that can be used as a motion detector', color: '#ff8c19', name: 'pir sensor' },
    // { type: 'joystick', description: 'A 2-axis joystick sensor', color: '#ff8c19', name: 'joystick' },
    {
      type: "light_sensor",
      description:
        "It is used to measure various levels of visible light intensity  (even darkness)",
      color: "#ff8c19",
      name: "light sensor",
    },
    {
      type: "distance_sensor",
      description:
        "It is kind of light sensor used to measure the distance of the object from the sensor(max range 3-6cm)",
      color: "#ff8c19",
      name: "distance sensor",
    },
    {
      type: "temperature_sensor",
      description:
        "It is used to measure various levels of heat/temperature (even cold) in its environment",
      color: "#ff8c19",
      name: "temperature sensor",
    },
    {
      type: "sound_sensor",
      description:
        "It is used to detect variations in sound levels (even air blowing/wind)",
      color: "#ff8c19",
      name: "sound sensor",
    },
    {
      type: "rain_sensor",
      description:
        "It is used to detect water drops on the sensor. Can also act as a bare hand touch sensor",
      color: "#ff8c19",
      name: "rain sensor",
    },
    {
      type: "gas_sensor",
      description:
        "It is used to detect variations in Alcohol and Carbon Monoxide levels in its environment",
      color: "#ff8c19",
      name: "gas sensor",
    },
    {
      type: "bend_sensor",
      description:
        "It is used to detect the bending angle or force/pressure applied on it",
      color: "#ff8c19",
      name: "bend sensor",
    },
    {
      type: "humidity_sensor",
      description:
        "It is used to detect the variations in water vapour(humidity) content in air",
      color: "#ff8c19",
      name: "humidity sensor",
    },
    // { type: 'gyro_sensor', description: 'A triple axis Accelerometer + Gyro sensor', color: '#ff8c19', name: 'gyro sensor' },
    // { type: 'compass', description: '3-Axis Digital Compass', color: '#ff8c19', name: 'compass' },
    {
      type: "hall_sensor",
      description: "It measures the magnetic field of an object",
      color: "#ff8c19",
      name: "hall_sensor",
    },

    {
      type: "ultrasonic_sensor",
      description:
        "It is kind of sonic sensor used to measure distance of the object from the sensor(range 10-200cm)",
      color: "#ff8c19",
      name: "ultrasonic sensor",
    },

    // { type: '4_in_1_sensor', description: 'A special sensor, that can detect, gesture, colour, light intensity and distance from object', color: '#ff8c19', name: '4 in 1 sensor' },

    // { type: 'rotational_sensor', description: 'This can be used to determine the amount of rotation applied', color: '#ff8c19', name: 'rotational sensor' },
    // { type: 'accelerometer', description: 'This can determine acceleration/tilt angle in the x, y, z planes', color: '#ff8c19', name: 'accelerometer' },
    // { type: 'color_sensor', description: 'It is used to detect variations in 3 Primary colors of RED,GREEN and BLUE', color: '#ff8c19', name: 'color sensor' },
    // { type: 'gesture_sensor', description: 'A special sensor, that can detect, gesture, colour, light intensity and distance from object', color: '#ff8c19', name: 'gesture sensor' },
    // { type: 'rfid', description: 'It detects RFID cards and their values', color: '#ff8c19', name: 'rfid' },
    // { type: 'solar_panel', description: 'Measures the intensity of sunlight falling in the solar panel. ', color: '#ff8c19', name: 'solar panel' },
    /*{type: 'battery', description: 'Rechargeable power source for the BIBOX',color:'#DA1B1B',name: 'battery'},*/
  ];
}
