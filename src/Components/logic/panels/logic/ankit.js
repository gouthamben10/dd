import React, { Component } from "react";
// import ReactDOM from 'react-dom'
// import PropTypes = React.PropTypes;

import Colors from "./Colors";
import Sizes from "./Sizes";
import HexTypes from "./HexTypes";
import { connect } from "react-redux";
var arr = [],
  arr2 = [],
  subarr = [],
  arr2copy,
  count = 0;
// var arr=["start11","if12"];
//  var arr2=["output32","wait33","output34","wait35"
var i = -1,
  y = -1,
  ClickedCompoName = "",
  normalProgram = true,
  touch_tact_count = 0,
  allLoopCount = 1;
var loopProgram = "",
  loopcount = 0,
  loop = 1,
  ifResult = false,
  value = -1,
  ifSub;
class Hexagon extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { onClick, hextype, highlighted } = this.props;
    const { nonClick, nhextype, nhighlighted } = nextProps;
    if (nonClick || onClick) return true;
    else if (hextype !== nhextype || highlighted != nhighlighted) return true;
    return false;
  }

  componentWillUnmount() {
    i = this.props.logic.program.length;
  }

  playIf = (time, sub, ARRAY) => {
    ////if there is if and loop at the same time then i have to change y b/c it's used for loop also
    console.log("Under play LOOP HEX", ARRAY);
    ifResult = false;
    if (sub != undefined) {
      loopProgram = sub;
      //  ifSub=arr2copy[i+1] ///it will take subprogram after if which is inserted below
      ifSub = ARRAY;
    }

    setTimeout(() => {
      y++;
      console.log("ifSuuuuuubbbbbbbbbb", y);
      if (y >= 1 && ifSub.length > 1) {
        var myImage1 = document.getElementById(ifSub[y - 1]);
        myImage1.setAttribute("stroke", "white");
      }
      if (y < loopProgram.length) {
        var eachObject = loopProgram[y];
        if (eachObject.type == "hardware") {
          //Now user can put condition for both if value is grater than
          //then it can be led on or off(so validate 1 and 0 both)
          for (let [key, value] of Object.entries(eachObject.state)) {
            if (parseInt(value) >= 1) {
              console.log("......1121", key, value, ifSub[y]);
              var myImage1 = document.getElementById(ifSub[y]);
              myImage1.setAttribute("stroke", "#5ed649");
              if (touch_tact_count % 2 == 0) {
                console.log("It should off now ...");
                myImage1.setAttribute("stroke", "white");
              }
            }
            if (parseInt(value) == 0) {
              var myImage1 = document.getElementById(ifSub[y]);
              myImage1.setAttribute("stroke", "#5ed649");
            }
          }
          console.log("Now subProgram of loop condition..for 111");
          this.playIf(0);
        } else if (eachObject.type == "wait") {
          var finalWait = 0;
          var waitForLoop = eachObject.state;

          var myImage1 = document.getElementById(ifSub[y]);
          myImage1.setAttribute("stroke", "#5ed649");

          for (let [key, value] of Object.entries(waitForLoop)) {
            if (key == "ms") {
              finalWait = value;
            } else if (key == "s") {
              finalWait += value * 1000;
            } else if (key == "m") {
              finalWait += value * 60000;
            } else if (key == "h") {
              finalWait += value * 3600000;
            }
          }
          console.log("finalWait....", finalWait);
          this.playIf(finalWait);
        }
      } else if (y == loopProgram.length) {
        console.log("Now if program is complited....");
        // ifResult=true;///use b/c execution is not coming back for repeat(used in plat function)
        y = -1; ///when call it for second time

        loopProgram = "";
        this.play(0); //it will call again play to resume the excution
      }
    }, time);
  };

  playLoop = (time, sub, l, ARRAY) => {
    console.log("play Loop is getting called ...", time, sub, ARRAY);
    // console.log("Under play LOOOOOOOOOPPPPPPP",time,sub,l);

    if (sub != undefined) {
      loopProgram = sub;
      loop = l;
      ifSub = ARRAY;
    }
    setTimeout(() => {
      y++;
      if (y >= 1) {
        var myImage1 = document.getElementById(ifSub[y - 1]);
        myImage1.setAttribute("stroke", "white");
      }
      if (y == loopProgram.length) {
        loopcount++;
        console.log("looppp countttt", loop, loopcount);
        if (loop != loopcount) {
          y = 0;
          console.log("it Should increment now", y);
        }
      }
      if (y < loopProgram.length) {
        // for(let i=0;i<ind.state.times;i++){
        // for(let i=0;i<ind.subprogram.length;i++){
        var eachObject = loopProgram[y];
        console.log("yyyyyyyyyyyyyy 2222222222", y, eachObject.type);
        if (eachObject.type == "hardware") {
          //Now user can put condition for both if value is grater than
          //then it can be led on or off(so validate 1 and 0 both)
          for (let [key, value] of Object.entries(eachObject.state)) {
            if (parseInt(value) >= 1) {
              var myImage1 = document.getElementById(ifSub[y]);
              myImage1.setAttribute("stroke", "#5ed649");

              console.log("......Hex11", key, value);
            }
            if (parseInt(value) == 0) {
              var myImage1 = document.getElementById(ifSub[y]);
              myImage1.setAttribute("stroke", "#5ed649");

              console.log("......00Hex", key, value);
            }
          }
          console.log("Now subProgram of loop condition..for 111");
          this.playLoop(0);
        } else if (eachObject.type == "wait") {
          var myImage1 = document.getElementById(ifSub[y]);
          myImage1.setAttribute("stroke", "#5ed649");

          var finalWait = 0;
          var waitForLoop = eachObject.state;
          for (let [key, value] of Object.entries(waitForLoop)) {
            if (key == "ms") {
              finalWait = value;
            } else if (key == "s") {
              finalWait += value * 1000;
            } else if (key == "m") {
              finalWait += value * 60000;
            } else if (key == "h") {
              finalWait += value * 3600000;
            }
          }
          console.log("finalWait....", finalWait);
          this.playLoop(finalWait);
          // }
          //    }
        }
      }
      if (loop == loopcount) {
        //this piece of code should be here b/c above getting error
        console.log("Now it should call play to resume second loop if any ..");
        y = -1;
        loopcount = 0;
        loopProgram = "";
        this.play(0); //it will call again play to resume the excution
      }
    }, time);
  };

  play = (time, v, compoName, programLogic) => {
    console.log("Keyyyyyyyyyyy", v, compoName);
    console.log("keyyyyyyy2222", arr);
    console.log("keyyyyyyy3333", subarr);
    console.log(".....@@@", programLogic);
    if (compoName != undefined) {
      ClickedCompoName = compoName;
    }
    if (v) {
      i = -1;
    }
    if (programLogic == undefined) {
      //input value for sensor coming down from simulate->index.js
      // value=v;
      // count=0;
      // i=-1;  //when calling play() second time i value should be initial value
      if (subarr.length == 0) {
        ///before this when executing second if block it gets into infinite loop

        for (let i = 0; i < arr.length; i++) {
          console.log("arr[i]", arr[i]);
          if (
            arr[i].startsWith("start") ||
            arr[i].startsWith("sensor") ||
            arr[i].startsWith("loop")
          ) {
            arr2.push(arr[i]);
            if (!arr[i].startsWith("start")) {
              normalProgram = false;
            }
          } else if (
            !arr[i].startsWith("end") &&
            !arr[i].startsWith("repeat") &&
            !arr[i].startsWith("insert")
          ) {
            subarr.push(arr[i]);
          }
        }
        // subarr.reverse()
        // let numbers = ["hard8","hard2","wait3"];
        subarr.sort((a, b) => {
          if (a.charAt(a.length - 1) > b.charAt(b.length - 1)) return 1;
          if (a.charAt(a.length - 1) < b.charAt(b.length - 1)) return -1;
          return 0;
        });

        console.log("suuuuuuuuuuuuuuuuuuiiiiiiiiii", subarr);
      }
    }
    // else if(v==0){
    //   ClickedCompoName=compoName
    //   console.log("yesss it includes loop");
    //   if(subarr.length==0){ ///before this when executing second if block it gets into infinite loop
    //   for(let i=0;i<arr.length;i++){
    //     console.log("arr[i]....",arr[i]);
    //       if(arr[i].startsWith("start") || arr[i].startsWith("loop") ||arr[i].startsWith("sensor")  ){
    //         arr2.push(arr[i]);
    //         if(!arr[i].startsWith("start"))
    //         normalProgram=false;
    //       }
    //       else if(!arr[i].startsWith("end") && !arr[i].startsWith("repeat") && !arr[i].startsWith("insert")){
    //         subarr.push(arr[i]);
    //       }
    //   }
    // }
    //    console.log("Now arr2 contains ::",arr2);
    //    console.log("Now subarray contains ...",subarr);
    // }
    if (normalProgram) {
      arr2 = arr; ///this is for simple program when we are not giving input
    }

    var logic = this.props.logic.program;
    setTimeout(() => {
      if (
        ClickedCompoName == "touch_sensor" &&
        i >= this.props.logic.program.length
      ) {
        i = -1;
        console.log("now i for the touch sensor becomes", i);
      }
      if (programLogic == undefined) {
        i++;
      }
      // i++;
      console.log("iiiiiiiii Hex 222222", i, logic.length);
      if (i == logic.length) {
        count = 0;
      }
      if (
        i >= this.props.logic.program.length &&
        this.props.logic.end.state == "repeat"
      ) {
        if (i >= 1) {
          var myImage1 = document.getElementById(arr[i - 1]);
          myImage1.setAttribute("stroke", "white");
        }
        i = 1;
        count = 0;
      }
      console.log("tttttttttttttt Hex 22222", i);
      if (i < this.props.logic.program.length) {
        if (programLogic != undefined) {
          ind = programLogic;
        } else {
          var ind = this.props.logic.program[i];
          console.log("the type for each data", ind);
        }

        // var ind=logic[i]
        console.log("the type for each data", ind.type);
        if (i >= 1) {
          var myImage1 = document.getElementById(arr2[i - 1]);
          myImage1.setAttribute("stroke", "white");
        }

        if (ind.type == "start") {
          var myImage1 = document.getElementById(arr2[i]);
          myImage1.setAttribute("stroke", "#5ed649");
          this.play(0);
        } else if (ind.type == "sensor") {
          // console.log("Now this id should match..",count,ind.subprogram.length);
          console.log("Reverse of the sub array is ::", subarr);
          console.log(
            "subarray contain ////",
            count,
            ind.subprogram.length + count
          );

          let data = JSON.parse(sessionStorage.getItem("simulate"));
          let vv = ind.state.source.substr(0, 1);
          for (let i = 0; i < data.length; i++) {
            if (data[i].port == vv) {
              var vp = data[i].value;
            }
          }

          //It will create new array of subprogram based on the length of subpro in redux for each if(sensor)
          // var citrus = subarr.slice(count, ind.subprogram.length+count);
          // count=ind.subprogram.length;
          // citrus.reverse();
          // console.log(".......456",citrus);

          var myImage1 = document.getElementById(arr2[i]);
          myImage1.setAttribute("stroke", "#5ed649");
          console.log("Now state of if condition..", ind.state, value);

          if (ClickedCompoName != "touch_sensor" && ClickedCompoName != "") {
            console.log(
              "THE CPMPONENT NAME IS RECEIVED IS Elseeee::",
              ClickedCompoName,
              citrus
            );
            touch_tact_count = 1;
          }
          if (ClickedCompoName == "touch_sensor") {
            console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", count);

            var citrus = subarr.slice(count, ind.subprogram.length + count);
            count = ind.subprogram.length;
            console.log(".......456", citrus);
            console.log(
              "THE CPMPONENT NAME IS RECEIVED IS ::",
              ClickedCompoName
            );
            ClickedCompoName = "";
            touch_tact_count++;
            this.playIf(0, ind.subprogram, citrus);
          }
          if (ind.state.condition == "eq") {
            console.log("eeeeeeqqqqqqqqqqqqq  hexxxx");
            if (ind.state.value == vp) {
              var myImage1 = document.getElementById(arr2[i]); //b/c now it will excute subprogram
              myImage1.setAttribute("stroke", "white");

              console.log("yesssssssssssssss hexxxx");

              if (ind.subprogram[0].type == "sensor") {
                //when it encounter nested if
                console.log(
                  "Now it encounter the subprogram hexxx...",
                  ind.subprogram[0].subprogram
                );
                //  this.playIf(0,ind.subprogram[0].subprogram)
                count = 0;
                this.play(0, false, undefined, ind.subprogram[0]);
              } else if (ind.subprogram[0].type == "loop") {
                //when encounter nested loop for inside if condition
                var citrus = subarr.slice(
                  count,
                  ind.subprogram[0].subprogram.length + count
                );
                count = ind.subprogram.length;
                // citrus.reverse();
                console.log(".......456", citrus);

                console.log(
                  "Now it encounter the subprogram...",
                  ind.subprogram[0].subprogram
                );
                console.log(
                  "Now it encounter the subprogram...",
                  ind.subprogram[0].state.times,
                  citrus
                );
                this.playLoop(
                  0,
                  ind.subprogram[0].subprogram,
                  ind.subprogram[0].state.times,
                  citrus
                );
              } else {
                //this is for normal if condition without nested if and loop

                var citrus = subarr.slice(count, ind.subprogram.length + count);
                count = ind.subprogram.length;
                // citrus.reverse();
                console.log(".......456", citrus);

                console.log(
                  "Now I am sending this to playIf hexxx",
                  0,
                  ind.subprogram,
                  citrus
                );
                this.playIf(0, ind.subprogram, citrus);
              }
            } else {
              //because i have to take count for not equal to condition also
              if (ind.subprogram[0].type == "sensor") {
                //when it encounter nested if
                this.play(0, false, undefined, ind.subprogram[0]);
              } else if (ind.subprogram[0].type == "loop") {
                //when encounter nested loop for inside if condition
                console.log(
                  "Now it encounter the subprogram...",
                  ind.subprogram[0].subprogram
                );
                console.log(
                  "Now it encounter the subprogram...",
                  ind.subprogram[0].state.times,
                  citrus
                );
                this.play(0, false, undefined, ind.subprogram[0].subprogram);
              } else {
                //this is for normal if condition without nested if and loop
                count = ind.subprogram.length;
                console.log("countttttttttttttttttttttt", count);
                this.play(0, false, undefined, undefined);
              }
            }
            //   else{
            //     this.playIf(0);
            //     var myImage1=document.getElementById(arr2[i]); //when user excute second if block
            //     myImage1.setAttribute("stroke","white");
            // }
          } else if (ind.state.condition == "gt") {
            console.log("ggggggggttttttttttttttt");
            if (ind.state.value < vp) {
              var myImage1 = document.getElementById(arr2[i]); //b/c now it will excute subprogram
              myImage1.setAttribute("stroke", "white");

              console.log("yesssssssssssssss hexxxx");

              if (ind.subprogram[0].type == "sensor") {
                //when it encounter nested if
                console.log(
                  "Now it encounter the subprogram hexxx...",
                  ind.subprogram[0].subprogram
                );
                //  this.playIf(0,ind.subprogram[0].subprogram)
                count = 0;
                this.play(0, false, undefined, ind.subprogram[0]);
              } else if (ind.subprogram[0].type == "loop") {
                //when encounter nested loop for inside if condition
                var citrus = subarr.slice(
                  count,
                  ind.subprogram[0].subprogram.length + count
                );
                count = ind.subprogram.length;
                // citrus.reverse();
                console.log(".......456", citrus);

                console.log(
                  "Now it encounter the subprogram...",
                  ind.subprogram[0].subprogram
                );
                console.log(
                  "Now it encounter the subprogram...",
                  ind.subprogram[0].state.times,
                  citrus
                );
                this.playLoop(
                  0,
                  ind.subprogram[0].subprogram,
                  ind.subprogram[0].state.times,
                  citrus
                );
              } else {
                //this is for normal if condition without nested if and loop

                var citrus = subarr.slice(count, ind.subprogram.length + count);
                count = ind.subprogram.length;
                // citrus.reverse();
                console.log(".......456", citrus);

                console.log(
                  "Now I am sending this to playIf hexxx",
                  0,
                  ind.subprogram,
                  citrus
                );
                this.playIf(0, ind.subprogram, citrus);
              }
            } else {
              if (ind.subprogram[0].type == "sensor") {
                //when it encounter nested if
                this.play(0, false, undefined, ind.subprogram[0]);
              } else if (ind.subprogram[0].type == "loop") {
                //when encounter nested loop for inside if condition
                console.log(
                  "Now it encounter the subprogram...",
                  ind.subprogram[0].subprogram
                );
                console.log(
                  "Now it encounter the subprogram...",
                  ind.subprogram[0].state.times,
                  citrus
                );
                this.play(0, false, undefined, ind.subprogram[0].subprogram);
              } else {
                //this is for normal if condition without nested if and loop
                count = ind.subprogram.length;
                console.log("countttttttttttttttttttttt", count);
                this.play(0, false, undefined, undefined);
              }
            }
          } else if (ind.state.condition == "lt") {
            console.log("lllllllttttttttttttt");
            if (ind.state.value > vp) {
              var myImage1 = document.getElementById(arr2[i]); //b/c now it will excute subprogram
              myImage1.setAttribute("stroke", "white");

              console.log("yesssssssssssssss hexxxx");

              if (ind.subprogram[0].type == "sensor") {
                //when it encounter nested if
                console.log(
                  "Now it encounter the subprogram hexxx...",
                  ind.subprogram[0].subprogram
                );
                //  this.playIf(0,ind.subprogram[0].subprogram)
                count = 0;
                this.play(0, false, undefined, ind.subprogram[0]);
              } else if (ind.subprogram[0].type == "loop") {
                //when encounter nested loop for inside if condition
                var citrus = subarr.slice(
                  count,
                  ind.subprogram[0].subprogram.length + count
                );
                count = ind.subprogram.length;
                // citrus.reverse();
                console.log(".......456", citrus);

                console.log(
                  "Now it encounter the subprogram...",
                  ind.subprogram[0].subprogram
                );
                console.log(
                  "Now it encounter the subprogram...",
                  ind.subprogram[0].state.times,
                  citrus
                );
                this.playLoop(
                  0,
                  ind.subprogram[0].subprogram,
                  ind.subprogram[0].state.times,
                  citrus
                );
              } else {
                //this is for normal if condition without nested if and loop

                var citrus = subarr.slice(count, ind.subprogram.length + count);
                count = ind.subprogram.length;
                // citrus.reverse();
                console.log(".......456", citrus);

                console.log(
                  "Now I am sending this to playIf hexxx",
                  0,
                  ind.subprogram,
                  citrus
                );
                this.playIf(0, ind.subprogram, citrus);
              }
            } else {
              if (ind.subprogram[0].type == "sensor") {
                //when it encounter nested if
                this.play(0, false, undefined, ind.subprogram[0]);
              } else if (ind.subprogram[0].type == "loop") {
                //when encounter nested loop for inside if condition
                console.log(
                  "Now it encounter the subprogram...",
                  ind.subprogram[0].subprogram
                );
                console.log(
                  "Now it encounter the subprogram...",
                  ind.subprogram[0].state.times,
                  citrus
                );
                this.play(0, false, undefined, ind.subprogram[0].subprogram);
              } else {
                //this is for normal if condition without nested if and loop
                count = ind.subprogram.length;
                console.log("countttttttttttttttttttttt", count);
                this.play(0, false, undefined, undefined);
              }
            }
          }
          // console.log("ifResult",ifResult);
          // if(ifResult==true){
          //     this.play(0)
          // }
        } else if (ind.type == "loop") {
          var myImage1 = document.getElementById(arr2[i]);
          myImage1.setAttribute("stroke", "#5ed649");

          var citrus = subarr.slice(count, ind.subprogram.length + count);
          console.log(".......456", citrus);
          count = ind.subprogram.length;

          // this.playLoop(0,ind.subprogram,ind.state.times,citrus)

          console.log("Get into loop ...", ind.state.times);
          allLoopCount *= parseInt(ind.state.times);

          if (ind.subprogram[0].type == "loop") {
            //when encounter nested loop for inside if condition
            console.log(
              "Now it encounter the subprogram...",
              ind.subprogram[0].subprogram
            );
            console.log(
              "Now it encounter the subprogram...",
              ind.subprogram[0].state.times
            );
            count = 0;
            this.play(0, false, undefined, ind.subprogram[0]);
          } else if (ind.subprogram[0].type == "sensor") {
            //when encounter nested loop for inside if condition
            count = 0;
            this.play(0, false, undefined, ind.subprogram[0]);
          } else {
            //this is for normal loop condition
            console.log("all Loop count now ...", allLoopCount);
            this.playLoop(0, ind.subprogram, allLoopCount, citrus);
          }
        }

        // if(ind.type=="if"){
        //   var myImage1=document.getElementById(arr[i]);
        //    myImage1.setAttribute("stroke","#5ed649")
        //    if(ind.state.value=="1"){
        //     for(let i=0;i<ind.subprogram.length;i++){
        //          var eachObject=ind.subprogram[i];
        //          if(eachObject.type=="hardware"){
        //           var myImage1=document.getElementById("output32");
        //           myImage1.setAttribute("stroke","#5ed649");
        //           this.play(2000)
        //          }
        //     }
        //   }
        //   // this.play(2000)
        // }
        if (ind.type == "hardware") {
          var myImage1 = document.getElementById(arr2[i]);
          myImage1.setAttribute("stroke", "#5ed649");
          this.play(0);
        } else if (ind.type == "wait") {
          var finalWait = 0;
          var wait = ind.state;

          var myImage1 = document.getElementById(arr2[i]);
          myImage1.setAttribute("stroke", "#5ed649");

          for (let [key, value] of Object.entries(wait)) {
            if (key == "ms") {
              finalWait = value;
            } else if (key == "s") {
              finalWait += value * 1000;
            } else if (key == "m") {
              finalWait += value * 60000;
            } else if (key == "h") {
              finalWait += value * 3600000;
            }
            console.log("Get in to wait..2222222", key, value);
          }
          console.log("finalWait....", finalWait);
          this.play(finalWait);
        }
      }
    }, time);
  };
  componentDidMount() {
    // const children = ReactDOM.findDOMNode(this).firstChild.children;
    // console.log("children================>", children);
    // for (var i = 0; i < children.length; i++)
    //   children[i].setAttribute('stroke-linejoin', 'round');
  }
  // simulateProgram=()=>{
  //   console.log("simulateProgram...",this);

  // }
  render() {
    var points = [],
      innerpoints = [],
      degree = 0;
    const { cx, onClick, hextype, highlighted, onDoubleClick, keys, id } =
      this.props;
    if (hextype != "blank") {
      // || hextype != 'hand' || hextype != 'highlighted_hand'  used above for condition
      if (!arr.includes(`${hextype}${keys}`)) {
        arr.push(`${hextype}${keys}`);
      }
    }
    const r = Sizes.r;
    for (degree = 0; degree < 360; degree += 60) {
      points.push(
        cx +
          r * 0.8 * Math.sin((Math.PI * degree) / 180) +
          "," +
          r * 0.8 * Math.cos((Math.PI * degree) / 180)
      );
      innerpoints.push(
        cx +
          r * 0.8 * 0.9 * Math.sin((Math.PI * degree) / 180) +
          "," +
          r * 0.8 * 0.9 * Math.cos((Math.PI * degree) / 180)
      );
    }
    var classNamevar = "";
    if (highlighted) classNamevar = "activeHex";
    return (
      <g onClick={onClick} onDoubleClick={onDoubleClick}>
        <g>
          {/* STOCK AND CONDITION CHECKING */}
          <polygon
            className={classNamevar}
            points={points.join(" ")}
            strokeWidth={r * 0.4}
            stroke={highlighted ? Colors.flash_yellow : Colors.white}
            fill={highlighted ? Colors.flash_yellow : Colors.white}
            id={`${hextype}${keys}`}
            strokeLinejoin="round"
          />

          {/* COLOR FOR THE BLOCK EX: START BLOCK Have GREEN color */}
          <polygon
            points={innerpoints.join(" ")}
            strokeWidth={r * 0.4 * 0.9}
            stroke={HexTypes[hextype].color}
            fill={HexTypes[hextype].color}
            strokeLinejoin="round"
          />
        </g>

        {/* IMAGES inside the BLOCK  */}
        <image
          xlinkHref={HexTypes[hextype].image}
          x={cx - r / 3}
          y={-r / 3 - 6}
          width={(2 * r) / 3}
          height={(2 * r) / 3}
          style={{ pointerEvents: "none" }}
        />

        {/* TEXT INSIDE THE BLOCK */}
        <text
          x={cx}
          y={r / 3 + r / 8 + r / 12}
          fontSize={r / 4}
          textAnchor="middle"
          style={{
            letterSpacing: "-0.05em",
          }}
          fill="white"
        >
          {HexTypes[hextype].name}
        </text>
      </g>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
Hexagon = connect(mapStateToProps, null, null, { forwardRef: true })(Hexagon);
export default Hexagon;
