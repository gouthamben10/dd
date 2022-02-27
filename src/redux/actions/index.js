export const selecteComponent = (data) => {
  return {
    type: "COMPONENT_SELECTION",
    payload: data,
  };
};

export const assemblyComponent = (data) => {
  console.log(data, "assemblyComponent  =========REDUX");
  return {
    type: "ASSEMBLY_SELECTION",
    payload: data,
  };
};

export const webSerialAction = (data) => {
  console.log(data, "=========webSerialAction ");
  return {
    type: "WEB_SERIAL_PORT_CONNECTED",
    payload: data,
  };
};
