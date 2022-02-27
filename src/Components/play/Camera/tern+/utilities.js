// Drawing Mesh

// import { useMediaQuery } from "react-responsive";

var old_Smile_dis = 0;
var new_Smile_dis = 0;
export const drawMesh = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const keypoints = prediction.scaledMesh;
      console.log("detectionConfidence:", prediction.faceInViewConfidence);

      // console.log("iouThreshold:", prediction.iouThreshold);

      let detectionConfidence = prediction.faceInViewConfidence;

      var a;
      var b;
      var c;

      var facialData;

      var RightEye_Y = 0;
      var LeftEye_Y = 0;

      var Head_Y = 0;
      var Nose_Y = 0;
      var Chin_Y = 0;

      var nosePoint = false;

      var lipsPointLeft_Y = 0;
      var lipsPointRight_Y = 0;
      var lipsPointCenter_Y = 0;

      var cheeksPointRight_Y = 0;
      var cheeksPointLeft_Y = 0;
      var MostRightCheeks = 0;

      // WE CAN ALSO COMPARE WITH  detectionConfidence >= 1 but when move to postion bottom then it move to else block i.e ('Please Remove Object from you Face')

      if (detectionConfidence >= 0.999661922454834) {
        // Draw Dots
        for (let i = 0; i < keypoints.length; i++) {
          // console.log("KEYPOINTS", keypoints);
          const x = keypoints[i][0];
          const y = keypoints[i][1];
          // console.log("xy", x, "\n", y);

          // if (
          //   i == 473 ||
          //   i == 474 ||
          //   i == 476 ||
          //   i == 475 ||
          //   i == 477 ||
          //   i == 469 ||
          //   i == 468 ||
          //   i == 471 ||
          //   i == 472 ||
          //   i == 470
          // ) {
          //   ctx.beginPath();
          //   ctx.arc(x, y, 2, 0, 3 * Math.PI);
          //   ctx.fillStyle = "red";

          //   ctx.fill();
          // }

          if (i == 473) {
            // ctx.beginPath();
            // ctx.arc(x, y, 2, 0, 3 * Math.PI);
            // ctx.fillStyle = "red";
            // ctx.fill();

            RightEye_Y = y;
          }

          if (i == 468) {
            // ctx.beginPath();
            // ctx.arc(x, y, 2, 0, 3 * Math.PI);
            // ctx.fillStyle = "yellow";
            // ctx.fill();

            LeftEye_Y = y;
          }

          //LIPS POINT RIGHT
          if (i == 61) {
            // ctx.beginPath();
            // ctx.arc(x, y, 3, 0, 3 * Math.PI);
            // ctx.fillStyle = "green";
            // ctx.fill();

            lipsPointRight_Y = y;

            // console.log("a:", a);
          }

          // LIPS POINT LEFT
          if (i == 291) {
            // ctx.beginPath();
            // ctx.arc(x, y, 3, 0, 3 * Math.PI);
            // ctx.fillStyle = "#ffffff";
            // ctx.fill();

            lipsPointLeft_Y = y;

            // console.log(("b: ", b));
          }

          // CHIN POINT
          if (i == 199) {
            // ctx.beginPath();
            // ctx.arc(x, y, 3, 0, 3 * Math.PI);
            // ctx.fillStyle = "#f9f871";
            // ctx.fill();

            Chin_Y = y;

            // console.log(("b: ", b));
          }

          if (i == 172) {
            // ctx.beginPath();
            // ctx.arc(x, y, 3, 0, 3 * Math.PI);
            // ctx.fillStyle = "green";
            // ctx.fill();

            MostRightCheeks = y;

            // console.log("a:", a);
          }

          // NOSE POINT
          if (i == 5) {
            Nose_Y = y;
            // ctx.beginPath();
            // ctx.arc(x, y, 3, 0, 3 * Math.PI);
            // ctx.fillStyle = "#ffffff";
            // ctx.fill();
          }

          if (i == 9) {
            Head_Y = y;

            // ctx.beginPath();
            // ctx.arc(x, y, 3, 0, 3 * Math.PI);
            // ctx.fillStyle = "pink";
            // ctx.fill();
          }

          //RIGHT cheeks
          if (i == 117) {
            cheeksPointRight_Y = y;
            // ctx.beginPath();
            // ctx.arc(x, y, 3, 0, 3 * Math.PI);
            // ctx.fillStyle = "BLUE";
            // ctx.fill();
          }

          //LEFT cheeks
          if (i == 280) {
            cheeksPointLeft_Y = y;
            // ctx.beginPath();
            // ctx.arc(x, y, 3, 0, 3 * Math.PI);
            // ctx.fillStyle = "black";
            // ctx.fill();
          }

          if (i == 2) {
            lipsPointCenter_Y = y;
            // ctx.beginPath();
            // ctx.arc(x, y, 3, 0, 3 * Math.PI);
            // ctx.fillStyle = "purple";
            // ctx.fill();
          }

          // PRINTING ALL POINTS
          // to get the keypoints
          // ctx.beginPath();
          // ctx.arc(x, y, 1, 0, 3 * Math.PI);

          // ctx.font = "8px Arial";
          // ctx.fillText(`${i}`, x, y);
          // ctx.fillStyle = "#ffffff";

          // ctx.fill();
        }

        // RIGHT SIDE

        // LEFT SIDE

        // CENTER SIDE

        if (RightEye_Y > LeftEye_Y && RightEye_Y - LeftEye_Y > 35) {
          console.log("SO R");
          ctx.beginPath();
          ctx.font = "30px Arial";
          // ctx.scale(1, 0);
          ctx.fillText(" RIGHT ", 250, 480);

          // ctx.fillText(" RIGHT ", 250, 480);

          ctx.fillStyle = "Black";

          facialData = "Right";
        } else if (LeftEye_Y > RightEye_Y && LeftEye_Y - RightEye_Y > 30) {
          console.log("SO L");
          ctx.beginPath();
          ctx.font = "30px Arial";
          // ctx.scale(-1, 1);
          // ctx.fillText(" LEFT ", -400, 480);
          ctx.fillText(" LEFT ", 250, 480);
          ctx.fillStyle = "Black";

          facialData = "Left";
        } else if (Nose_Y < LeftEye_Y && LeftEye_Y - Nose_Y > -5) {
          console.log("SO T");

          ctx.beginPath();
          ctx.font = "30px Arial";
          // ctx.scale(-1, 1);
          // ctx.fillText(" UP ", -400, 480);
          ctx.fillText(" UP ", 280, 480);
          ctx.fillStyle = "Black";

          facialData = "Up";
        } else if (LeftEye_Y - Head_Y < 12) {
          console.log("SO B");
          ctx.beginPath();
          ctx.font = "30px Arial";
          // ctx.scale(-1, 1);
          // ctx.fillText(" DOWN ", -400, 480);
          ctx.fillText(" DOWN ", 260, 480);
          ctx.fillStyle = "Black";

          facialData = "Down";
          nosePoint = false;
        } else if (LeftEye_Y - Head_Y < 15) {
          // BLANK BECAUSE CONFLICT BOTTOM AND SMILE
        } else if (
          lipsPointLeft_Y - lipsPointCenter_Y <= 16 &&
          lipsPointRight_Y - cheeksPointRight_Y <= 65 &&
          lipsPointLeft_Y - cheeksPointLeft_Y < 43
        ) {
          ctx.beginPath();
          ctx.font = "30px Arial";
          // ctx.scale(-1, 1);
          // ctx.fillText(" SMILE ", -400, 480);
          ctx.fillText(" SMILE ", 250, 480);
          ctx.fillStyle = "Black";

          facialData = "Smile";
        } else if (LeftEye_Y - RightEye_Y > -9 || LeftEye_Y - RightEye_Y < 9) {
          ctx.beginPath();
          ctx.font = "30px Arial";
          // ctx.scale(-1, 1);

          // ctx.fillText(" CENTER ", -400, 480);
          ctx.fillText(" CENTER ", 250, 480);

          ctx.fillStyle = "Black";

          facialData = "Center";
        }

        console.log("sub  ", LeftEye_Y - Head_Y);

        // console.log("sub CH", );

        if (typeof facialData != "undefined") {
          console.log("facialData", facialData);

          localStorage.setItem("faceSide", facialData);
        }

        // ctx.beginPath();
        // ctx.font = "30px Arial";
        // ctx.fillText(" SOUMITYA ", 250, 520);
        // ctx.fillStyle = "#822659";

        console.log("SUB :", LeftEye_Y - Head_Y);

        // console.log("so LIPS L : ", lipsPointLeft_Y);
        // console.log("so CHEEKS L:", cheeksPointLeft_Y);
      } else {
        console.log("detectionConfidence FACE NOT FIND");
        ctx.beginPath();
        ctx.font = "30px Arial";

        // ctx.scale(-1, 1);

        // ctx.fillText(" Unable to Recognition ", -400, 480);

        ctx.fillText(" Not Recognised ", 200, 480);
        ctx.fillStyle = "Black";
      }
    });
  }
};
