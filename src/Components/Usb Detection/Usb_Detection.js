const usbDetect = require("usb-detection");

//Usb detection
usbDetect.startMonitoring();

usbDetect.on("add", (device) => {
  console.log("add", device);
});

// Detect remove
usbDetect.on("remove", (device) => {
  console.log("remove", device);
});
