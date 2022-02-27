import React, { Component } from "react";
// import ReactDOM from 'react-dom'
// import PropTypes = React.PropTypes;

import Colors from "./Colors";
import Sizes from "./Sizes";
import HexTypes from "./HexTypes";
import { connect } from "react-redux";
import { newArr } from "../Simulate/Logic/Index";
var arr = [],
  arr2 = [],
  subarr = [],
  arr2copy,
  count = 0;

let loopTrack = [];
let loop2Num = 0;
let newCount = 0;
let j = 0;
let timeArr = [];
let newLoopCountArr = [];
let newArrays = [];
let loopNum2 = null;
let loopNum = null;
let loopNumValue = 0;
let jj = 0;
let jjj = 0;
let jjjj = 0;
let jjjjj = 0;
let j6 = 0;
let j7 = 0;
let newNum = 0;
let loopIter = 0;
let loopBool = false;
let elseLoopBool = false;
let newTimevar = 0;
let loop = 0;
let rep = 0;
// var arr=["start11","if12"];
//  var arr2=["output32","wait33","output34","wait35"
var i = -1;
let m = 0;
let myImage;
let num = 0;
let loopCount = [];
let k = 0;
let newId = 0;
let blockIds = null;
class Hexagon extends Component {
  constructor() {
    super();
    this.state = {
      glowIndex: 0,
      count: 0,
      loopKeep: 0,
      numbers: 0,
      loopNum: 0,
      loopCount: 0,
    };
  }

  // componentDidMount = () => {
  //   blockIds = sessionStorage.getItem('Types');
  //   blockIds = blockIds.split(",").map(i => Number(i));
  // }

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

  play = (time, image) => {
    setTimeout(() => {
      if (image) image.style.stroke = "white";
      if (j < this.props.logic.program.length) {
        switch (this.props.logic.program[j].type) {
          case "start": {
            j++;
            return this.play(0);
          }
          case "hardware": {
            myImage = document.getElementById(
              `${this.props.logic.program[j].id}`
            );
            console.log(myImage, "mmmmmmmmmmmmm");
            myImage.style.stroke = "#5ed649";
            j++;
            return this.play(10, myImage);
          }
          case "wait": {
            myImage = document.getElementById(
              `${this.props.logic.program[j].id}`
            );
            console.log(
              myImage,
              "mmmmmmmmmmmmaa",
              this.props.logic.program[j].id
            );
            myImage.style.stroke = "#5ed649";
            let timeArr = this.props.logic.program[j].state;
            let time =
              timeArr["ms"] +
              timeArr["s"] * 1000 +
              timeArr["m"] * 60 * 1000 +
              timeArr["h"] * 60 * 60 * 1000;
            console.log(time, "timeeeeeee");
            j++;
            return this.play(time, myImage);
          }
          case "sensor": {
            let sub = this.props.logic.program[j].subprogram;
            console.log(
              this.props.logic.program[j].state,
              "ssssssssaaaaaaadddddddd"
            );
            if (this.props.logic.program[j].state.times) {
              loopCount = [
                ...loopCount,
                this.props.logic.program[j].state.times,
              ];
            } else {
              loopCount = [...loopCount, 1];
            }
            switch (this.props.logic.program[j].state.condition) {
              case "gt": {
                if (
                  this.props.logic.program[j].state.value <
                  this.props.logic.program[j].state.value2
                ) {
                  return this.playLoop(0, null, sub);
                }
              }

              case "lt": {
                if (
                  this.props.logic.program[j].state.value >
                  this.props.logic.program[j].state.value2
                ) {
                  return this.playLoop(0, null, sub);
                }
              }

              case "eq": {
                if (
                  this.props.logic.program[j].state.value ===
                  this.props.logic.program[j].state.value2
                ) {
                  return this.playLoop(0, null, sub);
                }
              }

              case "ne": {
                if (
                  this.props.logic.program[j].state.value !==
                  this.props.logic.program[j].state.value2
                ) {
                  return this.playLoop(0, null, sub);
                }
              }

              case "bw": {
                if (
                  this.props.logic.program[j].state.value >=
                  this.props.logic.program[j].state.value2
                ) {
                  return this.playLoop(0, null, sub);
                }
              }

              default: {
                j++;
              }
            }
          }
          case "loop": {
            if (!this.props.logic.program[j].state.times) {
              this.props.logic.program[j].state.times = 1;
            }
            loopCount = [...loopCount, this.props.logic.program[j].state.times];
            let sub = this.props.logic.program[j].subprogram;
            return this.playLoop(0, null, sub);
          }
          default: {
            j++;
            break;
          }
        }
      } else {
        if (this.props.logic.end.state === "end") {
          j = 0;
          return;
        } else {
          j = 0;
          return this.play(0);
        }
      }
    }, time);
  };

  playSensor = (time) => {
    if (time) {
      return this.play(0);
    }
  };
  //just add orignalUbtype and new sub in the new function and initilaize varibales for it like jjj and remember to add default case
  playLoop = (time, image, sub) => {
    if (loopCount[k] !== 0) {
      setTimeout(() => {
        if (image) image.style.stroke = "white";
        if (loop < sub.length) {
          switch (sub[loop].type) {
            case "hardware": {
              myImage = document.getElementById(`${sub[loop].id}`);
              myImage.style.stroke = "#5ed649";
              loop++;
              return this.playLoop(0, myImage, sub);
            }
            case "wait": {
              myImage = document.getElementById(`${sub[loop].id}`);
              console.log(sub[loop].id, "asdsadadadassd");
              myImage.style.stroke = "#5ed649";
              let timeArr = sub[loop].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              console.log(time, "timeeeeeeee");
              loop++;
              return this.playLoop(time, myImage, sub);
            }
            case "loop": {
              let sub1 = sub[loop].subprogram;
              k++;
              loopCount = [...loopCount, sub[loop].state.times];
              return this.playLoop2(0, null, sub1, sub);
            }
            case "sensor": {
              let sub1 = sub[loop].subprogram;
              if (sub[loop].state.times) {
                k++;
                loopCount = [...loopCount, sub[loop].state.times];
              } else {
                k++;
                loopCount = [...loopCount, 1];
              }
              switch (sub[loop].state.condition) {
                case "gt": {
                  if (sub[loop].state.value < sub[loop].state.value2) {
                    return this.playLoop2(0, null, sub1, sub);
                  }
                }

                case "lt": {
                  if (sub[loop].state.value > sub[loop].state.value2) {
                    return this.playLoop2(0, null, sub1, sub);
                  }
                }

                case "eq": {
                  if (sub[loop].state.value === sub[loop].state.value2) {
                    return this.playLoop2(0, null, sub1, sub);
                  }
                }

                case "ne": {
                  if (sub[loop].state.value !== sub[loop].state.value2) {
                    return this.playLoop2(0, null, sub1, sub);
                  }
                }

                case "bw": {
                  if (sub[loop].state.value >= sub[loop].state.value2) {
                    return this.playLoop2(0, null, sub1, sub);
                  }
                }
                default: {
                  loop++;
                  break;
                }
              }
            }
            default: {
              loop++;
              break;
            }
          }
        } else {
          loopCount[k] = loopCount[k] - 1;
          loop = 0;
          if (loopCount[k] === 0) {
            j++;
            k++;
            return this.play(0);
          }
          return this.playLoop(0, null, sub);
        }
      }, time);
    } else {
      j++;
      this.play(0);
    }
  };

  playLoop2 = (time, image, sub, originalSub) => {
    if (loopCount[k] !== 0) {
      setTimeout(() => {
        if (image) image.style.stroke = "white";
        if (jj < sub.length) {
          switch (sub[jj].type) {
            case "hardware": {
              myImage = document.getElementById(`${sub[jj].id}`);
              myImage.style.stroke = "#5ed649";
              jj++;
              return this.playLoop2(0, myImage, sub, originalSub);
            }
            case "wait": {
              myImage = document.getElementById(`${sub[jj].id}`);
              // alert(sub[jj].id)
              myImage.style.stroke = "#5ed649";
              let timeArr = sub[jj].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              console.log(time, "timeeeeeeee");
              jj++;
              return this.playLoop2(time, myImage, sub, originalSub);
            }
            case "sensor": {
              let sub1 = sub[jj].subprogram;
              if (sub[jj].state.times) {
                k++;
                loopCount = [...loopCount, sub[jj].state.times];
                jjj = 0;
              } else {
                k++;
                loopCount = [...loopCount, 1];
                jjj = 0;
              }
              switch (sub[jj].state.condition) {
                case "gt": {
                  if (sub[jj].state.value < sub[jj].state.value2) {
                    return this.playLoop3(0, null, originalSub, sub, sub1);
                  }
                }
                case "lt": {
                  if (sub[jj].state.value > sub[jj].state.value2) {
                    return this.playLoop3(0, null, originalSub, sub, sub1);
                  }
                }

                case "eq": {
                  if (sub[jj].state.value === sub[jj].state.value2) {
                    return this.playLoop3(0, null, originalSub, sub, sub1);
                  }
                }

                case "ne": {
                  if (sub[jj].state.value !== sub[jj].state.value2) {
                    return this.playLoop3(0, null, originalSub, sub, sub1);
                  }
                }

                case "bw": {
                  if (sub[jj].state.value >= sub[jj].state.value2) {
                    return this.playLoop3(0, null, originalSub, sub, sub1);
                  }
                }
                default: {
                  jj++;
                }
              }
            }
            case "loop": {
              let sub1 = sub[jj].subprogram;
              jjj = 0;
              k++;
              console.log(sub1, "ssssssssaaaaaaaaaaaaa");
              loopCount = [...loopCount, sub[jj].state.times];
              return this.playLoop3(0, null, originalSub, sub, sub1);
            }
            default: {
              jj++;
              break;
            }
          }
        } else {
          loopCount[k] = loopCount[k] - 1;
          jj = 0;
          if (loopCount[k] === 0) {
            k--;
            loop++;
            loopCount.pop();
            console.log(originalSub[loop], "suuuuuuuu", loop, k);
            return this.playLoop(0, null, originalSub);
          }
          return this.playLoop2(0, null, sub, originalSub);
        }
      }, time);
    } else {
      loop++;
      k--;
      jj = 0;
      loopCount.pop();
      this.playLoop(0, null, originalSub);
    }
  };

  playLoop3 = (time, image, originalSub, originalSub2, sub) => {
    if (loopCount[k] !== 0) {
      console.log(loopCount[k], "ssssaaa");
      setTimeout(() => {
        if (image) image.style.stroke = "white";
        if (jjj < sub.length) {
          switch (sub[jjj].type) {
            case "hardware": {
              myImage = document.getElementById(`${sub[jjj].id}`);
              myImage.style.stroke = "#5ed649";
              jjj++;
              return this.playLoop3(0, myImage, originalSub, originalSub2, sub);
            }
            case "wait": {
              myImage = document.getElementById(`${sub[jjj].id}`);
              myImage.style.stroke = "#5ed649";
              let timeArr = sub[jjj].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              jjj++;
              return this.playLoop3(
                time,
                myImage,
                originalSub,
                originalSub2,
                sub
              );
            }
            case "loop": {
              let sub1 = sub[jjj].subprogram;
              jjjj = 0;
              k++;
              loopCount = [...loopCount, sub[jjj].state.times];
              return this.playLoop4(
                0,
                null,
                originalSub,
                originalSub2,
                sub,
                sub1
              );
            }
            case "sensor": {
              let sub1 = sub[jjj].subprogram;
              if (sub[jjj].state.times) {
                loopCount = [...loopCount, sub[jjj].state.times];
                k++;
                jjjj = 0;
              } else {
                loopCount = [...loopCount, 1];
                k++;
                jjjj = 0;
              }
              switch (sub[jjj].state.condition) {
                case "gt": {
                  if (sub[jjj].state.value < sub[jjj].state.value2) {
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }
                case "lt": {
                  if (sub[jjj].state.value > sub[jjj].state.value2) {
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }

                case "eq": {
                  if (sub[jjj].state.value === sub[jjj].state.value2) {
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }

                case "ne": {
                  if (sub[jjj].state.value !== sub[jjj].state.value2) {
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }

                case "bw": {
                  if (sub[jjj].state.value >= sub[jjj].state.value2) {
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }
                default: {
                  jjj++;
                }
              }
            }
            default: {
              jjj++;
              break;
            }
          }
        } else {
          loopCount[k] = loopCount[k] - 1;
          console.log(loopCount[k], sub, "subbbbbbbbbbbbbbbbbbbbbbb");
          jjj = 0;
          if (loopCount[k] === 0) {
            k--;
            jj++;
            loopCount.pop();
            return this.playLoop2(0, null, originalSub2, originalSub, sub);
          }
          return this.playLoop3(0, null, originalSub, originalSub2, sub);
        }
      }, time);
    }
  };

  playLoop4 = (time, image, originalSub, originalSub2, originalSub3, sub) => {
    if (loopCount[k] !== 0) {
      setTimeout(() => {
        if (image) image.style.stroke = "white";
        if (jjjj < sub.length) {
          switch (sub[jjjj].type) {
            case "hardware": {
              myImage = document.getElementById(`${sub[jjjj].id}`);
              myImage.style.stroke = "#5ed649";
              jjjj++;
              return this.playLoop4(
                0,
                myImage,
                originalSub,
                originalSub2,
                originalSub3,
                sub
              );
            }
            case "wait": {
              myImage = document.getElementById(`${sub[jjjj].id}`);
              myImage.style.stroke = "#5ed649";
              let timeArr = sub[jjjj].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              jjjj++;
              return this.playLoop4(
                time,
                myImage,
                originalSub,
                originalSub2,
                originalSub3,
                sub
              );
            }
            case "loop": {
              let sub1 = sub[jjjj].subprogram;
              jjjjj = 0;
              k++;
              loopCount = [...loopCount, sub[jjjj].state.times];
              this.playLoop5(
                0,
                null,
                originalSub,
                originalSub2,
                originalSub3,
                sub,
                sub1
              );
            }
            case "sensor": {
              let sub1 = sub[jjjj].subprogram;
              if (sub[jjjj].state.times) {
                loopCount = [...loopCount, sub[jjjj].state.times];
                k++;
                jjjjj = 0;
              } else {
                loopCount = [...loopCount, 1];
                k++;
                jjjjj = 0;
              }
              switch (sub[jjjj].state.condition) {
                case "gt": {
                  if (sub[jjjj].state.value < sub[jjjj].state.value2) {
                    return this.playLoop5(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }
                case "lt": {
                  if (sub[jjjj].state.value > sub[jjjj].state.value2) {
                    return this.playLoop5(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }

                case "eq": {
                  if (sub[jjjj].state.value === sub[jjjj].state.value2) {
                    return this.playLoop5(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }

                case "ne": {
                  if (sub[jjjj].state.value !== sub[jjjj].state.value2) {
                    return this.playLoop5(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }

                case "bw": {
                  if (sub[jjjj].state.value >= sub[jjjj].state.value2) {
                    return this.playLoop5(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }
                default: {
                  jjjj++;
                }
              }
            }
            default: {
              jjjj++;
              break;
            }
          }
        } else {
          loopCount[k] = loopCount[k] - 1;
          jjjj = 0;
          if (loopCount[k] === 0) {
            k--;
            jjj++;
            loopCount.pop();
            return this.playLoop3(
              0,
              null,
              originalSub,
              originalSub2,
              originalSub3,
              sub
            );
          }
          return this.playLoop4(
            0,
            null,
            originalSub,
            originalSub2,
            originalSub3,
            sub
          );
        }
      }, time);
    }
  };

  playLoop5 = (time, image, originalSub, originalSub2, originalSub3, sub) => {
    if (loopCount[k] !== 0) {
      setTimeout(() => {
        if (image) image.style.stroke = "white";
        if (jjjjj < sub.length) {
          switch (sub[jjjjj].type) {
            case "hardware": {
              myImage = document.getElementById(`${sub[jjjjj].id}`);
              myImage.style.stroke = "#5ed649";
              jjjjj++;
              return this.playLoop5(
                0,
                myImage,
                originalSub,
                originalSub2,
                originalSub3,
                sub
              );
            }
            case "wait": {
              myImage = document.getElementById(`${sub[jjjjj].id}`);
              myImage.style.stroke = "#5ed649";
              let timeArr = sub[jjjjj].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              jjjjj++;
              return this.playLoop5(
                time,
                myImage,
                originalSub,
                originalSub2,
                originalSub3,
                sub
              );
            }
            case "loop": {
              let sub1 = sub[jjjjj].subprogram;
              j6 = 0;
              k++;
              loopCount = [...loopCount, sub[jjjjj].state.times];
              this.playLoop6(
                0,
                null,
                originalSub,
                originalSub2,
                originalSub3,
                sub,
                sub1
              );
            }
            case "sensor": {
              let sub1 = sub[jjjjj].subprogram;
              if (sub[jjjjj].state.times) {
                loopCount = [...loopCount, sub[jjjjj].state.times];
                k++;
                j6 = 0;
              } else {
                loopCount = [...loopCount, 1];
                k++;
                j6 = 0;
              }
              switch (sub[jjjjj].state.condition) {
                case "gt": {
                  if (sub[jjjjj].state.value < sub[jjjjj].state.value2) {
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }
                case "lt": {
                  if (sub[jjjjj].state.value > sub[jjjjj].state.value2) {
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }

                case "eq": {
                  if (sub[jjjjj].state.value === sub[jjjjj].state.value2) {
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }

                case "ne": {
                  if (sub[jjjjj].state.value !== sub[jjjjj].state.value2) {
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }

                case "bw": {
                  if (sub[jjjjj].state.value >= sub[jjjjj].state.value2) {
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  }
                }
                default: {
                  jjjjj++;
                }
              }
            }
            default: {
              jjjjj++;
              break;
            }
          }
        } else {
          loopCount[k] = loopCount[k] - 1;
          jjjjj = 0;
          if (loopCount[k] === 0) {
            k--;
            jjjj++;
            loopCount.pop();
            return this.playLoop4(
              0,
              null,
              originalSub,
              originalSub2,
              originalSub3,
              sub
            );
          }
          return this.playLoop5(
            0,
            null,
            originalSub,
            originalSub2,
            originalSub3,
            sub
          );
        }
      }, time);
    }
  };

  playLoop6 = (
    time,
    image,
    originalSub,
    originalSub2,
    originalSub3,
    originalSub4,
    originalSub5,
    sub
  ) => {
    if (loopCount[k] !== 0) {
      setTimeout(() => {
        if (image) image.style.stroke = "white";
        if (j6 < sub.length) {
          switch (sub[j6].type) {
            case "hardware": {
              myImage = document.getElementById(`${sub[j6].id}`);
              myImage.style.stroke = "#5ed649";
              j6++;
              return this.playLoop6(
                0,
                myImage,
                originalSub,
                originalSub2,
                originalSub3,
                originalSub4,
                originalSub5,
                sub
              );
            }
            case "wait": {
              myImage = document.getElementById(`${sub[j6].id}`);
              myImage.style.stroke = "#5ed649";
              let timeArr = sub[j6].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              j6++;
              return this.playLoop6(
                time,
                myImage,
                originalSub,
                originalSub2,
                originalSub3,
                originalSub4,
                originalSub5,
                sub
              );
            }
            case "loop": {
              let sub1 = sub[j6].subprogram;
              j7 = 0;
              k++;
              loopCount = [...loopCount, sub[j6].state.times];
              this.playLoop7(
                0,
                null,
                originalSub,
                originalSub2,
                originalSub3,
                originalSub4,
                originalSub5,
                sub,
                sub1
              );
            }
            default: {
              j6++;
              break;
            }
          }
        } else {
          loopCount[k] = loopCount[k] - 1;
          j6 = 0;
          if (loopCount[k] === 0) {
            k--;
            loopCount.pop();
            return this.playLoop5(
              0,
              null,
              originalSub,
              originalSub2,
              originalSub3,
              originalSub4,
              originalSub5,
              sub
            );
          }
          return this.playLoop6(
            0,
            null,
            originalSub,
            originalSub2,
            originalSub3,
            originalSub4,
            originalSub5,
            sub
          );
        }
      }, time);
    }
  };

  playLoop7 = (
    time,
    image,
    originalSub,
    originalSub2,
    originalSub3,
    originalSub4,
    originalSub5,
    originalSub6,
    sub
  ) => {
    if (loopCount[k] !== 0) {
      setTimeout(() => {
        if (image) image.style.stroke = "white";
        if (j7 < sub.length) {
          switch (sub[j7].type) {
            case "hardware": {
              myImage = document.getElementById(`${sub[j7].id}`);
              myImage.style.stroke = "#5ed649";
              j7++;
              return this.playLoop7(
                0,
                myImage,
                originalSub,
                originalSub2,
                originalSub3,
                originalSub4,
                originalSub5,
                originalSub6,
                sub
              );
            }
            case "wait": {
              myImage = document.getElementById(`${sub[j7].id}`);
              myImage.style.stroke = "#5ed649";
              let timeArr = sub[j7].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              j7++;
              return this.playLoop7(
                time,
                myImage,
                originalSub,
                originalSub2,
                originalSub3,
                originalSub4,
                originalSub5,
                originalSub6,
                sub
              );
            }
            // case 'loop': {
            //   let sub1 = sub[j7].subprogram;
            //   j7=0;
            //   k++;
            //   loopCount = [...loopCount, sub[j7].state.times];
            //   this.playLoop8(0,null, originalSub,originalSub2,originalSub3,originalSub4,originalSub5,originalSub6,sub,sub1);
            // }
            default: {
              j7++;
              break;
            }
          }
        } else {
          loopCount[k] = loopCount[k] - 1;
          j7 = 0;
          if (loopCount[k] === 0) {
            k--;
            loopCount.pop();
            return this.playLoop6(
              0,
              null,
              originalSub,
              originalSub2,
              originalSub3,
              originalSub4,
              originalSub5,
              originalSub6,
              sub
            );
          }
          return this.playLoop7(
            0,
            null,
            originalSub,
            originalSub2,
            originalSub3,
            originalSub4,
            originalSub5,
            originalSub6,
            sub
          );
        }
      }, time);
    }
  };

  render() {
    var points = [],
      innerpoints = [],
      degree = 0;
    const { cx, onClick, hextype, highlighted, onDoubleClick, keys, id } =
      this.props;

    if (hextype != "blank") {
      console.log(`IDDDDDDDDDD       ${hextype}${keys}${cx}`);
    }

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
    // alert(window.event.clientX)
    // console.log("************************HEXTYPE", HexTypes[hextype].image);
    // console.log("hextype", hextype);
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
            id={`${keys}`}
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
