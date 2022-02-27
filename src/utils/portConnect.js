// import { useEffect, useState } from "react";
import { webSerialAction } from "../redux/actions/index";
import { createStore } from "redux";
import webSerialPortList_Reducer from "../redux/reducers/WebSerial";

async function PortConnect(props) {
  const store = createStore(webSerialPortList_Reducer);
  const portList = await navigator.serial.getPorts();
  console.log("Port Connect");

  if (portList.length === 1) {
    store.dispatch(webSerialAction({ port: portList[0] }));
  }

  // const [p1, setP1] = useState({
  //   selected: false,
  //   port: {},
  // });

  //   useEffect(async () => {
  // try {
  //   const portList = await navigator.serial.getPorts();

  //   if (portList.length === 1) {
  //     console.log(portList, "Hardware connected");

  //     props.webSerialAction({ port: portList[0] });  // adding data to redux

  //     setP1({
  //       selected: true,
  //       port: portList[0],
  //     });
  //   } else {
  //     console.log("No hardware");

  //     setP1({ p1 });
  //   }
  // } catch (err) {
  //   console.log(err.message);
  // }
  // console.log("LLLLLLLLLLLLLLLL");
  //   }, []);
}

export default PortConnect;
