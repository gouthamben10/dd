// socket.on("/camera", (data, data2) => {
//   // console.log("remote mode ",data,data2);
//   SerialPort.list().then(
//     (ports) => {
//       ports.forEach((port) => {
//         if (port.pnpId.includes("VID_10C4&PID_EA60")) {
//           verified = true;
//           socket.emit("/verifiedDevice", verified);
//           COMPORT = port.path;
//         } else if (port.pnpId.includes("VID_1A86&PID_7523")) {
//           verified = true;
//           socket.emit("/verifiedDevice", verified);
//           COMPORT = port.path;
//         }
//       });
//       const myPort = new SerialPort(COMPORT, {
//         baudRate: 115200,
//         autoOpen: false,
//       });
//       // console.log(myPort,"Myport data");
//       myPort.open(function (err) {
//         if (!err) {
//           myPort.write(data, (err) => {
//             if (!err) {
//               console.log("camera send successfully", data);
//               myPort.close();
//             }
//           });
//         } else {
//           // return console.log('Error opening port: ', err)
//         }
//       });
//     },
//     (err) => {
//       console.log(err, "error");
//     }
//   );
// });

function hex2bin(hex) {
  return parseInt(hex, 16).toString(2).padStart(8, "0");
}

function binaryToDecimal(str) {
  let decimal = +0;
  let bits = +1;
  for (let i = 0; i < str.length; i++) {
    let currNum = +str[str.length - i - 1];
    if (currNum === 1) {
      decimal += bits;
    }
    bits *= 2;
  }
  console.log(decimal, "A1");
  socket.emit("/A1-port", decimal);
}

//   // no retunr
// }
function binaryToDecimal2(string) {
  let decimal = +0;
  let bits = +1;
  for (let i = 0; i < string.length; i++) {
    let currNum = +string[string.length - i - 1];
    if (currNum === 1) {
      decimal += bits;
    }
    bits *= 2;
  }
  console.log(decimal, "A2");
  socket.emit("/A2-port", decimal);
}
function binaryToDecimal22(string) {
  let decimal = +0;
  let bits = +1;
  for (let i = 0; i < string.length; i++) {
    let currNum = +string[string.length - i - 1];
    if (currNum === 1) {
      decimal += bits;
    }
    bits *= 2;
  }
  console.log(decimal, "ges");
  socket.emit("/4IN1ges-port", decimal);
}
function binaryToDecimal3(string) {
  let decimal = +0;
  let bits = +1;
  for (let i = 0; i < string.length; i++) {
    let currNum = +string[string.length - i - 1];
    if (currNum === 1) {
      decimal += bits;
    }
    bits *= 2;
  }
  console.log(decimal, "B1");
  socket.emit("/B1-port", decimal);
}
function binaryToDecimal33(string) {
  let decimal = +0;
  let bits = +1;
  for (let i = 0; i < string.length; i++) {
    let currNum = +string[string.length - i - 1];
    if (currNum === 1) {
      decimal += bits;
    }
    bits *= 2;
  }
  console.log(decimal, "dis");
  socket.emit("/4IN1dis-port", decimal);
}
function binaryToDecimal4(string) {
  let decimal = +0;
  let bits = +1;
  for (let i = 0; i < string.length; i++) {
    let currNum = +string[string.length - i - 1];
    if (currNum === 1) {
      decimal += bits;
    }
    bits *= 2;
  }
  console.log(decimal, "B2");
  socket.emit("/B2-port", decimal);
}
function binaryToDecimal5(string) {
  let decimal = +0;
  let bits = +1;
  for (let i = 0; i < string.length; i++) {
    let currNum = +string[string.length - i - 1];
    if (currNum === 1) {
      decimal += bits;
    }
    bits *= 2;
  }
  console.log(decimal, "C1");
  socket.emit("/C1-port", decimal);
}
function binaryToDecimal6(string) {
  let decimal = +0;
  let bits = +1;
  for (let i = 0; i < string.length; i++) {
    let currNum = +string[string.length - i - 1];
    if (currNum === 1) {
      decimal += bits;
    }
    bits *= 2;
  }
  console.log(decimal, "C2");
  socket.emit("/C2-port", decimal);
}
function binaryToDecimal7(string) {
  let decimal = +0;
  let bits = +1;
  for (let i = 0; i < string.length; i++) {
    let currNum = +string[string.length - i - 1];
    if (currNum === 1) {
      decimal += bits;
    }
    bits *= 2;
  }
  console.log(decimal, "4IN1");
  socket.emit("/4IN1R-port", decimal);
}
function binaryToDecimal9(string) {
  let decimal = +0;
  let bits = +1;
  for (let i = 0; i < string.length; i++) {
    let currNum = +string[string.length - i - 1];
    if (currNum === 1) {
      decimal += bits;
    }
    bits *= 2;
  }
  console.log(decimal, "4IN1");
  socket.emit("/4IN1G-port", decimal);
}
function binaryToDecimal10(string) {
  let decimal = +0;
  let bits = +1;
  for (let i = 0; i < string.length; i++) {
    let currNum = +string[string.length - i - 1];
    if (currNum === 1) {
      decimal += bits;
    }
    bits *= 2;
  }
  console.log(decimal, "4IN1");
  socket.emit("/4IN1B-port", decimal);
}
function binaryToDecimal11(string) {
  let decimal = +0;
  let bits = +1;
  for (let i = 0; i < string.length; i++) {
    let currNum = +string[string.length - i - 1];
    if (currNum === 1) {
      decimal += bits;
    }
    bits *= 2;
  }
  console.log(decimal, "4IN1Calc");
  socket.emit("/4IN1light-port", decimal);
}
function binaryToDecimal8(string) {
  let decimal = +0;
  let bits = +1;
  for (let i = 0; i < string.length; i++) {
    let currNum = +string[string.length - i - 1];
    if (currNum === 1) {
      decimal += bits;
    }
    bits *= 2;
  }
  console.log(decimal, "MIC");
  socket.emit("/Mic-port", decimal);
}

function binary_Decimal(str) {
  let decimal = +0;
  let bits = +1;
  for (let i = 0; i < str.length; i++) {
    let currNum = +str[str.length - i - 1];
    if (currNum === 1) {
      decimal += bits;
    }
    bits *= 2;
  }
  // if (valuee3) {
  console.log(decimal, "A1");
  socket.emit("/A1-port", decimal);
  // }
}

var response = "0040FF00083E0000004000003130316464647F3E";
// var response = await data.toString("utf-8");
console.log("getting response from the hardware22222", response);

/**********************************/ // A1 Port Values///**********************************************/

var A1_Lsb = [response[0], response[1]];
var A1_Msb = [response[2], response[3]];
A1_Lsb_byte = A1_Lsb.toString();
A1_Msb_byte = A1_Msb.toString();
A1_Lsb_byte = A1_Lsb_byte.replace(/[,]/g, "");
A1_Msb_byte = A1_Msb_byte.replace(/[,]/g, "");
A1data_Lsb = hex2bin(A1_Lsb_byte);
A1data_Msb = hex2bin(A1_Msb_byte);
A1M_A1Lcomb = A1data_Msb + A1data_Lsb;
binaryToDecimal(A1M_A1Lcomb);

/**********************/ // A2 Port Values///************************************/

var A2_Lsb = [response[4], response[5]];
var A2_Msb = [response[6], response[7]];
A2_Lsb_byte = A2_Lsb.toString();
A2_Msb_byte = A2_Msb.toString();
A2_Lsb_byte = A2_Lsb_byte.replace(/[,]/g, "");
A2_Msb_byte = A2_Msb_byte.replace(/[,]/g, "");
A2data_Lsb = hex2bin(A2_Lsb_byte);
A2data_Msb = hex2bin(A2_Msb_byte);
A2M_A2Lcomb = A2data_Msb + A2data_Lsb;
binaryToDecimal2(A2M_A2Lcomb);

/***********************/ // B1 Port Values///***********************************************/

var B1_Lsb = [response[8], response[9]];
var B1_Msb = [response[10], response[11]];

B1_Lsb_byte = B1_Lsb.toString();
B1_Msb_byte = B1_Msb.toString();
B1_Lsb_byte = B1_Lsb_byte.replace(/[,]/g, "");
B1_Msb_byte = B1_Msb_byte.replace(/[,]/g, "");
B1data_Lsb = hex2bin(B1_Lsb_byte);
B1data_Msb = hex2bin(B1_Msb_byte);
B1M_B1Lcomb = B1data_Msb + B1data_Lsb;
binaryToDecimal3(B1M_B1Lcomb);

/***********************/ // B2 Port Values///***********************************************/

var B2_Lsb = [response[12], response[13]];
var B2_Msb = [response[14], response[15]];
B2_Lsb_byte = B2_Lsb.toString();
B2_Msb_byte = B2_Msb.toString();
B2_Lsb_byte = B2_Lsb_byte.replace(/[,]/g, "");
B2_Msb_byte = B2_Msb_byte.replace(/[,]/g, "");
B2data_Lsb = hex2bin(B2_Lsb_byte);
B2data_Msb = hex2bin(B2_Msb_byte);
B2M_B2Lcomb = B2data_Msb + B2data_Lsb;
binaryToDecimal4(B2M_B2Lcomb);

/***********************/ // C1 Port Values///***********************************************/

var C1_Lsb = [response[16], response[17]];
var C1_Msb = [response[18], response[19]];
C1_Lsb_byte = C1_Lsb.toString();
C1_Msb_byte = C1_Msb.toString();
C1_Lsb_byte = C1_Lsb_byte.replace(/[,]/g, "");
C1_Msb_byte = C1_Msb_byte.replace(/[,]/g, "");
C1data_Lsb = hex2bin(C1_Lsb_byte);
C1data_Msb = hex2bin(C1_Msb_byte);
C1M_C1Lcomb = C1data_Msb + C1data_Lsb;
binaryToDecimal5(C1M_C1Lcomb);

/***********************/ // C2 Port Values///***********************************************/
var C2_Lsb = [response[8], response[9]];
var C2_Msb = [response[10], response[11]];
C2_Lsb_byte = C2_Lsb.toString();
C2_Msb_byte = C2_Msb.toString();
C2_Lsb_byte = C2_Lsb_byte.replace(/[,]/g, "");
C2_Msb_byte = C2_Msb_byte.replace(/[,]/g, "");
C2data_Lsb = hex2bin(C2_Lsb_byte);
C2data_Msb = hex2bin(C2_Msb_byte);
C2M_C2Lcomb = C2data_Msb + C2data_Lsb;
binaryToDecimal6(C2M_C2Lcomb);

/////////////////////<<<<<<<<<<>>>>>>>>>>>>>>>><<<<<<<FOUR-IN-ONE>>>>>>>>>>>>>>>>>>>>>>>>>>///////////////////////////////
var FourIN1_Lsb = [response[30], response[31]];
FourIN1_Lsb_byte = FourIN1_Lsb.toString();
FourIN1_Lsb_byte = FourIN1_Lsb_byte.replace(/[,]/g, "");
FourIN1data_Lsb = hex2bin(FourIN1_Lsb_byte);
binaryToDecimal7(FourIN1data_Lsb);

/////////////////////<<<<<<<<<<>>>>>>>>>>>>>>>><<<<<<<FOUR-IN-ONE>>>>>>>>>>>>>>>>>>>>>>>>>>///////////////////////////////
var FourIN1_Msb = [response[32], response[33]];
FourIN1_Msb_byte = FourIN1_Msb.toString();
FourIN1_Msb_byte = FourIN1_Msb_byte.replace(/[,]/g, "");

FourIN1data_Msb = hex2bin(FourIN1_Msb_byte);

binaryToDecimal9(FourIN1data_Msb);

/////////////////////<<<<<<<<<<>>>>>>>>>>>>>>>><<<<<<<FOUR-IN-ONE>>>>>>>>>>>>>>>>>>>>>>>>>>///////////////////////////////
var FourIN1_Lsb = [response[34], response[35]];
FourIN1_Lsb_byte = FourIN1_Lsb.toString();
FourIN1_Lsb_byte = FourIN1_Lsb_byte.replace(/[,]/g, "");
FourIN1data_Lsb = hex2bin(FourIN1_Lsb_byte);
binaryToDecimal10(FourIN1data_Lsb);

/////////////////////<<<<<<<<<<>>>>>>>>>>>>>>>><<<<<<< MIC VALUES >>>>>>>>>>>>>>>>>>>>>>>>>>///////////////////////////////
var Mic_Lsb = [response[36], response[37]];
var Mic_Msb = [response[38], response[39]];
Mic_Lsb_byte = Mic_Lsb.toString();
Mic_Msb_byte = Mic_Msb.toString();
Mic_Lsb_byte = Mic_Lsb_byte.replace(/[,]/g, "");
Mic_Msb_byte = Mic_Msb_byte.replace(/[,]/g, "");
Micdata_Lsb = hex2bin(Mic_Lsb_byte);
Micdata_Msb = hex2bin(Mic_Msb_byte);
MicM_MicLcomb = Micdata_Msb + Micdata_Lsb;
binaryToDecimal8(MicM_MicLcomb);

/////////////////////<<<<<<<<<<>>>>>>>>>>>>>>>><<<<<<< Four in 0ne L,G,D >>>>>>>>>>>>>>>>>>>>>>>>>>///////////////////////////////
var Light_Lsb = [response[30], response[31]];
Light_Lsb_byte = Light_Lsb.toString();
Light_Lsb_byte = Light_Lsb_byte.replace(/[,]/g, "");
Lightdata_Lsb = hex2bin(Light_Lsb_byte);
binaryToDecimal11(Lightdata_Lsb);

var Ges_Lsb = [response[34], response[35]];
Ges_Lsb_byte = Ges_Lsb.toString();
Ges_Lsb_byte = Ges_Lsb_byte.replace(/[,]/g, "");
Gesdata_Lsb = hex2bin(Ges_Lsb_byte);
binaryToDecimal33(Gesdata_Lsb);

var Dis_Lsb = [response[32], response[33]];
Dis_Lsb_byte = Dis_Lsb.toString();
Dis_Lsb_byte = Dis_Lsb_byte.replace(/[,]/g, "");
Disdata_Lsb = hex2bin(Dis_Lsb_byte);
binaryToDecimal22(Disdata_Lsb);

console.log("hex to bin", A1_Lsb);
