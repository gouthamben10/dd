var webSerialPortList = {
  name: "Not Connected",
};

const webSerialPortList_Reducer = (state = webSerialPortList, action) => {
  //   var { payload } = action;

  console.log(action, "ACTION=>WEBSERIAL");

  switch (action.type) {
    case "WEB_SERIAL_PORT_CONNECTED": {
      console.log(
        "WEB_SERIAL_PORT_CONNECTED_Redux",
        action.payload.port.onconnect
      );

      const data = action.payload.port;
      console.log(
        data,
        "---------------------------------------------------------------------------------->"
      );
      sessionStorage.setItem("webSerialPortList", JSON.stringify(data));

      return data;
    }

    default:
      return state;
  }
};

export default webSerialPortList_Reducer;
