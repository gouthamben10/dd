/* eslint-disable no-fallthrough */
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
            myImage.style.stroke = "#5ed649";
            j++;
            return this.play(10, myImage);
          }
          case "wait": {
            myImage = document.getElementById(
              `${this.props.logic.program[j].id}`
            );

            myImage.style.stroke = "#5ed649";
            let timeArr = this.props.logic.program[j].state;
            let time =
              timeArr["ms"] +
              timeArr["s"] * 1000 +
              timeArr["m"] * 60 * 1000 +
              timeArr["h"] * 60 * 60 * 1000;
            j++;
            return this.play(time, myImage);
          }
          case "sensor": {
            let sub = this.props.logic.program[j].subprogram;
            if (sub.length === 0) {
              j++;
              return this.play(0);
            }
            let newSubs = sessionStorage.getItem("simulate");
            newSubs = JSON.parse(newSubs);
            let newItemval = {};
            newSubs.map((i) => {
              if (i.value) {
                newItemval[String(i.port)] = Number(i.value);
              }
            });
            let logicval = this.props.logic.program[j].state.value;
            let sourceval = this.props.logic.program[j].state.source;

            switch (this.props.logic.program[j].state.condition) {
              case "gt": {
                if (
                  logicval < newItemval[sourceval] ||
                  logicval < newItemval[sourceval[0]]
                ) {
                  if (this.props.logic.program[j].state.times) {
                    loopCount = [
                      ...loopCount,
                      this.props.logic.program[j].state.times,
                    ];
                  } else {
                    loopCount = [...loopCount, 1];
                  }
                  return this.playLoop(0, null, sub);
                }
                j++;
                if (!this.props.logic.program[j]) {
                  if (this.props.logic.end.state === "end") {
                    j = 0;
                    return;
                  } else {
                    j = 0;
                    return this.play(0);
                  }
                }
                break;
              }

              case "lt": {
                if (
                  logicval > newItemval[sourceval] ||
                  logicval > newItemval[sourceval[0]]
                ) {
                  if (this.props.logic.program[j].state.times) {
                    loopCount = [
                      ...loopCount,
                      this.props.logic.program[j].state.times,
                    ];
                  } else {
                    loopCount = [...loopCount, 1];
                  }
                  return this.playLoop(0, null, sub);
                }
                j++;
                if (!this.props.logic.program[j]) {
                  if (this.props.logic.end.state === "end") {
                    j = 0;
                    return;
                  } else {
                    j = 0;
                    return this.play(0);
                  }
                }
                break;
              }

              case "eq": {
                if (
                  logicval === newItemval[sourceval] ||
                  logicval === newItemval[sourceval[0]]
                ) {
                  if (this.props.logic.program[j].state.times) {
                    loopCount = [
                      ...loopCount,
                      this.props.logic.program[j].state.times,
                    ];
                  } else {
                    loopCount = [...loopCount, 1];
                  }
                  return this.playLoop(0, null, sub);
                }
                j++;
                if (!this.props.logic.program[j]) {
                  if (this.props.logic.end.state === "end") {
                    j = 0;
                    return;
                  } else {
                    j = 0;
                    return this.play(0);
                  }
                }
                break;
              }

              case "ne": {
                if (
                  logicval !== newItemval[sourceval] ||
                  logicval !== newItemval[sourceval[0]]
                ) {
                  if (this.props.logic.program[j].state.times) {
                    loopCount = [
                      ...loopCount,
                      this.props.logic.program[j].state.times,
                    ];
                  } else {
                    loopCount = [...loopCount, 1];
                  }
                  return this.playLoop(0, null, sub);
                }
                j++;
                if (!this.props.logic.program[j]) {
                  if (this.props.logic.end.state === "end") {
                    j = 0;
                    return;
                  } else {
                    j = 0;
                    return this.play(0);
                  }
                }
                break;
              }

              case "bw": {
                if (
                  logicval <
                    newItemval[sourceval] <
                    this.props.logic.program[j].state.value2 ||
                  logicval <
                    newItemval[sourceval[0]] <
                    this.props.logic.program[j].state.value2
                ) {
                  if (this.props.logic.program[j].state.times) {
                    loopCount = [
                      ...loopCount,
                      this.props.logic.program[j].state.times,
                    ];
                  } else {
                    loopCount = [...loopCount, 1];
                  }
                  return this.playLoop(0, null, sub);
                }
                j++;
                if (!this.props.logic.program[j]) {
                  if (this.props.logic.end.state === "end") {
                    j = 0;
                    return;
                  } else {
                    j = 0;
                    return this.play(0);
                  }
                }
                break;
              }

              default: {
                j++;
                break;
              }
            }
          }
          case "loop": {
            if (this.props.logic.program[j].type === "loop") {
              if (!this.props.logic.program[j].state.times) {
                this.props.logic.program[j].state.times = 1;
              }
              loopCount = [
                ...loopCount,
                this.props.logic.program[j].state.times,
              ];
              let sub = this.props.logic.program[j].subprogram;
              return this.playLoop(0, null, sub);
            } else {
              return this.play(0);
            }
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
              myImage.style.stroke = "#5ed649";
              let timeArr = sub[loop].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              loop++;
              return this.playLoop(time, myImage, sub);
            }
            case "loop": {
              if (sub[loop].type === "loop") {
                let sub1 = sub[loop].subprogram;
                k++;
                loopCount = [...loopCount, sub[loop].state.times];
                return this.playLoop2(0, null, sub1, sub);
              } else {
                return this.playLoop(0, null, sub);
              }
            }
            case "sensor": {
              let sub1 = sub[loop].subprogram;
              if (sub1.length === 0) {
                loop++;
                return this.playLoop(0, null, sub);
              }
              let newSubs = sessionStorage.getItem("simulate");
              newSubs = JSON.parse(newSubs);
              let newItemval = {};
              newSubs.map((i) => {
                if (i.value) {
                  newItemval[String(i.port)] = Number(i.value);
                }
              });
              let sourceval = sub[loop].state.source;

              switch (sub[loop].state.condition) {
                case "gt": {
                  if (
                    sub[loop].state.value < newItemval[sourceval] ||
                    sub[loop].state.value < newItemval[sourceval[0]]
                  ) {
                    if (sub[loop].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[loop].state.times];
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                    }
                    return this.playLoop2(0, null, sub1, sub);
                  } else {
                    loop++;
                    if (!sub[loop]) {
                      return this.playLoop(0, null, sub);
                    }
                    break;
                  }
                }

                case "lt": {
                  if (
                    sub[loop].state.value > newItemval[sourceval] ||
                    sub[loop].state.value > newItemval[sourceval[0]]
                  ) {
                    if (sub[loop].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[loop].state.times];
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                    }
                    return this.playLoop2(0, null, sub1, sub);
                  } else {
                    loop++;
                    if (!sub[loop]) {
                      return this.playLoop(0, null, sub);
                    }
                    break;
                  }
                }

                case "eq": {
                  if (
                    sub[loop].state.value === newItemval[sourceval] ||
                    sub[loop].state.value === newItemval[sourceval[0]]
                  ) {
                    if (sub[loop].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[loop].state.times];
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                    }
                    return this.playLoop2(0, null, sub1, sub);
                  } else {
                    loop++;
                    if (!sub[loop]) {
                      return this.playLoop(0, null, sub);
                    }
                    break;
                  }
                }

                case "ne": {
                  if (
                    sub[loop].state.value !== newItemval[sourceval] ||
                    sub[loop].state.value !== newItemval[sourceval[0]]
                  ) {
                    if (sub[loop].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[loop].state.times];
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                    }
                    return this.playLoop2(0, null, sub1, sub);
                  } else {
                    loop++;
                    if (!sub[loop]) {
                      return this.playLoop(0, null, sub);
                    }
                    break;
                  }
                }

                case "bw": {
                  if (
                    sub[loop].state.value >
                      newItemval[sourceval] >
                      sub[loop].state.value2 ||
                    sub[loop].state.value >
                      newItemval[sourceval[0]] >
                      sub[loop].state.value2
                  ) {
                    if (sub[loop].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[loop].state.times];
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                    }
                    return this.playLoop2(0, null, sub1, sub);
                  } else {
                    loop++;
                    if (!sub[loop]) {
                      return this.playLoop(0, null, sub);
                    }
                    break;
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
              jj++;
              if (!myImage) {
                return this.playLoop2(0, null, sub, originalSub);
              }
              myImage.style.stroke = "#5ed649";
              return this.playLoop2(0, myImage, sub, originalSub);
            }
            case "wait": {
              myImage = document.getElementById(`${sub[jj].id}`);
              // alert(sub[jj].id)
              let timeArr = sub[jj].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              if (!myImage) {
                jj++;
                return this.playLoop2(time, null, sub, originalSub);
              }
              myImage.style.stroke = "#5ed649";
              jj++;
              return this.playLoop2(time, myImage, sub, originalSub);
            }
            case "sensor": {
              let sub1 = sub[jj].subprogram;
              if (sub1.length === 0) {
                jj++;
                return this.playLoop2(0, null, sub, originalSub);
              }
              let newSubs = sessionStorage.getItem("simulate");
              newSubs = JSON.parse(newSubs);
              let newItemval = {};
              newSubs.map((i) => {
                if (i.value) {
                  newItemval[String(i.port)] = Number(i.value);
                }
              });
              let sourceval = sub[jj].state.source;

              switch (sub[jj].state.condition) {
                case "gt": {
                  if (
                    sub[jj].state.value < newItemval[sourceval] ||
                    sub[jj].state.value < newItemval[sourceval[0]]
                  ) {
                    if (sub[jj].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[jj].state.times];
                      jjj = 0;
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                      jjj = 0;
                    }
                    return this.playLoop3(0, null, originalSub, sub, sub1);
                  } else {
                    jj++;
                    if (!sub[jj]) {
                      return this.playLoop2(0, null, originalSub, sub);
                    }
                    break;
                  }
                }
                case "lt": {
                  if (
                    sub[jj].state.value > newItemval[sourceval] ||
                    sub[jj].state.value > newItemval[sourceval[0]]
                  ) {
                    if (sub[jj].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[jj].state.times];
                      jjj = 0;
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                      jjj = 0;
                    }
                    return this.playLoop3(0, null, originalSub, sub, sub1);
                  } else {
                    jj++;
                    if (!sub[jj]) {
                      return this.playLoop2(0, null, originalSub, sub);
                    }
                    break;
                  }
                }

                case "eq": {
                  if (
                    sub[jj].state.value === newItemval[sourceval] ||
                    sub[jj].state.value === newItemval[sourceval[0]]
                  ) {
                    if (sub[jj].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[jj].state.times];
                      jjj = 0;
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                      jjj = 0;
                    }
                    return this.playLoop3(0, null, originalSub, sub, sub1);
                  } else {
                    jj++;
                    if (!sub[jj]) {
                      return this.playLoop2(0, null, originalSub, sub);
                    }
                    break;
                  }
                }

                case "ne": {
                  if (
                    sub[jj].state.value !== newItemval[sourceval] ||
                    sub[jj].state.value !== newItemval[sourceval[0]]
                  ) {
                    if (sub[jj].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[jj].state.times];
                      jjj = 0;
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                      jjj = 0;
                    }
                    return this.playLoop3(0, null, originalSub, sub, sub1);
                  } else {
                    jj++;
                    if (!sub[jj]) {
                      return this.playLoop2(0, null, originalSub, sub);
                    }
                    break;
                  }
                }

                case "bw": {
                  if (
                    sub[jj].state.value < newItemval[sourceval] ||
                    sub[jj].state.value < newItemval[sourceval[0]]
                  ) {
                    if (sub[jj].state.times) {
                      k++;
                      loopCount = [...loopCount, sub[jj].state.times];
                      jjj = 0;
                    } else {
                      k++;
                      loopCount = [...loopCount, 1];
                      jjj = 0;
                    }
                    return this.playLoop3(0, null, originalSub, sub, sub1);
                  } else {
                    jj++;
                    if (!sub[jj]) {
                      return this.playLoop2(0, null, originalSub, sub);
                    }
                    break;
                  }
                }
                default: {
                  jj++;
                  break;
                }
              }
            }
            case "loop": {
              if (sub[jj].type === "loop") {
                let sub1 = sub[jj].subprogram;
                jjj = 0;
                k++;
                loopCount = [...loopCount, sub[jj].state.times];
                return this.playLoop3(0, null, originalSub, sub, sub1);
              } else {
                this.playLoop2(0, null, sub, originalSub);
              }
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
      setTimeout(() => {
        if (image) image.style.stroke = "white";
        if (jjj < sub.length) {
          switch (sub[jjj].type) {
            case "hardware": {
              myImage = document.getElementById(`${sub[jjj].id}`);
              if (!myImage) {
                jjj++;
                return this.playLoop3(0, null, originalSub, originalSub2, sub);
              }
              myImage.style.stroke = "#5ed649";
              jjj++;
              return this.playLoop3(0, myImage, originalSub, originalSub2, sub);
            }
            case "wait": {
              myImage = document.getElementById(`${sub[jjj].id}`);
              let timeArr = sub[jjj].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              jjj++;
              if (!myImage) {
                return this.playLoop3(
                  time,
                  null,
                  originalSub,
                  originalSub2,
                  sub
                );
              }
              myImage.style.stroke = "#5ed649";
              return this.playLoop3(
                time,
                myImage,
                originalSub,
                originalSub2,
                sub
              );
            }
            case "loop": {
              if (sub[jjj].type === "loop") {
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
              } else {
                return this.playLoop3(0, null, originalSub, originalSub2, sub);
              }
            }
            case "sensor": {
              let sub1 = sub[jjj].subprogram;
              if (sub1.length === 0) {
                jjj++;
                return this.playLoop3(0, null, originalSub, originalSub2, sub);
              }
              let newSubs = sessionStorage.getItem("simulate");
              newSubs = JSON.parse(newSubs);
              let newItemval = {};
              newSubs.map((i) => {
                if (i.value) {
                  newItemval[String(i.port)] = Number(i.value);
                }
              });
              let sourceval = sub[jjj].state.source;

              switch (sub[jjj].state.condition) {
                case "gt": {
                  if (
                    sub[jjj].state.value < newItemval[sourceval] ||
                    sub[jjj].state.value < newItemval[sourceval[0]]
                  ) {
                    if (sub[jjj].state.times) {
                      loopCount = [...loopCount, sub[jjj].state.times];
                      k++;
                      jjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjj = 0;
                    }
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjj++;
                    if (!sub[jjj]) {
                      return this.playLoop3(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        sub
                      );
                    }
                    break;
                  }
                }
                case "lt": {
                  if (
                    sub[jjj].state.value > newItemval[sourceval] ||
                    sub[jjj].state.value > newItemval[sourceval[0]]
                  ) {
                    if (sub[jjj].state.times) {
                      loopCount = [...loopCount, sub[jjj].state.times];
                      k++;
                      jjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjj = 0;
                    }
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjj++;
                    if (!sub[jjj]) {
                      return this.playLoop3(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        sub
                      );
                    }
                    break;
                  }
                }

                case "eq": {
                  if (
                    sub[jjj].state.value === newItemval[sourceval] ||
                    sub[jjj].state.value === newItemval[sourceval[0]]
                  ) {
                    if (sub[jjj].state.times) {
                      loopCount = [...loopCount, sub[jjj].state.times];
                      k++;
                      jjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjj = 0;
                    }
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjj++;
                    if (!sub[jjj]) {
                      return this.playLoop3(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        sub
                      );
                    }
                    break;
                  }
                }

                case "ne": {
                  if (
                    sub[jjj].state.value !== newItemval[sourceval] ||
                    sub[jjj].state.value !== newItemval[sourceval[0]]
                  ) {
                    if (sub[jjj].state.times) {
                      loopCount = [...loopCount, sub[jjj].state.times];
                      k++;
                      jjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjj = 0;
                    }
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjj++;
                    if (!sub[jjj]) {
                      return this.playLoop3(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        sub
                      );
                    }
                    break;
                  }
                }

                case "bw": {
                  if (
                    sub[jjj].state.value <
                      newItemval[sourceval] <
                      sub[jjj].state.value2 ||
                    sub[jjj].state.value <
                      newItemval[sourceval[0]] <
                      sub[jjj].state.value2
                  ) {
                    if (sub[jjj].state.times) {
                      loopCount = [...loopCount, sub[jjj].state.times];
                      k++;
                      jjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjj = 0;
                    }
                    return this.playLoop4(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjj++;
                    if (!sub[jjj]) {
                      return this.playLoop3(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        sub
                      );
                    }
                    break;
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
              jjjj++;
              if (!myImage) {
                return this.playLoop4(
                  0,
                  null,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub
                );
              }
              myImage.style.stroke = "#5ed649";
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
              let timeArr = sub[jjjj].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              jjjj++;
              if (!myImage) {
                return this.playLoop4(
                  time,
                  null,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub
                );
              }
              myImage.style.stroke = "#5ed649";
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
              if (sub[jjjj].type === "loop") {
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
              } else {
                return this.playLoop4(
                  0,
                  null,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub
                );
              }
            }
            case "sensor": {
              let sub1 = sub[jjjj].subprogram;
              if (sub1.length === 0) {
                jjjj++;
                return this.playLoop4(
                  0,
                  null,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub
                );
              }
              let newSubs = sessionStorage.getItem("simulate");
              newSubs = JSON.parse(newSubs);
              let newItemval = {};
              newSubs.map((i) => {
                if (i.value) {
                  newItemval[String(i.port)] = Number(i.value);
                }
              });
              let sourceval = sub[jjjj].state.source;

              switch (sub[jjjj].state.condition) {
                case "gt": {
                  if (
                    sub[jjjj].state.value < newItemval[sourceval] ||
                    sub[jjjj].state.value < newItemval[sourceval[0]]
                  ) {
                    if (sub[jjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjj].state.times];
                      k++;
                      jjjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjjj = 0;
                    }
                    return this.playLoop5(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjjj++;
                    if (!sub[jjjj]) {
                      return this.playLoop4(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
                  }
                }
                case "lt": {
                  if (
                    sub[jjjj].state.value > newItemval[sourceval] ||
                    sub[jjjj].state.value > newItemval[sourceval[0]]
                  ) {
                    if (sub[jjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjj].state.times];
                      k++;
                      jjjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjjj = 0;
                    }
                    return this.playLoop5(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjjj++;
                    if (!sub[jjjj]) {
                      return this.playLoop4(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
                  }
                }

                case "eq": {
                  if (
                    sub[jjjj].state.value === newItemval[sourceval] ||
                    sub[jjjj].state.value === newItemval[sourceval[0]]
                  ) {
                    if (sub[jjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjj].state.times];
                      k++;
                      jjjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjjj = 0;
                    }
                    return this.playLoop5(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjjj++;
                    if (!sub[jjjj]) {
                      return this.playLoop4(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
                  }
                }

                case "ne": {
                  if (
                    sub[jjjj].state.value !== newItemval[sourceval] ||
                    sub[jjjj].state.value !== newItemval[sourceval[0]]
                  ) {
                    if (sub[jjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjj].state.times];
                      k++;
                      jjjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjjj = 0;
                    }
                    return this.playLoop5(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjjj++;
                    if (!sub[jjjj]) {
                      return this.playLoop4(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
                  }
                }

                case "bw": {
                  if (
                    sub[jjjj].state.value <
                      newItemval[sourceval] <
                      sub[jjjj].state.value2 ||
                    sub[jjjj].state.value <
                      newItemval[sourceval[0]] <
                      sub[jjjj].state.value2
                  ) {
                    if (sub[jjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjj].state.times];
                      k++;
                      jjjjj = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      jjjjj = 0;
                    }
                    return this.playLoop5(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      sub,
                      sub1
                    );
                  } else {
                    jjjj++;
                    if (!sub[jjjj]) {
                      return this.playLoop4(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
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
              jjjjj++;
              if (!myImage) {
                return this.playLoop5(
                  0,
                  null,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub
                );
              }
              myImage.style.stroke = "#5ed649";
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
              let timeArr = sub[jjjjj].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              jjjjj++;
              if (!myImage) {
                return this.playLoop5(
                  time,
                  null,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub
                );
              }
              myImage.style.stroke = "#5ed649";
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
              if (sub[jjjjj].type === "loop") {
                let sub1 = sub[jjjjj].subprogram;
                j6 = 0;
                k++;
                loopCount = [...loopCount, sub[jjjjj].state.times];
                return this.playLoop6(
                  0,
                  null,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub,
                  sub1
                );
              } else {
                return this.playLoop5(
                  0,
                  null,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub
                );
              }
            }
            case "sensor": {
              let sub1 = sub[jjjjj].subprogram;
              if (sub1.length === 0) {
                jjjjj++;
                return this.playLoop5(
                  0,
                  null,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  sub
                );
              }
              let newSubs = sessionStorage.getItem("simulate");
              newSubs = JSON.parse(newSubs);
              let newItemval = {};
              newSubs.map((i) => {
                if (i.value) {
                  newItemval[String(i.port)] = Number(i.value);
                }
              });
              let sourceval = sub[jjjjj].state.source;

              switch (sub[jjjjj].state.condition) {
                case "gt": {
                  if (
                    sub[jjjjj].state.value <
                    (newItemval[sourceval] || newItemval[sourceval[0]])
                  ) {
                    if (sub[jjjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjjj].state.times];
                      k++;
                      j6 = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      j6 = 0;
                    }
                    return this.playLoop6(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      originalSub3,
                      sub,
                      sub1
                    );
                  } else {
                    jjjjj++;
                    if (!sub[jjjjj]) {
                      return this.playLoop5(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
                  }
                }
                case "lt": {
                  if (
                    sub[jjjjj].state.value >
                    (newItemval[sourceval] || newItemval[sourceval[0]])
                  ) {
                    if (sub[jjjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjjj].state.times];
                      k++;
                      j6 = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      j6 = 0;
                    }
                    return this.playLoop6(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      originalSub3,
                      sub,
                      sub1
                    );
                  } else {
                    jjjjj++;
                    if (!sub[jjjjj]) {
                      return this.playLoop5(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
                  }
                }

                case "eq": {
                  if (
                    sub[jjjjj].state.value ===
                    (newItemval[sourceval] || newItemval[sourceval[0]])
                  ) {
                    if (sub[jjjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjjj].state.times];
                      k++;
                      j6 = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      j6 = 0;
                    }
                    return this.playLoop6(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      originalSub3,
                      sub,
                      sub1
                    );
                  } else {
                    jjjjj++;
                    if (!sub[jjjjj]) {
                      return this.playLoop5(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
                  }
                }

                case "ne": {
                  if (
                    sub[jjjjj].state.value !==
                    (newItemval[sourceval] || newItemval[sourceval[0]])
                  ) {
                    if (sub[jjjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjjj].state.times];
                      k++;
                      j6 = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      j6 = 0;
                    }
                    return this.playLoop6(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      originalSub3,
                      sub,
                      sub1
                    );
                  } else {
                    jjjjj++;
                    if (!sub[jjjjj]) {
                      return this.playLoop5(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
                  }
                }

                case "bw": {
                  if (
                    sub[jjjjj].state.value >
                    (newItemval[sourceval] || newItemval[sourceval[0]]) >
                    sub[jjjjj].state.value2
                  ) {
                    if (sub[jjjjj].state.times) {
                      loopCount = [...loopCount, sub[jjjjj].state.times];
                      k++;
                      j6 = 0;
                    } else {
                      loopCount = [...loopCount, 1];
                      k++;
                      j6 = 0;
                    }
                    return this.playLoop6(
                      0,
                      null,
                      originalSub,
                      originalSub2,
                      originalSub3,
                      sub,
                      sub1
                    );
                  } else {
                    jjjjj++;
                    if (!sub[jjjjj]) {
                      return this.playLoop5(
                        0,
                        null,
                        originalSub,
                        originalSub2,
                        originalSub3,
                        sub
                      );
                    }
                    break;
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
              j6++;
              if (!myImage) {
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
              myImage.style.stroke = "#5ed649";
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
              let timeArr = sub[j6].state;
              let time =
                timeArr["ms"] +
                timeArr["s"] * 1000 +
                timeArr["m"] * 60 * 1000 +
                timeArr["h"] * 60 * 60 * 1000;
              j6++;
              if (!myImage) {
                return this.playLoop6(
                  time,
                  null,
                  originalSub,
                  originalSub2,
                  originalSub3,
                  originalSub4,
                  originalSub5,
                  sub
                );
              }
              myImage.style.stroke = "#5ed649";
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

  renderCompnentColor = (componentName) => {
    if (componentName == "blank") {
      return `url(#blank)`;
    }
    if (componentName == "start") {
      return `url(#start)`;
    }
    if (componentName == "active_hand") {
      return `url(#active_hand)`;
    }
    if (componentName == "condition" || componentName == "sensor") {
      return `url(#condition)`;
    }

    if (
      componentName == "end_condition" ||
      componentName == "end" ||
      componentName == "end_sensor"
    ) {
      return `url(#endRed)`;
    }

    // THIS REPEAT IS LOOP ONLY FOR IMG
    if (componentName == "repeat") {
      return `url(#repeat)`;
    }
    if (componentName == "action") {
      return `url(#action)`;
    }
    if (componentName == "loop") {
      return `url(#loop)`;
    }

    // if (componentName == "end") {
    //   return `url(#end)`;
    // }

    if (componentName == "end_loop") {
      return `url(#repeatEnd)`;
    }
    if (componentName == "delete") {
      return `url(#delete)`;
    }

    if (componentName == "insert") {
      return `url(#insert)`;
    }

    if (
      componentName == "variable_output" ||
      componentName == "hardware" ||
      componentName == "wait"
    ) {
      return `url(#variable_output)`;
    } else {
      return HexTypes[componentName].color;
    }
  };

  renderCompnentImage = (cx, r, hextype) => {
    if (hextype == "start") {
      return (
        <g transform="translate(-140.482 -1510.496) ">
          <g transform="translate(18229.627 18887)">
            <g
              transform="translate(-18072.42 -17362.699)"
              style={{ isolation: "isolate" }}
            >
              <g
                transform={`translate(${cx - r / 1.6} ${
                  -r / 3 - 20
                })  scale(2 2)`}
              >
                <path
                  d="M240.511,3325.834a.824.824,0,0,0-.825.823v6.048a.823.823,0,0,0,1.645-.015v-6.033A.822.822,0,0,0,240.511,3325.834Zm8.368,8.071a8.355,8.355,0,0,0-3.093-5.654.773.773,0,0,0-.506-.174.824.824,0,0,0-.825.825.837.837,0,0,0,.319.65,7,7,0,0,1,1,1,6.774,6.774,0,0,1-5.965,11,6.774,6.774,0,0,1-3.564-12,.848.848,0,0,0,.329-.663.828.828,0,0,0-.749-.812.748.748,0,0,0-.081,0,.815.815,0,0,0-.525.189,8.417,8.417,0,1,0,13.661,5.636Z"
                  transform="translate(-232.089 -3325.834)"
                  fill="#fff"
                />
                <path
                  d="M240.511,3325.709a.947.947,0,0,1,.945.948v6.033a.948.948,0,0,1-.919.923h-.027a.95.95,0,0,1-.948-.9v-6.052A.95.95,0,0,1,240.511,3325.709Zm0,7.654h.02a.7.7,0,0,0,.676-.677v-6.03a.7.7,0,1,0-1.395,0v6.048A.7.7,0,0,0,240.51,3333.363Zm4.792-5.411a.9.9,0,0,1,.563.2,8.544,8.544,0,0,1-4.432,15.152,8.709,8.709,0,0,1-.939.051,8.541,8.541,0,0,1-5.354-15.186.933.933,0,0,1,.6-.217.861.861,0,0,1,.095,0,.953.953,0,0,1,.86.935.976.976,0,0,1-.377.762,6.649,6.649,0,0,0,3.5,11.775,6.832,6.832,0,0,0,.705.037,6.559,6.559,0,0,0,4.174-1.485,6.659,6.659,0,0,0,.976-9.354,6.9,6.9,0,0,0-.981-.979.959.959,0,0,1-.365-.746.949.949,0,0,1,.95-.951Zm-4.808,15.155a8.465,8.465,0,0,0,.912-.05,8.294,8.294,0,0,0,4.3-14.708.653.653,0,0,0-.406-.146h-.018a.7.7,0,0,0-.7.7.71.71,0,0,0,.272.552,7.167,7.167,0,0,1,1.018,1.016,6.91,6.91,0,0,1-1.012,9.706,6.808,6.808,0,0,1-4.331,1.541,7.059,7.059,0,0,1-.731-.038,6.9,6.9,0,0,1-3.63-12.219.727.727,0,0,0,.283-.567.7.7,0,0,0-.636-.687.678.678,0,0,0-.068,0,.688.688,0,0,0-.445.16,8.292,8.292,0,0,0,5.2,14.742Z"
                  transform="translate(-232.089 -3325.834)"
                  fill="#fff"
                />
              </g>
            </g>
          </g>
        </g>
      );
    }
    if (hextype == "active_hand" || hextype == "highlighted_hand") {
      return (
        <g transform="translate(-140.482 -1510.496) ">
          <g transform="translate(18229.627 18887)">
            <g
              transform="translate(-18072.42 -17362.699)"
              style={{ isolation: "isolate" }}
            >
              <g
                transform={`translate(${cx - r / 1.95} ${
                  -r / 3 - 25
                })  scale(2 2)`}
              >
                <path
                  d="M495.358,3318.088a.459.459,0,0,1-.189.3.453.453,0,0,1-.342.078.46.46,0,0,1-.377-.531,2.584,2.584,0,0,0,0-.89,2.611,2.611,0,1,0-5.144.9.462.462,0,0,1-.346.525l-.029.005a.466.466,0,0,1-.344-.078.46.46,0,0,1-.189-.3,3.534,3.534,0,0,1,3.473-4.135,3.665,3.665,0,0,1,.6.051,3.532,3.532,0,0,1,2.89,4.075Z"
                  transform="translate(-488.345 -3313.963)"
                  fill="#fcfcfc"
                />
                <path
                  d="M488.851,3318.729a.711.711,0,0,1-.7-.587,3.784,3.784,0,0,1,3.72-4.429,3.924,3.924,0,0,1,.64.054,3.782,3.782,0,0,1,3.1,4.363.711.711,0,0,1-.291.461.7.7,0,0,1-.531.12.711.711,0,0,1-.58-.819,2.364,2.364,0,0,0-2.327-2.761,2.361,2.361,0,0,0-2.326,2.768.712.712,0,0,1-.534.811l-.048.009A.734.734,0,0,1,488.851,3318.729Zm3.018-4.516a3.288,3.288,0,0,0-3.227,3.843.209.209,0,0,0,.087.135.217.217,0,0,0,.157.035l.018,0a.213.213,0,0,0,.153-.238,2.861,2.861,0,1,1,5.637-.983,2.834,2.834,0,0,1,0,.975.211.211,0,0,0,.173.242.22.22,0,0,0,.037,0,.205.205,0,0,0,.119-.039.211.211,0,0,0,.087-.138,3.282,3.282,0,0,0-2.686-3.785A3.44,3.44,0,0,0,491.869,3314.213Z"
                  transform="translate(-488.345 -3313.963)"
                  fill="#fcfcfc"
                />
              </g>
              <g
                transform={`translate(${cx - r / 1.8} ${
                  -r / 3 - 20
                })  scale(2 2)`}
              >
                <path
                  d="M494.028,3330.977a1.471,1.471,0,0,0-1.044-.436h0a1.494,1.494,0,0,0-.651.152l-.043.021-.021-.042a1.483,1.483,0,0,0-1.972-.655l-.043.021-.021-.043a1.488,1.488,0,0,0-1.8-.728l-.064.023v-3.183a1.5,1.5,0,0,0-1.441-1.5,1.48,1.48,0,0,0-1.523,1.435v8l-.681-.714a1.5,1.5,0,0,0-2.077-.089,1.48,1.48,0,0,0-.1,2.086l.025.026,3.436,3.664a2.513,2.513,0,0,0,1.82.789h4.146a2.5,2.5,0,0,0,2.5-2.5v-5.292A1.462,1.462,0,0,0,494.028,3330.977Zm-.486,6.336a1.579,1.579,0,0,1-1.575,1.574H487.82a1.579,1.579,0,0,1-1.149-.5l-3.44-3.665a.559.559,0,0,1,.018-.788l.012-.012a.571.571,0,0,1,.792.045l1.474,1.544a.455.455,0,0,0,.325.142.462.462,0,0,0,.469-.459v-9.113a.558.558,0,0,1,.165-.394.551.551,0,0,1,.395-.162h.018a.575.575,0,0,1,.546.58c0,3.226,0,3.741-.006,4.194,0,.327,0,.611,0,1.895a.467.467,0,0,0,.934,0v-1.626a.556.556,0,0,1,1.1.093v1.526a.461.461,0,0,0,.922,0v-.848a.557.557,0,1,1,1.114,0v.848a.461.461,0,1,0,.922,0v-.169a.558.558,0,1,1,1.116,0Z"
                  transform="translate(-482.157 -3324.61)"
                  fill="#fcfcfc"
                />
                <path
                  d="M486.875,3324.36h.055a1.746,1.746,0,0,1,1.683,1.747v2.855a1.706,1.706,0,0,1,.293-.025,1.728,1.728,0,0,1,1.452.78,1.7,1.7,0,0,1,.586-.1,1.733,1.733,0,0,0,2.038.677,1.734,1.734,0,0,1,1.73,1.732v5.292a2.755,2.755,0,0,1-2.745,2.747H487.82a2.767,2.767,0,0,1-2-.868l-3.465-3.693a1.73,1.73,0,0,1,.121-2.439,1.748,1.748,0,0,1,2.425.1l.25.262v-7.388A1.721,1.721,0,0,1,486.875,3324.36Zm1.238,5.289v-3.541a1.247,1.247,0,0,0-1.2-1.248h-.038a1.238,1.238,0,0,0-1.225,1.19v8.624l-1.112-1.165a1.248,1.248,0,0,0-1.731-.074,1.23,1.23,0,0,0-.086,1.727l.025.026,3.436,3.664a2.265,2.265,0,0,0,1.639.71h4.145a2.254,2.254,0,0,0,2.245-2.247v-5.291a1.234,1.234,0,0,0-1.229-1.232,1.241,1.241,0,0,0-.542.126l-.264.13-.133-.263a1.227,1.227,0,0,0-1.1-.67,1.2,1.2,0,0,0-.539.126l-.266.133-.133-.267a1.245,1.245,0,0,0-1.1-.669,1.222,1.222,0,0,0-.4.066Zm-1.234-4.37h.03a.825.825,0,0,1,.784.831c0,2.914,0,3.6-.005,4.058v.172c0,.32,0,.622,0,1.856a.217.217,0,0,0,.434,0v-1.649l0-.023a.806.806,0,0,1,1.6.137v1.528a.211.211,0,0,0,.422,0v-.848a.807.807,0,1,1,1.614,0v.848a.211.211,0,1,0,.422,0v-.169a.808.808,0,1,1,1.616,0l0,5.292a1.83,1.83,0,0,1-1.825,1.824H487.82a1.832,1.832,0,0,1-1.332-.577l-3.44-3.665a.809.809,0,0,1,.022-1.135l.027-.027a.821.821,0,0,1,1.138.066l1.471,1.541a.206.206,0,0,0,.149.065.212.212,0,0,0,.214-.209v-9.113a.812.812,0,0,1,.239-.571A.8.8,0,0,1,486.879,3325.278Zm.01.5h-.008a.3.3,0,0,0-.219.088.311.311,0,0,0-.093.218v9.113a.712.712,0,0,1-.719.709.708.708,0,0,1-.506-.22l-1.474-1.543a.318.318,0,0,0-.237-.106.325.325,0,0,0-.2.071l-.009.009a.3.3,0,0,0-.095.214.3.3,0,0,0,.084.22l3.442,3.667a1.33,1.33,0,0,0,.967.419h4.146a1.329,1.329,0,0,0,1.325-1.325l0-5.292a.308.308,0,1,0-.616,0v.169a.711.711,0,1,1-1.422,0v-.848a.307.307,0,1,0-.614,0v.848a.711.711,0,0,1-1.422,0v-1.526a.308.308,0,0,0-.249-.3.339.339,0,0,0-.059-.005.3.3,0,0,0-.3.237v1.6a.717.717,0,0,1-1.434,0c0-1.236,0-1.539,0-1.859v-.172c0-.455.005-1.144.005-4.058A.326.326,0,0,0,486.89,3325.778Z"
                  transform="translate(-482.157 -3324.61)"
                  fill="#fcfcfc"
                />
              </g>
            </g>
          </g>
        </g>
      );
    }
    if (
      hextype == "condition" ||
      hextype == "end_condition" ||
      hextype == "sensor" ||
      hextype == "end_sensor"
    ) {
      return (
        <g transform="translate(-140.482 -1510.496) ">
          <g transform="translate(18229.627 18887)">
            <g
              transform="translate(-18072.42 -17362.699)"
              style={{ isolation: "isolate" }}
            >
              <g
                transform={`translate(${cx - r / 1.6} ${
                  -r / 3 - 20
                })  scale(2 2)`}
              >
                <path
                  d="M1132.008,3324.659l2.729,2.727-2.729,2.729a.524.524,0,0,1-.741-.741l1.464-1.464h-3.344a4.823,4.823,0,0,1-3.646-1.664l-2.426-2.8a3.783,3.783,0,0,0-2.858-1.323h-3.037a.524.524,0,0,1,0-1.047h3.047a3.786,3.786,0,0,0,2.843-1.28l2.431-2.8a4.82,4.82,0,0,1,3.646-1.666h3.342l-1.462-1.464a.524.524,0,0,1,0-.741.534.534,0,0,1,.739,0l2.729,2.729-2.729,2.727a.525.525,0,0,1-.741,0,.525.525,0,0,1,0-.739l1.464-1.464h-3.344a3.774,3.774,0,0,0-2.854,1.3l-2.433,2.8a4.7,4.7,0,0,1-1.158.965l-.274.162.272.164a4.944,4.944,0,0,1,1.165.984l2.426,2.8a3.777,3.777,0,0,0,2.856,1.3h3.344l-1.462-1.464a.521.521,0,0,1-.154-.37.513.513,0,0,1,.154-.369A.533.533,0,0,1,1132.008,3324.659Z"
                  transform="translate(-1116.897 -3312.973)"
                  fill="#fcfcfc"
                />
                <path
                  d="M1131.638,3330.518h0a.775.775,0,0,1-.547-.231.773.773,0,0,1,0-1.09l1.038-1.037h-2.74a5.073,5.073,0,0,1-3.835-1.75l-2.426-2.8a3.538,3.538,0,0,0-2.671-1.237h-3.036a.774.774,0,0,1,0-1.547h3.047a3.545,3.545,0,0,0,2.655-1.195l2.43-2.8a5.067,5.067,0,0,1,3.835-1.752h2.739l-1.036-1.037a.77.77,0,0,1,.547-1.316.777.777,0,0,1,.547.222l2.906,2.906-2.906,2.9a.773.773,0,0,1-1.094-1.093l1.037-1.037h-2.738a3.525,3.525,0,0,0-2.667,1.218l-2.434,2.8a4.943,4.943,0,0,1-1.135.966,5.193,5.193,0,0,1,1.141.982l2.426,2.8a3.526,3.526,0,0,0,2.667,1.218h2.741l-1.036-1.037a.772.772,0,0,1,1.093-1.092l2.905,2.9-2.906,2.905A.769.769,0,0,1,1131.638,3330.518Zm-14.218-9.191a.274.274,0,0,0,0,.547h3.037a4.037,4.037,0,0,1,3.048,1.411l2.425,2.8a4.573,4.573,0,0,0,3.458,1.578h3.947l-1.891,1.891a.272.272,0,0,0,0,.385.275.275,0,0,0,.2.083.272.272,0,0,0,.191-.081l2.552-2.552-2.552-2.55a.273.273,0,0,0-.193-.075.267.267,0,0,0-.273.268.272.272,0,0,0,.081.193l1.889,1.891h-3.945a4.027,4.027,0,0,1-3.047-1.391l-2.426-2.8a4.69,4.69,0,0,0-1.106-.934l-.63-.379.635-.375a4.451,4.451,0,0,0,1.1-.914l2.434-2.8a4.025,4.025,0,0,1,3.043-1.39h3.947l-1.891,1.891a.267.267,0,0,0-.079.193.271.271,0,0,0,.272.272.276.276,0,0,0,.2-.08l2.551-2.549-2.552-2.552a.273.273,0,0,0-.193-.075.269.269,0,0,0-.191.074.274.274,0,0,0,0,.388l1.889,1.891h-3.945a4.567,4.567,0,0,0-3.457,1.58l-2.432,2.8a4.048,4.048,0,0,1-3.031,1.366Z"
                  transform="translate(-1116.897 -3312.973)"
                  fill="#fcfcfc"
                />
              </g>
            </g>
          </g>
        </g>
      );
    }
    if (hextype == "loop" || hextype == "end_loop") {
      return (
        <g transform="translate(-140.482 -1510.496) ">
          <g transform="translate(18229.627 18887)">
            <g
              transform="translate(-18072.42 -17362.699)"
              style={{ isolation: "isolate" }}
            >
              <g
                transform={`translate(${cx - r / 1.5} ${
                  -r / 3 - 15
                })  scale(2 2)`}
              >
                <path
                  d="M988.224,3319.036a.475.475,0,0,1-.229.32.483.483,0,0,1-.626-.135,6.2,6.2,0,0,0-11.052,2.813l-.134.863,1.959-1.471a.479.479,0,0,1,.575.767l-2.675,2a.482.482,0,0,1-.673-.1l-2-2.675a.479.479,0,1,1,.767-.575l1.125,1.5.157-.78a7.156,7.156,0,0,1,12.72-2.925A.486.486,0,0,1,988.224,3319.036Z"
                  transform="translate(-973.27 -3315.814)"
                  fill="#fcfcfc"
                />
                <path
                  d="M982.432,3315.564h0a7.485,7.485,0,0,1,5.9,2.93.735.735,0,0,1,.138.588.725.725,0,0,1-.71.586.742.742,0,0,1-.59-.3,5.92,5.92,0,0,0-3.826-2.274,5.941,5.941,0,0,0-6.781,4.972l-.04.256,1.468-1.1a.724.724,0,0,1,.436-.145.729.729,0,0,1,.723.833.724.724,0,0,1-.284.479l-2.675,2a.732.732,0,0,1-1.023-.147l-2-2.675a.73.73,0,0,1,.583-1.167.737.737,0,0,1,.583.291l.79,1.054.047-.232A7.443,7.443,0,0,1,982.432,3315.564Zm5.329,3.6a.218.218,0,0,0,.11-.03.226.226,0,0,0,.109-.154.235.235,0,0,0-.046-.188,6.906,6.906,0,0,0-12.275,2.824l-.267,1.328-1.46-1.948a.234.234,0,0,0-.323-.044.224.224,0,0,0-.087.149.229.229,0,0,0,.043.171l2,2.675a.232.232,0,0,0,.323.046l2.674-2a.229.229,0,0,0-.275-.367l-2.45,1.84.227-1.47a6.446,6.446,0,0,1,11.5-2.926A.245.245,0,0,0,987.76,3319.168Z"
                  transform="translate(-973.27 -3315.814)"
                  fill="#fcfcfc"
                />
              </g>
              <g
                transform={`translate(${cx - r / 1.8} ${
                  -r / 3 - 0
                })  scale(2 2)`}
              >
                <path
                  d="M1007.075,3356.885a.481.481,0,0,1-.674-.075l-1.281-1.6-.142.763a7.156,7.156,0,0,1-12.745,3,.447.447,0,0,1-.08-.365.479.479,0,0,1,.233-.324.461.461,0,0,1,.237-.064.491.491,0,0,1,.392.2,6.2,6.2,0,0,0,11.045-2.746l.149-.908-1.8,1.423a.478.478,0,0,1-.772-.431.48.48,0,0,1,.178-.32l2.518-1.987a.477.477,0,0,1,.669.076l2.15,2.689A.478.478,0,0,1,1007.075,3356.885Z"
                  transform="translate(-992.142 -3353.344)"
                  fill="#fcfcfc"
                />
                <path
                  d="M1004.627,3353.094a.725.725,0,0,1,.569.273l2.15,2.689a.728.728,0,0,1-.114,1.024.731.731,0,0,1-1.025-.113l-.941-1.176-.042.227a7.4,7.4,0,0,1-7.276,6.044,7.479,7.479,0,0,1-3.264-.754,7.4,7.4,0,0,1-2.651-2.189.693.693,0,0,1-.125-.565.728.728,0,0,1,.354-.491.709.709,0,0,1,.361-.1.737.737,0,0,1,.591.3,5.927,5.927,0,0,0,3.765,2.265,6,6,0,0,0,.97.08,5.925,5.925,0,0,0,5.865-4.981l.044-.271-1.294,1.023a.728.728,0,0,1-1.175-.658.724.724,0,0,1,.269-.484l2.52-1.989A.728.728,0,0,1,1004.627,3353.094Zm2.15,3.646a.231.231,0,0,0,.144-.051.227.227,0,0,0,.083-.153.223.223,0,0,0-.048-.166l-2.15-2.69a.228.228,0,0,0-.178-.085.223.223,0,0,0-.14.049l-2.519,1.988a.228.228,0,0,0-.084.152.219.219,0,0,0,.046.168.221.221,0,0,0,.152.086h.005a.215.215,0,0,0,.165-.047l2.308-1.824-.254,1.545a6.447,6.447,0,0,1-11.491,2.857.241.241,0,0,0-.193-.1.21.21,0,0,0-.109.029.232.232,0,0,0-.115.156.2.2,0,0,0,.034.166,6.906,6.906,0,0,0,12.3-2.891l.242-1.3,1.622,2.027a.229.229,0,0,0,.155.085Z"
                  transform="translate(-992.142 -3353.344)"
                  fill="#fcfcfc"
                />
              </g>
            </g>
          </g>
        </g>
      );
    }
    if (hextype == "action") {
      return (
        <g transform="translate(-140.482 -1510.496) ">
          <g transform="translate(18229.627 18887)">
            <g
              transform="translate(-18072.42 -17362.699)"
              style={{ isolation: "isolate" }}
            >
              <g
                transform={`translate(${cx - r / 2} ${
                  -r / 3 - 15
                })  scale(2 2)`}
              >
                <path
                  d="M568.458,3326.794a5.27,5.27,0,0,0-2.878,9.686l.041.027v1.737a2.834,2.834,0,1,0,5.668,0v-1.737l.041-.027a5.268,5.268,0,0,0-2.872-9.686Zm1.982,11.45a1.981,1.981,0,1,1-3.961,0v-.52h3.961Zm.234-2.362-.02.014a.427.427,0,0,0-.214.37v.605h-1.555v-2.828l.063-.02a1.586,1.586,0,0,0,1.1-1.509.427.427,0,0,0-.853,0,.731.731,0,0,1-.728.734h0a.731.731,0,0,1-.73-.729.427.427,0,1,0-.853-.005,1.587,1.587,0,0,0,1.1,1.51l.061.02v2.826h-1.553v-.6a.429.429,0,0,0-.214-.371,4.418,4.418,0,1,1,4.407-.01Z"
                  transform="translate(-563.187 -3326.794)"
                  fill="#fcfcfc"
                />
                <path
                  d="M568.458,3326.669a5.393,5.393,0,0,1,2.956,9.906v1.669a2.959,2.959,0,1,1-5.918,0v-1.669a5.4,5.4,0,0,1,2.962-9.906Zm0,14.285a2.712,2.712,0,0,0,2.708-2.71v-1.8l.1-.064a5.144,5.144,0,1,0-5.614,0l.1.063v1.8A2.713,2.713,0,0,0,568.457,3340.954Zm.012-13.434a4.541,4.541,0,0,1,2.273,8.468l-.026.017a.3.3,0,0,0-.151.261v.73h-1.8v-3.044l.15-.047a1.463,1.463,0,0,0,1.008-1.389.3.3,0,0,0-.515-.213.3.3,0,0,0-.088.212.855.855,0,1,1-1.71.005.3.3,0,0,0-.3-.3h-.013a.3.3,0,0,0-.291.3,1.464,1.464,0,0,0,1.01,1.391l.147.047v3.042h-1.8v-.73a.306.306,0,0,0-.152-.263,4.542,4.542,0,0,1-1.684-6.2A4.559,4.559,0,0,1,568.469,3327.52Zm2.118,8.271.025-.017a4.291,4.291,0,1,0-4.283.01.556.556,0,0,1,.277.48v.48h1.3v-2.61a1.714,1.714,0,0,1-1.157-1.62.553.553,0,0,1,.541-.55h.017a.552.552,0,0,1,.546.555.605.605,0,1,0,1.21-.005.552.552,0,0,1,1.1,0,1.713,1.713,0,0,1-1.159,1.619v2.611h1.3v-.48A.551.551,0,0,1,570.587,3335.791Zm-4.233,1.808h4.211v.645a2.106,2.106,0,1,1-4.211,0Zm3.961.25H566.6v.395a1.856,1.856,0,1,0,3.711,0Z"
                  transform="translate(-563.187 -3326.794)"
                  fill="#fcfcfc"
                />
              </g>

              <g
                transform={`translate(${cx - r / 2.3} ${
                  -r / 3 - 20
                })  scale(2 2)`}
              >
                <path
                  d="M578.813,3313.477a.423.423,0,0,1-.237.223.417.417,0,0,1-.327-.011.421.421,0,0,1-.225-.238l-.321-.85a.431.431,0,0,1,.011-.327.42.42,0,0,1,.239-.223.4.4,0,0,1,.152-.029.436.436,0,0,1,.175.038.427.427,0,0,1,.223.239l.321.848A.42.42,0,0,1,578.813,3313.477Z"
                  transform="translate(-577.676 -3312.023)"
                  fill="#fcfcfc"
                />
                <path
                  d="M578.425,3313.853a.54.54,0,0,1-.228-.05.548.548,0,0,1-.289-.307l-.321-.85a.556.556,0,0,1,.014-.422.541.541,0,0,1,.31-.29.548.548,0,0,1,.71.322l.321.847a.553.553,0,0,1-.516.749Zm-.32-1.7a.275.275,0,0,0-.1.02.3.3,0,0,0-.172.158.306.306,0,0,0-.007.232l.321.849a.3.3,0,0,0,.159.168.291.291,0,0,0,.231.008.3.3,0,0,0,.176-.39l-.321-.849a.3.3,0,0,0-.281-.2Z"
                  transform="translate(-577.676 -3312.023)"
                  fill="#fcfcfc"
                />
              </g>
              <g
                transform={`translate(${cx - r / 3} ${
                  -r / 3 - 21
                })  scale(2 2)`}
              >
                <path
                  d="M591.18,3310.361v.91a.423.423,0,0,1-.125.3.4.4,0,0,1-.3.125.429.429,0,0,1-.425-.428v-.909a.427.427,0,1,1,.853,0Z"
                  transform="translate(-590.327 -3309.934)"
                  fill="#fcfcfc"
                />
                <path
                  d="M590.754,3309.809a.552.552,0,0,1,.552.552v.91a.547.547,0,0,1-.162.39.518.518,0,0,1-.4.162.555.555,0,0,1-.546-.553v-.909A.552.552,0,0,1,590.754,3309.809Zm.019,1.765a.287.287,0,0,0,.2-.09.3.3,0,0,0,.087-.212v-.91a.3.3,0,1,0-.6,0v.909a.3.3,0,0,0,.3.3h.02Z"
                  transform="translate(-590.327 -3309.934)"
                  fill="#fcfcfc"
                />
              </g>
              <g
                transform={`translate(${cx - r / 4.4} ${
                  -r / 3 - 20
                })  scale(2 2)`}
              >
                <path
                  d="M602.316,3312.349l-.32.848a.427.427,0,0,1-.552.248.427.427,0,0,1-.248-.55l.321-.85a.426.426,0,0,1,.223-.24.434.434,0,0,1,.175-.038.406.406,0,0,1,.152.029l.032-.084-.03.084A.427.427,0,0,1,602.316,3312.349Z"
                  transform="translate(-601.168 -3311.713)"
                  fill="#fcfcfc"
                />
                <path
                  d="M601.916,3311.643a.528.528,0,0,1,.2.038h0a.553.553,0,0,1,.319.713l-.319.848a.552.552,0,0,1-.713.321.553.553,0,0,1-.321-.711l.321-.849a.549.549,0,0,1,.287-.309A.561.561,0,0,1,601.916,3311.643Zm.132.281-.026-.01a.3.3,0,0,0-.23.007.3.3,0,0,0-.157.168l-.322.851a.3.3,0,0,0,.174.388.3.3,0,0,0,.392-.175l.319-.848A.3.3,0,0,0,602.048,3311.924Z"
                  transform="translate(-601.168 -3311.713)"
                  fill="#fcfcfc"
                />
              </g>
            </g>
          </g>
        </g>
      );
    }

    if (hextype == "repeat") {
      return (
        <g transform="translate(-140.482 -1510.496) ">
          <g transform="translate(18229.627 18887) ">
            <g
              transform="translate(-18072.42 -17362.699) "
              style={{ isolation: "isolate" }}
            >
              <g
                transform={`translate(${cx - r / 15} ${
                  -r / 5
                })  scale(2 2) rotate(180)`}
              >
                <path
                  d="M357.655,3334.162l-2.334,2.336a.124.124,0,0,1-.139.027.126.126,0,0,1-.081-.118v-1.849H344.18a4.491,4.491,0,0,1-3.279-1.43,4.44,4.44,0,0,1-1.184-3.382,4.536,4.536,0,0,1,4.554-4.143h7.324a.484.484,0,0,1,0,.968H344.18a3.51,3.51,0,0,0-3.493,3.826,3.571,3.571,0,0,0,3.572,3.19H355.1v-1.851a.125.125,0,0,1,.079-.118.127.127,0,0,1,.141.028l2.334,2.334A.129.129,0,0,1,357.655,3334.162Z"
                  transform="translate(-339.704 -3325.604)"
                  fill="#fcfcfc"
                />
                <path
                  d="M355.232,3336.786a.384.384,0,0,1-.146-.029.377.377,0,0,1-.235-.349v-1.6H344.18a4.742,4.742,0,0,1-3.462-1.51,4.686,4.686,0,0,1-1.251-3.57,4.787,4.787,0,0,1,4.8-4.374h7.324a.734.734,0,0,1,0,1.468H344.18a3.26,3.26,0,0,0-3.244,3.554,3.319,3.319,0,0,0,3.323,2.961h10.593v-1.6a.372.372,0,0,1,.232-.349.379.379,0,0,1,.409.077l0,0,2.334,2.334a.379.379,0,0,1,0,.535l-2.335,2.336A.373.373,0,0,1,355.232,3336.786Zm-10.962-10.932a4.286,4.286,0,0,0-4.3,3.911,4.191,4.191,0,0,0,1.118,3.194,4.241,4.241,0,0,0,3.1,1.35h11.172v1.806l2.041-2.043-2.041-2.041v1.808H344.258a3.822,3.822,0,0,1-3.821-3.418,3.76,3.76,0,0,1,3.742-4.1h7.415a.234.234,0,0,0,0-.468Z"
                  transform="translate(-339.704 -3325.604)"
                  fill="#fcfcfc"
                />
              </g>
            </g>
          </g>
        </g>
      );
    }

    if (hextype == "delete") {
      return (
        <g transform="translate(-140.482 -1510.496) ">
          <g transform="translate(18229.627 18887)">
            <g
              transform="translate(-18072.42 -17362.699)"
              style={{ isolation: "isolate" }}
            >
              <g
                transform={`translate(${cx - r / 1.8} ${
                  -r / 3 - 20
                })  scale(2 2)`}
              >
                <path
                  d="M-7419,468.367h-2.322V467.9a1.4,1.4,0,0,0-1.393-1.393h-3.715a1.394,1.394,0,0,0-1.393,1.393v.464h-2.323a1.4,1.4,0,0,0-1.393,1.393,1.4,1.4,0,0,0,.96,1.324l.829,10a1.4,1.4,0,0,0,1.388,1.278h7.578a1.4,1.4,0,0,0,1.389-1.278l.829-10a1.394,1.394,0,0,0,.959-1.324A1.394,1.394,0,0,0-7419,468.367Zm-7.895-.464a.465.465,0,0,1,.465-.464h3.715a.464.464,0,0,1,.464.464v.464h-4.644Zm6.575,13.1a.468.468,0,0,1-.463.426h-7.578a.468.468,0,0,1-.463-.426l-.816-9.853h10.137Zm1.32-10.782h-11.146a.464.464,0,0,1-.463-.464.464.464,0,0,1,.463-.464H-7419a.465.465,0,0,1,.465.464A.465.465,0,0,1-7419,470.225Z"
                  transform="translate(7431.543 -466.51)"
                  fill="#fcfcfc"
                />
                <path
                  d="M-7426.435,466.36h3.715a1.545,1.545,0,0,1,1.543,1.543v.314H-7419a1.545,1.545,0,0,1,1.543,1.543,1.54,1.54,0,0,1-.967,1.432l-.821,9.9a1.553,1.553,0,0,1-1.538,1.415h-7.578a1.551,1.551,0,0,1-1.538-1.415l-.821-9.9a1.54,1.54,0,0,1-.968-1.432,1.545,1.545,0,0,1,1.543-1.543h2.173V467.9A1.545,1.545,0,0,1-7426.435,466.36Zm5.646,15.851a1.252,1.252,0,0,0,1.239-1.14l.837-10.1.094-.031a1.24,1.24,0,0,0,.856-1.181,1.245,1.245,0,0,0-1.243-1.243h-2.472V467.9a1.245,1.245,0,0,0-1.243-1.243h-3.715a1.245,1.245,0,0,0-1.243,1.243v.614h-2.473a1.245,1.245,0,0,0-1.243,1.243,1.241,1.241,0,0,0,.857,1.181l.094.031.008.1.829,10a1.25,1.25,0,0,0,1.239,1.14Zm-5.646-14.923h3.715a.615.615,0,0,1,.614.614v.614h-4.943V467.9A.615.615,0,0,1-7426.435,467.289Zm4.029.929V467.9a.315.315,0,0,0-.314-.314h-3.715a.315.315,0,0,0-.315.314v.314Zm-7.745.929H-7419a.615.615,0,0,1,.615.614.615.615,0,0,1-.615.614h-11.146a.614.614,0,0,1-.613-.614A.614.614,0,0,1-7430.15,469.146Zm11.146.929a.315.315,0,0,0,.315-.314.315.315,0,0,0-.315-.314h-11.146a.314.314,0,0,0-.313.314.314.314,0,0,0,.313.314Zm-10.8.929h10.463l-.014.162-.816,9.853a.618.618,0,0,1-.613.564h-7.578a.618.618,0,0,1-.612-.563Zm10.137.3h-9.811l.8,9.691a.317.317,0,0,0,.313.288h7.578a.317.317,0,0,0,.314-.289Z"
                  transform="translate(7431.543 -466.51)"
                  fill="#fcfcfc"
                />
              </g>

              <g
                transform={`translate(${cx - r / 2.5} ${
                  -r / 3 - 8.5
                })  scale(2 2)`}
              >
                <path
                  d="M-7411.026,503.125l-.464-7.492a.466.466,0,0,0-.493-.435.465.465,0,0,0-.435.492l.465,7.492a.464.464,0,0,0,.463.436A.464.464,0,0,0-7411.026,503.125Z"
                  transform="translate(7412.419 -495.197)"
                  fill="#fcfcfc"
                />
                <path
                  d="M-7411.49,503.768a.615.615,0,0,1-.613-.577l-.465-7.492a.616.616,0,0,1,.575-.651.617.617,0,0,1,.652.575l.464,7.492a.617.617,0,0,1-.166.459A.609.609,0,0,1-7411.49,503.768Zm-.464-8.421h-.02a.315.315,0,0,0-.294.333l.465,7.492a.314.314,0,0,0,.313.3.312.312,0,0,0,.229-.1.31.31,0,0,0,.084-.235l-.464-7.492A.315.315,0,0,0-7411.954,495.347Z"
                  transform="translate(7412.419 -495.197)"
                  fill="#fcfcfc"
                />
              </g>

              <g
                transform={`translate(${cx - r / 3.3} ${
                  -r / 3 - 8.5
                })  scale(2 2)`}
              >
                <path
                  d="M-7397.609,495.2a.464.464,0,0,0-.465.464v7.492a.464.464,0,0,0,.465.464.465.465,0,0,0,.465-.464v-7.492A.465.465,0,0,0-7397.609,495.2Z"
                  transform="translate(7398.074 -495.198)"
                  fill="#fcfcfc"
                />
                <path
                  d="M-7397.609,495.048a.615.615,0,0,1,.615.614v7.492a.615.615,0,0,1-.615.614.615.615,0,0,1-.615-.614v-7.492A.615.615,0,0,1-7397.609,495.048Zm0,8.421a.315.315,0,0,0,.315-.314v-7.492a.315.315,0,0,0-.315-.314.315.315,0,0,0-.315.314v7.492A.315.315,0,0,0-7397.609,503.469Z"
                  transform="translate(7398.074 -495.198)"
                  fill="#fcfcfc"
                />
              </g>

              <g
                transform={`translate(${cx - r / 4.5} ${
                  -r / 3 - 8.5
                })  scale(2 2)`}
              >
                <path
                  d="M-7385.163,495.2a.464.464,0,0,0-.492.435l-.465,7.492a.465.465,0,0,0,.435.492.465.465,0,0,0,.492-.435l.464-7.492A.463.463,0,0,0-7385.163,495.2Z"
                  transform="translate(7386.122 -495.197)"
                  fill="#fcfcfc"
                />
                <path
                  d="M-7385.192,495.047h.039a.609.609,0,0,1,.422.207.611.611,0,0,1,.152.445l-.464,7.492a.614.614,0,0,1-.651.575.616.616,0,0,1-.576-.651l.465-7.493A.615.615,0,0,1-7385.192,495.047Zm-.464,8.421a.314.314,0,0,0,.313-.3l.464-7.492a.31.31,0,0,0-.077-.227.312.312,0,0,0-.216-.106.314.314,0,0,0-.333.294l-.465,7.493a.315.315,0,0,0,.294.333Z"
                  transform="translate(7386.122 -495.197)"
                  fill="#fcfcfc"
                />
              </g>
            </g>
          </g>
        </g>
      );
    }

    if (hextype == "insert") {
      return (
        <g transform="translate(-140.482 -1510.496) ">
          <g transform="translate(18229.627 18887)">
            <g
              transform="translate(-18072.42 -17362.699)"
              style={{ isolation: "isolate" }}
            >
              <rect
                width="14"
                height="2"
                rx="1"
                transform={`translate(${cx - r / 1.8} ${
                  -r / 3 - 0
                })  scale(2 2)`}
                fill="#fff"
              />
              <rect
                width="14"
                height="2"
                rx="1"
                transform={`translate(${cx - r / 3} ${
                  -r / 3 - -15
                })  scale(2 2) rotate(-90)`}
                fill="#fff"
              />
            </g>
          </g>
        </g>
      );
    }

    if (hextype == "end") {
      return (
        <g transform="translate(-140.482 -1510.496) ">
          <g transform="translate(18229.627 18887)">
            <g
              transform="translate(-18072.42 -17362.699)"
              style={{ isolation: "isolate" }}
            >
              <g
                transform={`translate(${cx - r / 1.6} ${
                  -r / 3 - 20
                })  scale(2 2)`}
              >
                <path
                  d="M1286.4,3317a8.648,8.648,0,1,0,0,12.23A8.651,8.651,0,0,0,1286.4,3317Zm-11.513.719a7.652,7.652,0,0,1,8-1.786l-8.451,12.084A7.634,7.634,0,0,1,1274.884,3317.719Zm.262,11.042,8.679-12.411a7.655,7.655,0,0,1,1.786,1.3h0L1276.976,3330A7.583,7.583,0,0,1,1275.146,3328.761Zm10.53-.251a7.651,7.651,0,0,1-7.732,1.876l8.362-11.96A7.636,7.636,0,0,1,1285.677,3328.51Z"
                  transform="translate(-1271.634 -3314.469)"
                  fill="#fcfcfc"
                />
                <path
                  d="M1280.283,3314.219a8.9,8.9,0,1,1-6.292,2.6A8.842,8.842,0,0,1,1280.283,3314.219Zm0,17.3a8.4,8.4,0,1,0-5.938-2.46A8.344,8.344,0,0,0,1280.283,3331.514Zm.009-16.282a7.886,7.886,0,0,1,2.673.466l.308.111-8.825,12.62-.21-.25a7.885,7.885,0,0,1,6.054-12.946Zm2.192.832a7.388,7.388,0,0,0-8.068,11.537Zm1.263-.037.195.1a7.9,7.9,0,0,1,1.771,1.273h.379l-.273.393-8.76,12.523-.192-.093a7.822,7.822,0,0,1-1.89-1.28l-.161-.148Zm1.538,1.66a7.389,7.389,0,0,0-1.383-1.01l-8.424,12.046a7.314,7.314,0,0,0,1.416.958Zm1.011.319.208.268a7.891,7.891,0,0,1-8.635,12.352l-.324-.1.195-.278Zm-6.027,12.493a7.387,7.387,0,0,0,6.044-11.644l-7.964,11.39A7.386,7.386,0,0,0,1280.269,3330.5Z"
                  transform="translate(-1271.634 -3314.469)"
                  fill="#fcfcfc"
                />
              </g>
            </g>
          </g>
        </g>
      );
    }
    if (hextype == "wait") {
      return (
        <g transform="translate(-140.482 -1510.496) ">
          <g transform="translate(18229.627 18887)">
            <g
              transform="translate(-18072.42 -17362.699)"
              style={{ isolation: "isolate" }}
            >
              <g
                transform={`translate(${cx - r / 1.7} ${
                  -r / 3 - 20
                })  scale(2 2)`}
              >
                <path
                  d="M790.513,3313.954a7.475,7.475,0,0,0-1.5-1.513l.691-1.2a.339.339,0,0,0-.125-.463l-1.031-.592a.34.34,0,0,0-.463.123l-.689,1.2a7.439,7.439,0,0,0-1.936-.521v-.6h.423a.338.338,0,0,0,.338-.338v-1.188a.338.338,0,0,0-.338-.339h-2.715a.338.338,0,0,0-.337.339v1.188a.337.337,0,0,0,.337.336h.425v.6a7.338,7.338,0,0,0-1.936.518l-.691-1.2a.333.333,0,0,0-.461-.125l-1.031.592a.334.334,0,0,0-.16.2.338.338,0,0,0,.035.258l.692,1.206a7.441,7.441,0,1,0,10.471,1.511Zm-2.007-3.013.443.256-.5.862c-.144-.09-.293-.175-.443-.255Zm-5-1.231v-.51h2.039v.51Zm1.275.678v.552c-.085,0-.168-.007-.255-.007s-.17,0-.255,0v-.548Zm-4.234.553.5.861c-.151.08-.3.167-.442.255l-.5-.86Zm3.979,14.205a6.767,6.767,0,1,1,6.767-6.767A6.717,6.717,0,0,1,784.528,3325.146Z"
                  transform="translate(-777.09 -3308.523)"
                  fill="#fcfcfc"
                />
                <path
                  d="M783.169,3308.4h2.715a.464.464,0,0,1,.463.464v1.188a.464.464,0,0,1-.463.463h-.3v.368a7.562,7.562,0,0,1,1.757.473l.634-1.106a.469.469,0,0,1,.4-.232h0a.459.459,0,0,1,.232.063l1.029.591a.466.466,0,0,1,.217.283.457.457,0,0,1-.047.352l-.636,1.1a7.6,7.6,0,0,1,1.437,1.471,7.564,7.564,0,0,1-6.076,12.063,7.557,7.557,0,0,1-6.093-3.064,7.575,7.575,0,0,1,1.435-10.468l-.638-1.111a.463.463,0,0,1-.047-.352.457.457,0,0,1,.22-.281l1.029-.591a.458.458,0,0,1,.633.174l.635,1.1a7.465,7.465,0,0,1,1.758-.47v-.369h-.3a.462.462,0,0,1-.462-.461v-1.188A.463.463,0,0,1,783.169,3308.4Zm2.715,1.865a.213.213,0,0,0,.213-.213v-1.188a.214.214,0,0,0-.213-.214h-2.715a.213.213,0,0,0-.212.214v1.188a.212.212,0,0,0,.212.211h.55v.839l-.109.014a7.216,7.216,0,0,0-1.9.509l-.1.043-.746-1.294a.209.209,0,0,0-.129-.1.205.205,0,0,0-.161.022l-1.032.593a.208.208,0,0,0-.079.29l.748,1.3-.088.066a7.313,7.313,0,0,0,4.415,13.15,7.318,7.318,0,0,0,5.88-11.665,7.355,7.355,0,0,0-1.474-1.488l-.088-.066.746-1.295a.209.209,0,0,0,.022-.161.217.217,0,0,0-.1-.132l-1.03-.591a.211.211,0,0,0-.107-.029.217.217,0,0,0-.187.107l-.743,1.3-.1-.043a7.311,7.311,0,0,0-1.9-.512l-.109-.014v-.837Zm-2.5-1.188h2.289v.76h-2.289Zm2.039.25h-1.789v.26h1.789Zm-1.273.938h.76v.807l-.135-.005c-.084,0-.162-.007-.245-.007s-.168,0-.25,0l-.13.005Zm4.313.507.659.381-.623,1.082-.11-.068c-.137-.085-.283-.17-.435-.251l-.114-.061Zm.318.472-.226-.131-.37.643q.116.064.226.13Zm-8.183-.472.626,1.082-.115.061c-.13.068-.268.148-.435.251l-.109.067-.625-1.08Zm.28.984-.371-.642-.226.131.371.642C780.729,3311.836,780.8,3311.793,780.875,3311.754Zm3.653-.266a6.891,6.891,0,1,1-6.893,6.892A6.9,6.9,0,0,1,784.528,3311.488Zm0,13.533a6.643,6.643,0,1,0-4.7-1.945A6.649,6.649,0,0,0,784.528,3325.021Z"
                  transform="translate(-777.09 -3308.523)"
                  fill="#fcfcfc"
                />
              </g>

              <g
                transform={`translate(${cx - r / 1.95} ${
                  -r / 3 - 11
                })  scale(1.8 1.8)`}
              >
                <path
                  d="M797.344,3334.805c-.005-.01-.01-.023-.023-.043l-.009-.012a5.88,5.88,0,0,0-2.056-2.049l-.056-.031a5.793,5.793,0,0,0-5.779.01l-.054.032a5.818,5.818,0,0,0-2.042,2.052.27.27,0,0,0-.042.068,5.785,5.785,0,0,0,.016,5.769l.01.026a.1.1,0,0,0,.024.037,5.851,5.851,0,0,0,2.053,2.042l.045.032h.01a5.8,5.8,0,0,0,5.785-.013l.033-.015c.009-.007.016-.011.016-.013a5.855,5.855,0,0,0,2.054-2.066l.016-.021a.31.31,0,0,0,.016-.035l.005-.014A5.789,5.789,0,0,0,797.344,3334.805Zm-.432,5.168-.475-.275a.341.341,0,0,0-.463.125.338.338,0,0,0,.125.461l.475.274a5.156,5.156,0,0,1-1.376,1.381l-.278-.474a.339.339,0,0,0-.586.342l.279.473a5.129,5.129,0,0,1-1.954.529v-.55a.337.337,0,1,0-.675,0v.552a5.161,5.161,0,0,1-1.928-.521l.276-.476a.338.338,0,0,0-.382-.5.337.337,0,0,0-.207.158l-.274.476a5.1,5.1,0,0,1-1.385-1.377l.472-.278a.337.337,0,0,0-.08-.619.347.347,0,0,0-.259.034l-.474.277a5.14,5.14,0,0,1-.529-1.953h.553a.337.337,0,0,0,0-.675h-.552a5.112,5.112,0,0,1,.519-1.928l.475.276a.338.338,0,0,0,.462-.125.34.34,0,0,0-.123-.461l-.475-.274a5.12,5.12,0,0,1,1.376-1.385l.278.472a.336.336,0,0,0,.2.158.339.339,0,0,0,.415-.237.337.337,0,0,0-.033-.259l-.278-.474a5.157,5.157,0,0,1,1.952-.529v.554a.338.338,0,0,0,.677,0v-.552a5.016,5.016,0,0,1,1.926.519l-.276.476a.339.339,0,1,0,.586.338l.276-.475a5.121,5.121,0,0,1,1.385,1.377l-.474.277a.338.338,0,1,0,.338.585l.474-.278a5.111,5.111,0,0,1,.529,1.954h-.552a.329.329,0,0,0-.238.1.338.338,0,0,0,.238.577h.552A5.113,5.113,0,0,1,796.912,3339.974Z"
                  transform="translate(-786.522 -3331.902)"
                  fill="#fcfcfc"
                />
                <path
                  d="M792.318,3331.777h0a5.917,5.917,0,0,1,2.945.784l.054.03a6,6,0,0,1,2.1,2.09l.011.017c.011.019.018.033.023.044l0,0a5.913,5.913,0,0,1,.026,5.867h0a.255.255,0,0,1-.016.038l-.018.032-.011.015a5.982,5.982,0,0,1-2.083,2.1l-.008.006-.015.012-.02.009-.011.005-.012.006a5.923,5.923,0,0,1-5.875.026h-.017l-.073-.052a5.974,5.974,0,0,1-2.084-2.07.234.234,0,0,1-.04-.064l-.008-.02a5.906,5.906,0,0,1-.015-5.88.384.384,0,0,1,.05-.083,5.925,5.925,0,0,1,2.081-2.089l.054-.032A5.888,5.888,0,0,1,792.318,3331.777Zm4.9,3.052-.011-.016a5.748,5.748,0,0,0-2.012-2.006l-.053-.029a5.668,5.668,0,0,0-2.823-.751h0a5.636,5.636,0,0,0-2.833.76l-.053.031a5.674,5.674,0,0,0-2,2.008l-.011.017a.141.141,0,0,0-.023.037l-.007.013a5.655,5.655,0,0,0,.015,5.644l.008.016.009.021.007.006.011.018a5.721,5.721,0,0,0,2.009,2l.054.031a5.673,5.673,0,0,0,5.66-.012l.048-.027a5.732,5.732,0,0,0,2.01-2.022l.016-.023,0,0,.017-.041a5.663,5.663,0,0,0-.022-5.63l-.009-.018Zm-5.1-2.367v.688a.213.213,0,0,0,.427,0v-.685l.133.009a5.143,5.143,0,0,1,1.974.531l.119.059-.343.591a.213.213,0,0,0,.241.313.213.213,0,0,0,.129-.1l.343-.591.111.074a5.244,5.244,0,0,1,1.418,1.411l.075.111-.589.345a.213.213,0,0,0-.078.291.212.212,0,0,0,.291.078l.588-.345.06.119a5.255,5.255,0,0,1,.542,2l.009.133h-.685a.2.2,0,0,0-.148.061.213.213,0,0,0,.148.364h.685l-.009.133a5.256,5.256,0,0,1-.532,1.975l-.059.119-.591-.342a.216.216,0,0,0-.292.079.213.213,0,0,0,.079.291l.592.342-.075.111a5.29,5.29,0,0,1-1.409,1.414l-.111.075-.345-.589a.218.218,0,0,0-.187-.106.211.211,0,0,0-.107.029.215.215,0,0,0-.077.293l.347.588-.12.06a5.275,5.275,0,0,1-2,.542l-.133.009v-.683a.212.212,0,1,0-.425,0v.686l-.133-.009A5.3,5.3,0,0,1,790,3342.4l-.12-.059.343-.591a.213.213,0,0,0-.242-.312.21.21,0,0,0-.13.1l-.341.591-.111-.074a5.23,5.23,0,0,1-1.418-1.411l-.075-.11.587-.346a.21.21,0,0,0,.1-.129.212.212,0,0,0-.15-.261.225.225,0,0,0-.165.023l-.586.343-.06-.119a5.283,5.283,0,0,1-.542-2l-.009-.133h.685a.212.212,0,0,0,.213-.211.211.211,0,0,0-.212-.213h-.685l.009-.133a5.252,5.252,0,0,1,.531-1.975l.059-.12.591.343a.208.208,0,0,0,.1.028.214.214,0,0,0,.186-.107.215.215,0,0,0-.077-.291l-.591-.341.075-.111a5.243,5.243,0,0,1,1.409-1.418l.11-.075.345.587a.211.211,0,0,0,.129.1.213.213,0,0,0,.262-.148.212.212,0,0,0-.021-.166l-.344-.588.119-.06a5.3,5.3,0,0,1,2-.542Zm.213,1.149a.463.463,0,0,1-.463-.461v-.418a5.054,5.054,0,0,0-1.651.448l.209.357a.466.466,0,0,1,.046.355.455.455,0,0,1-.216.28.463.463,0,0,1-.632-.171l-.208-.354a4.992,4.992,0,0,0-1.157,1.164l.358.206a.465.465,0,0,1,.169.632.464.464,0,0,1-.4.233.459.459,0,0,1-.23-.062l-.358-.208a5.009,5.009,0,0,0-.438,1.627h.416a.462.462,0,0,1,0,.925h-.418a5.041,5.041,0,0,0,.447,1.652l.357-.209a.477.477,0,0,1,.353-.047.462.462,0,0,1,.327.568.457.457,0,0,1-.216.28l-.354.209a4.973,4.973,0,0,0,1.164,1.158l.206-.358a.467.467,0,0,1,.634-.171.469.469,0,0,1,.172.633l-.209.36a5.058,5.058,0,0,0,1.627.439v-.416a.462.462,0,1,1,.925,0v.415a5.025,5.025,0,0,0,1.652-.448l-.21-.356a.464.464,0,0,1,.8-.469l.209.357a5.03,5.03,0,0,0,1.156-1.16l-.358-.207a.463.463,0,0,1-.171-.632.452.452,0,0,1,.284-.217.446.446,0,0,1,.119-.016.466.466,0,0,1,.23.062l.359.208a5.009,5.009,0,0,0,.438-1.626h-.416a.463.463,0,0,1-.326-.79.453.453,0,0,1,.326-.135h.417a5.012,5.012,0,0,0-.448-1.653l-.357.209a.463.463,0,0,1-.679-.521.457.457,0,0,1,.216-.28l.356-.208a4.992,4.992,0,0,0-1.164-1.158l-.208.358a.464.464,0,1,1-.8-.463l.208-.359a4.892,4.892,0,0,0-1.625-.437v.417A.463.463,0,0,1,792.328,3333.611Z"
                  transform="translate(-786.522 -3331.902)"
                  fill="#fcfcfc"
                />
              </g>

              <g
                transform={`translate(${cx - r / 2.9} ${
                  -r / 3 - 7
                })  scale(1.5 1.5)`}
              >
                <path
                  d="M817.638,3346.5h-2.356a1.253,1.253,0,0,0-.852-.852v-2.358a.334.334,0,0,0-.1-.238.338.338,0,0,0-.576.24v2.356a1.238,1.238,0,0,0-.326,2.237,1.223,1.223,0,0,0,.933.163,1.243,1.243,0,0,0,.921-.871h2.358a.338.338,0,0,0,0-.677Zm-3.552.9h-.062a.593.593,0,1,1,.062,0Z"
                  transform="translate(-812.854 -3342.954)"
                  fill="#fcfcfc"
                />
                <path
                  d="M814.09,3348.2a1.364,1.364,0,0,1-.46-2.647v-2.265a.465.465,0,0,1,.461-.463h.007a.467.467,0,0,1,.321.135.46.46,0,0,1,.136.326v2.268a1.387,1.387,0,0,1,.818.817h2.266a.463.463,0,0,1,0,.927h-2.268a1.369,1.369,0,0,1-1.285.9Zm.008-5.125h-.005a.214.214,0,0,0-.213.213v2.45l-.091.026a1.113,1.113,0,1,0,1.374,1.374l.026-.091h2.452a.213.213,0,0,0,.21-.214.215.215,0,0,0-.213-.213h-2.45l-.026-.09a1.132,1.132,0,0,0-.767-.767l-.09-.026v-2.452a.208.208,0,0,0-.062-.15A.217.217,0,0,0,814.1,3343.079Zm-.012,4.441h-.076a.717.717,0,1,1,.076,0Zm-.055-.25h.055a.41.41,0,1,0-.055,0Z"
                  transform="translate(-812.854 -3342.954)"
                  fill="#fcfcfc"
                />
              </g>
            </g>
          </g>
        </g>
      );
    }

    if (hextype == "hardware") {
      return (
        <g transform="translate(-140.482 -1510.496) ">
          <g transform="translate(18229.627 18887)">
            <g
              transform="translate(-18072.42 -17362.699)"
              style={{ isolation: "isolate" }}
            >
              <g
                transform={`translate(${cx - r / 1.63} ${
                  -r / 3 - 4.5
                })  scale(2 2)`}
              >
                <path
                  d="M664.213,3359.79a2.995,2.995,0,1,0-.026,2.294A2.979,2.979,0,0,0,664.213,3359.79Zm-.643,2.029-.088.206V3362a2.324,2.324,0,0,1-2.048,1.225,2.293,2.293,0,0,1-.907-.185,2.318,2.318,0,1,1,3.042-1.22Z"
                  transform="translate(-658.44 -3357.914)"
                  fill="#fcfcfc"
                />
                <path
                  d="M661.44,3357.789a3.116,3.116,0,0,1,2.862,4.343,3.119,3.119,0,0,1-2.872,1.893,3.118,3.118,0,0,1,.01-6.237Zm-.01,5.987a2.868,2.868,0,0,0,1.131-5.506,2.833,2.833,0,0,0-1.121-.23,2.868,2.868,0,0,0-1.13,5.506A2.835,2.835,0,0,0,661.43,3363.776Zm.009-5.314a2.446,2.446,0,0,1,2.265,1.532,2.46,2.46,0,0,1-.019,1.874l-.088.206-.012,0a2.44,2.44,0,0,1-2.151,1.278,2.412,2.412,0,0,1-.956-.195,2.444,2.444,0,0,1,.961-4.693Zm1.942,3.481.074-.173a2.209,2.209,0,0,0,.017-1.682,2.194,2.194,0,1,0-2.9,2.837,2.161,2.161,0,0,0,.858.175,2.19,2.19,0,0,0,1.937-1.159Z"
                  transform="translate(-658.44 -3357.914)"
                  fill="#fcfcfc"
                />
              </g>
              <g
                transform={`translate(${cx - r / 1.4} ${
                  -r / 3 - 10
                })  scale(2 2)`}
              >
                <path
                  d="M654.734,3349.853l-.852-.362.007-.035a4.6,4.6,0,0,0,.015-1.427l-.005-.035.857-.344a.338.338,0,0,0,.185-.439l-.562-1.4a.337.337,0,0,0-.438-.187l-.855.344-.022-.029a4.625,4.625,0,0,0-1-1.02l-.029-.022.363-.848a.333.333,0,0,0,0-.259.341.341,0,0,0-.179-.185l-1.388-.592a.336.336,0,0,0-.256,0,.328.328,0,0,0-.185.179l-.363.85-.035-.005a4.6,4.6,0,0,0-1.427-.015l-.037.006-.344-.856a.339.339,0,0,0-.438-.188l-1.4.564a.337.337,0,0,0-.187.438l.344.855-.029.022a4.577,4.577,0,0,0-1.018,1l-.022.029-.848-.363a.34.34,0,0,0-.443.178l-.592,1.388a.34.34,0,0,0,0,.258.352.352,0,0,0,.181.185l.848.361-.006.037a4.6,4.6,0,0,0-.013,1.427l.005.036-.855.342a.34.34,0,0,0-.189.438l.564,1.4a.336.336,0,0,0,.438.187l.855-.344.022.029a4.6,4.6,0,0,0,1,1.021l.029.021-.363.848a.338.338,0,0,0,.178.443l1.386.59a.337.337,0,0,0,.443-.176l.363-.85.035.006a4.608,4.608,0,0,0,1.427.014l.037-.006.344.857a.336.336,0,0,0,.438.187l1.4-.562a.338.338,0,0,0,.187-.438l-.346-.855.029-.022a4.606,4.606,0,0,0,1.018-1l.022-.029.848.363a.337.337,0,0,0,.443-.176l.592-1.39A.336.336,0,0,0,654.734,3349.853Zm-.9,1.253-.791-.337a.336.336,0,0,0-.414.126,4.047,4.047,0,0,1-1.258,1.235.338.338,0,0,0-.136.412l.321.8-.773.312-.321-.8a.336.336,0,0,0-.311-.213.284.284,0,0,0-.07.008,4.034,4.034,0,0,1-1.764-.019.333.333,0,0,0-.388.2l-.337.793-.767-.328.337-.791a.336.336,0,0,0-.126-.414,4.02,4.02,0,0,1-1.233-1.258.341.341,0,0,0-.414-.136l-.8.317-.311-.775.8-.321a.337.337,0,0,0,.2-.383,4,4,0,0,1,.018-1.762.335.335,0,0,0-.2-.388l-.791-.339.328-.766.791.337a.336.336,0,0,0,.414-.127,4.033,4.033,0,0,1,1.26-1.234.337.337,0,0,0,.134-.412l-.322-.8.775-.312.32.8a.335.335,0,0,0,.383.2,4.042,4.042,0,0,1,1.764.018.336.336,0,0,0,.388-.2l.337-.792.767.326-.339.791a.337.337,0,0,0,.128.416,4,4,0,0,1,1.233,1.258.338.338,0,0,0,.412.135l.8-.322.311.775-.8.326a.334.334,0,0,0-.2.383,4.025,4.025,0,0,1-.018,1.762.335.335,0,0,0,.2.388l.791.337Z"
                  transform="translate(-643.499 -3342.956)"
                  fill="#fcfcfc"
                />
                <path
                  d="M650.592,3354.552a.463.463,0,0,1-.429-.291l-.307-.765a4.738,4.738,0,0,1-1.342-.013l-.324.76a.462.462,0,0,1-.608.241l-1.385-.589a.464.464,0,0,1-.244-.607l.324-.758a4.72,4.72,0,0,1-.939-.96l-.765.308a.458.458,0,0,1-.172.034.463.463,0,0,1-.429-.29l-.564-1.4a.466.466,0,0,1,.258-.6l.765-.306a4.726,4.726,0,0,1,.012-1.344l-.758-.323a.478.478,0,0,1-.248-.252.467.467,0,0,1,0-.355l.592-1.389a.465.465,0,0,1,.606-.244l.759.325a4.694,4.694,0,0,1,.958-.941l-.308-.765a.462.462,0,0,1,.256-.6l1.4-.564a.464.464,0,0,1,.6.258l.308.765a4.717,4.717,0,0,1,1.342.014l.325-.76a.452.452,0,0,1,.254-.247.461.461,0,0,1,.351.005l1.389.592a.464.464,0,0,1,.246.254.456.456,0,0,1,0,.353l-.324.759a4.746,4.746,0,0,1,.939.96l.765-.308a.461.461,0,0,1,.6.256l.563,1.4a.463.463,0,0,1-.254.6l-.766.308a4.729,4.729,0,0,1-.014,1.341l.76.323a.462.462,0,0,1,.242.606l-.591,1.39a.462.462,0,0,1-.607.242l-.759-.325a4.725,4.725,0,0,1-.958.939l.31.765a.465.465,0,0,1-.256.6l-1.4.563A.456.456,0,0,1,650.592,3354.552Zm-.578-1.332.381.949a.212.212,0,0,0,.2.133.207.207,0,0,0,.078-.015l1.4-.562a.214.214,0,0,0,.117-.276l-.382-.943.106-.08a4.486,4.486,0,0,0,.993-.973l.081-.108.938.4a.221.221,0,0,0,.164,0,.216.216,0,0,0,.116-.114l.591-1.388a.212.212,0,0,0-.11-.278l-.945-.4.028-.133a4.48,4.48,0,0,0,.014-1.385l-.021-.132.95-.381a.209.209,0,0,0,.114-.114.212.212,0,0,0,0-.163l-.562-1.4a.212.212,0,0,0-.2-.133.207.207,0,0,0-.078.015l-.945.38-.08-.106a4.513,4.513,0,0,0-.973-1l-.108-.081.4-.938a.206.206,0,0,0,0-.162.216.216,0,0,0-.114-.119l-1.387-.591a.213.213,0,0,0-.161,0,.205.205,0,0,0-.116.112l-.4.939-.13-.019a4.473,4.473,0,0,0-1.391-.015l-.133.021-.382-.948a.216.216,0,0,0-.2-.134.21.21,0,0,0-.077.015l-1.4.564a.212.212,0,0,0-.118.275l.38.945-.106.08a4.46,4.46,0,0,0-.993.975l-.082.108-.938-.4a.217.217,0,0,0-.082-.016.213.213,0,0,0-.2.129l-.592,1.388a.216.216,0,0,0,0,.164.226.226,0,0,0,.116.117l.935.4-.02.133a4.482,4.482,0,0,0-.013,1.39l.02.134-.947.379a.215.215,0,0,0-.119.276l.564,1.4a.211.211,0,0,0,.275.117l.945-.38.079.106a4.486,4.486,0,0,0,.973.995l.109.08-.4.94a.214.214,0,0,0,.112.279l1.386.589a.212.212,0,0,0,.28-.111l.4-.94.132.022a4.494,4.494,0,0,0,1.388.014Zm.694.595-.367-.915a.21.21,0,0,0-.2-.134.159.159,0,0,0-.039,0,4.158,4.158,0,0,1-1.823-.018.23.23,0,0,0-.051-.006.205.205,0,0,0-.193.128l-.386.91-1-.427.386-.906a.209.209,0,0,0-.079-.26,4.144,4.144,0,0,1-1.272-1.3.218.218,0,0,0-.262-.085l-.914.363-.4-1.007.917-.367a.213.213,0,0,0,.127-.241,4.127,4.127,0,0,1,.019-1.817.21.21,0,0,0-.123-.244l-.907-.388.426-1,.906.386a.217.217,0,0,0,.083.017.208.208,0,0,0,.176-.1,4.16,4.16,0,0,1,1.3-1.273.212.212,0,0,0,.083-.259l-.369-.914,1.007-.405.367.915a.209.209,0,0,0,.2.133.2.2,0,0,0,.045,0,4.19,4.19,0,0,1,1.819.019.212.212,0,0,0,.245-.124l.386-.906,1,.425-.388.906a.213.213,0,0,0,.081.261,4.128,4.128,0,0,1,1.271,1.3.212.212,0,0,0,.259.085l.914-.369.4,1.006-.916.373a.21.21,0,0,0-.128.24,4.148,4.148,0,0,1-.019,1.817.211.211,0,0,0,.123.244l.907.386-.426,1-.906-.386a.209.209,0,0,0-.083-.017h0a.208.208,0,0,0-.177.1,4.172,4.172,0,0,1-1.3,1.273.212.212,0,0,0-.085.26l.367.914Zm-.562-1.3a.459.459,0,0,1,.427.291l.274.682.541-.218-.274-.682a.463.463,0,0,1,.186-.565,3.919,3.919,0,0,0,1.219-1.2.461.461,0,0,1,.568-.174l.676.288.23-.537-.676-.288a.46.46,0,0,1-.269-.532,3.9,3.9,0,0,0,.018-1.707.458.458,0,0,1,.28-.525l.684-.279-.218-.543-.683.275a.462.462,0,0,1-.565-.186,3.881,3.881,0,0,0-1.194-1.219.462.462,0,0,1-.176-.569l.29-.677-.537-.228-.288.677a.463.463,0,0,1-.424.281.456.456,0,0,1-.109-.013,3.937,3.937,0,0,0-1.708-.017.472.472,0,0,1-.1.01.457.457,0,0,1-.427-.29l-.274-.682-.543.219.276.682a.462.462,0,0,1-.184.565,3.91,3.91,0,0,0-1.221,1.2.457.457,0,0,1-.387.211.466.466,0,0,1-.181-.037l-.677-.289-.229.536.676.289a.46.46,0,0,1,.268.532,3.877,3.877,0,0,0-.018,1.707.463.463,0,0,1-.279.525l-.684.274.218.543.683-.271a.47.47,0,0,1,.172-.033.465.465,0,0,1,.394.218,3.894,3.894,0,0,0,1.195,1.22.459.459,0,0,1,.174.568l-.288.676.537.23.288-.678a.457.457,0,0,1,.423-.282.469.469,0,0,1,.109.013,3.919,3.919,0,0,0,1.709.018A.4.4,0,0,1,650.146,3352.516Z"
                  transform="translate(-643.499 -3342.956)"
                  fill="#fcfcfc"
                />
              </g>
              <g
                transform={`translate(${cx - r / 2.55} ${
                  -r / 3 - 22.5
                })  scale(2 2)`}
              >
                <path
                  d="M699.8,3314.659h-.606l-.009-.035a3.428,3.428,0,0,0-.348-.85l-.016-.03.429-.43a.336.336,0,0,0,0-.476l-.782-.784a.338.338,0,0,0-.476,0l-.43.431-.031-.019a3.534,3.534,0,0,0-.848-.348l-.035-.009v-.608a.334.334,0,0,0-.335-.337H695.2a.357.357,0,0,0-.238.1.326.326,0,0,0-.1.236v.61l-.035.009a3.534,3.534,0,0,0-.848.348l-.031.019-.43-.431a.336.336,0,0,0-.474,0l-.784.784a.336.336,0,0,0,0,.476l.429.43-.017.03a3.432,3.432,0,0,0-.348.85l-.009.033H691.7a.338.338,0,0,0-.337.339v1.112a.336.336,0,0,0,.337.337h.608l.009.035a3.392,3.392,0,0,0,.348.848l.017.031-.429.431a.327.327,0,0,0-.1.236.338.338,0,0,0,.1.238l.786.784a.311.311,0,0,0,.238.1.335.335,0,0,0,.236-.1l.43-.431.031.019a3.53,3.53,0,0,0,.85.348l.033.009v.608a.337.337,0,0,0,.337.337h1.11a.338.338,0,0,0,.337-.335v-.612l.033-.009a3.367,3.367,0,0,0,.85-.348l.031-.017.431.429a.326.326,0,0,0,.236.1h0a.332.332,0,0,0,.236-.1l.784-.784a.338.338,0,0,0,0-.476l-.431-.431.017-.031a3.392,3.392,0,0,0,.348-.848l.009-.035h.608a.336.336,0,0,0,.337-.337V3315A.337.337,0,0,0,699.8,3314.659Zm-.335,1.108h-.542a.335.335,0,0,0-.332.281,2.867,2.867,0,0,1-.482,1.159.339.339,0,0,0,.038.432l.385.384-.308.308-.385-.385a.339.339,0,0,0-.432-.039,2.855,2.855,0,0,1-1.159.482.336.336,0,0,0-.278.332v.544h-.436v-.544a.338.338,0,0,0-.279-.332,2.855,2.855,0,0,1-1.161-.48.334.334,0,0,0-.43.036l-.386.387-.308-.308.386-.386a.336.336,0,0,0,.038-.43,2.858,2.858,0,0,1-.48-1.161.337.337,0,0,0-.331-.279h-.544v-.436h.542a.335.335,0,0,0,.331-.28,2.865,2.865,0,0,1,.482-1.16.336.336,0,0,0-.038-.432l-.385-.385.308-.309.385.386a.336.336,0,0,0,.432.037,2.882,2.882,0,0,1,1.159-.48.336.336,0,0,0,.28-.332v-.542h.434v.542a.341.341,0,0,0,.28.332,2.842,2.842,0,0,1,1.161.48.334.334,0,0,0,.43-.038l.386-.385.308.308-.387.385a.337.337,0,0,0-.037.432,2.86,2.86,0,0,1,.48,1.159.338.338,0,0,0,.332.28h.544Z"
                  transform="translate(-691.367 -3311.164)"
                  fill="#fcfcfc"
                />
                <path
                  d="M695.193,3311.039h1.117a.459.459,0,0,1,.46.462v.512a3.666,3.666,0,0,1,.768.315l.363-.363a.463.463,0,0,1,.652,0l.783.785a.461.461,0,0,1,0,.653l-.362.363a3.549,3.549,0,0,1,.314.768h.51a.463.463,0,0,1,.462.462v1.112a.463.463,0,0,1-.462.462h-.512a3.512,3.512,0,0,1-.315.767l.364.364a.464.464,0,0,1,0,.653l-.784.784a.456.456,0,0,1-.325.134.45.45,0,0,1-.328-.137l-.362-.361a3.48,3.48,0,0,1-.768.314v.516a.464.464,0,0,1-.462.46H695.2a.463.463,0,0,1-.462-.462v-.513a3.639,3.639,0,0,1-.768-.315l-.363.363a.461.461,0,0,1-.325.134h-.012a.438.438,0,0,1-.316-.137l-.784-.783a.464.464,0,0,1-.134-.326.45.45,0,0,1,.137-.326l.361-.363a3.506,3.506,0,0,1-.315-.767H691.7a.463.463,0,0,1-.462-.462V3315a.464.464,0,0,1,.462-.464h.513a3.55,3.55,0,0,1,.314-.766l-.362-.364a.461.461,0,0,1,0-.653l.784-.784a.461.461,0,0,1,.651,0l.363.363a3.659,3.659,0,0,1,.768-.315v-.514a.45.45,0,0,1,.137-.326.479.479,0,0,1,.318-.134Zm2.386,1.6-.115-.068a3.4,3.4,0,0,0-.816-.334l-.128-.034v-.7a.209.209,0,0,0-.21-.212H695.2a.232.232,0,0,0-.154.062.2.2,0,0,0-.062.148v.706l-.128.034a3.4,3.4,0,0,0-.818.335l-.113.067-.5-.5a.21.21,0,0,0-.15-.062.206.206,0,0,0-.148.061l-.784.785a.211.211,0,0,0,0,.3l.5.5-.063.112a3.308,3.308,0,0,0-.336.82l-.035.126h-.7a.213.213,0,0,0-.212.214v1.112a.212.212,0,0,0,.212.212h.7l.034.128a3.263,3.263,0,0,0,.335.817l.062.116-.494.5a.2.2,0,0,0-.063.148.212.212,0,0,0,.061.15l.786.784a.191.191,0,0,0,.138.063h.007a.213.213,0,0,0,.153-.06l.5-.5.115.068a3.4,3.4,0,0,0,.818.334l.126.035v.7a.212.212,0,0,0,.212.212h1.11a.214.214,0,0,0,.212-.211v-.705l.124-.035a3.244,3.244,0,0,0,.821-.336l.116-.063.5.495a.2.2,0,0,0,.148.063.208.208,0,0,0,.15-.061l.784-.784a.214.214,0,0,0,0-.3l-.5-.5.06-.113a3.269,3.269,0,0,0,.337-.82l.034-.128h.7a.212.212,0,0,0,.212-.212V3315a.212.212,0,0,0-.212-.212h-.7l-.034-.127a3.31,3.31,0,0,0-.336-.82l-.063-.113.5-.5a.211.211,0,0,0,0-.3l-.782-.785a.214.214,0,0,0-.151-.062.21.21,0,0,0-.149.062Zm-2.169-.931h.684v.667a.216.216,0,0,0,.178.208,2.962,2.962,0,0,1,1.211.5.212.212,0,0,0,.121.038.206.206,0,0,0,.148-.062l.476-.473.485.484-.475.473a.212.212,0,0,0-.023.271,2.988,2.988,0,0,1,.5,1.211.213.213,0,0,0,.208.177h.67l-.006.686h-.666a.211.211,0,0,0-.208.176,3,3,0,0,1-.5,1.211.215.215,0,0,0,.025.272l.473.473-.484.485-.473-.474a.219.219,0,0,0-.272-.024,2.98,2.98,0,0,1-1.21.5.21.21,0,0,0-.175.208v.669h-.686v-.669a.213.213,0,0,0-.176-.209,2.984,2.984,0,0,1-1.211-.5.212.212,0,0,0-.27.023l-.475.475-.484-.484.475-.475a.211.211,0,0,0,.024-.271,2.982,2.982,0,0,1-.5-1.211.212.212,0,0,0-.208-.175h-.669v-.686h.667a.211.211,0,0,0,.208-.176,2.99,2.99,0,0,1,.5-1.211.21.21,0,0,0-.024-.271l-.473-.474.484-.487.473.475a.215.215,0,0,0,.271.023,3.013,3.013,0,0,1,1.211-.5.21.21,0,0,0,.177-.208Zm.434.25h-.184v.417a.46.46,0,0,1-.385.455,2.754,2.754,0,0,0-1.108.459.461.461,0,0,1-.593-.051l-.3-.3-.131.132.3.3a.46.46,0,0,1,.052.592,2.741,2.741,0,0,0-.461,1.109.46.46,0,0,1-.455.384h-.417v.186h.419a.462.462,0,0,1,.454.381,2.734,2.734,0,0,0,.459,1.111.461.461,0,0,1-.052.591l-.3.3.131.131.3-.3a.459.459,0,0,1,.591-.05,2.73,2.73,0,0,0,1.11.458.463.463,0,0,1,.382.455v.419h.186v-.419a.46.46,0,0,1,.382-.455,2.728,2.728,0,0,0,1.108-.461.465.465,0,0,1,.593.052l.3.3.131-.131-.3-.3a.462.462,0,0,1-.053-.592,2.742,2.742,0,0,0,.461-1.109.46.46,0,0,1,.455-.384h.418l0-.186h-.418a.463.463,0,0,1-.455-.383,2.737,2.737,0,0,0-.459-1.109.462.462,0,0,1,.049-.592l.3-.3-.131-.131-.3.3a.454.454,0,0,1-.325.136.46.46,0,0,1-.265-.083,2.712,2.712,0,0,0-1.11-.459.467.467,0,0,1-.385-.453Z"
                  transform="translate(-691.367 -3311.164)"
                  fill="#fcfcfc"
                />
              </g>
              <g
                transform={`translate(${cx - r / 3.3} ${
                  -r / 3 - 18
                })  scale(2 2)`}
              >
                <path
                  d="M707.219,3325.213a1.813,1.813,0,1,0,1.813,1.813A1.814,1.814,0,0,0,707.219,3325.213Zm0,2.951a1.138,1.138,0,1,1,1.139-1.138A1.14,1.14,0,0,1,707.219,3328.164Z"
                  transform="translate(-705.407 -3325.213)"
                  fill="#fcfcfc"
                />
                <path
                  d="M707.219,3325.088a1.938,1.938,0,1,1-1.937,1.938A1.941,1.941,0,0,1,707.219,3325.088Zm0,3.625a1.688,1.688,0,1,0-1.687-1.687A1.689,1.689,0,0,0,707.219,3328.713Zm0-2.95a1.263,1.263,0,1,1-.894.37A1.265,1.265,0,0,1,707.219,3325.762Zm0,2.277a1.013,1.013,0,1,0-1.014-1.013A1.015,1.015,0,0,0,707.219,3328.039Z"
                  transform="translate(-705.407 -3325.213)"
                  fill="#fcfcfc"
                />
              </g>
            </g>
          </g>
        </g>
      );
    }
    if (hextype == "variable_output") {
      return (
        <g transform="translate(-140.482 -1510.496) ">
          <g transform="translate(18229.627 18887)">
            <g
              transform="translate(-18072.42 -17362.699)"
              style={{ isolation: "isolate" }}
            >
              <g
                transform={`translate(${cx - r / 1.5} ${
                  -r / 3 - 20
                })  scale(2 2)`}
              >
                <path
                  d="M884.771,3310.789h-1.037a.873.873,0,0,0-.847-.689c-.479,0-.8.474-.87.942l-.444,2.994h1.894v1.024h-2.045l-1.4,9.489a2,2,0,0,1-1.889,1.82,1.9,1.9,0,0,1-1.884-1.717h1.04a.868.868,0,0,0,.847.689l.024,0a.982.982,0,0,0,.844-.935l1.38-9.344h-1.94v-1.024h2.089l.467-3.154a2,2,0,0,1,1.885-1.808h0A1.9,1.9,0,0,1,884.771,3310.789Z"
                  transform="translate(-876.247 -3309.074)"
                  fill="#fcfcfc"
                />
                <path
                  d="M882.877,3308.824h.008a2.159,2.159,0,0,1,2.134,1.942l.025.273h-1.514l-.042-.2a.623.623,0,0,0-.6-.491c-.332,0-.568.375-.621.729l-.4,2.707h1.854v1.524h-2.079l-1.37,9.268a2.248,2.248,0,0,1-2.126,2.04h-.012a2.164,2.164,0,0,1-2.132-1.943l-.026-.274h1.518l.042.2a.619.619,0,0,0,.595.49h.006a.734.734,0,0,0,.621-.7l0-.026,1.338-9.058h-1.9v-1.524h2.123l.434-2.934a2.242,2.242,0,0,1,2.12-2.027Zm1.6,1.715a1.659,1.659,0,0,0-1.582-1.215,1.745,1.745,0,0,0-1.643,1.583v.012l-.5,3.367h-2.055v.524h1.979l-1.421,9.619a1.234,1.234,0,0,1-1.058,1.158l-.059,0a1.122,1.122,0,0,1-1.03-.689h-.558a1.663,1.663,0,0,0,1.579,1.217,1.746,1.746,0,0,0,1.645-1.591l0-.015,1.435-9.7h2.011v-.524h-1.934l.486-3.281a1.246,1.246,0,0,1,1.117-1.155,1.128,1.128,0,0,1,1.03.689Z"
                  transform="translate(-876.247 -3309.074)"
                  fill="#fcfcfc"
                />
              </g>
              <g
                transform={`translate(${cx - r / 2.5} ${
                  -r / 3 - 5
                })  scale(2 2)`}
              >
                <path
                  d="M916.329,3360.437l1.145,2.583H916.35l-.7-1.569-1.044,1.569h-1.233l1.784-2.68-1.129-2.547h1.124l.679,1.535,1.021-1.535h1.235Z"
                  transform="translate(-913.377 -3357.794)"
                  fill="#fcfcfc"
                />
                <path
                  d="M917.858,3363.27h-1.671l-.578-1.3-.866,1.3H912.91l1.966-2.954-1.229-2.772h1.671l.56,1.267.842-1.267h1.836l-1.944,2.917Zm-1.346-.5h.577l-1.045-2.357,1.578-2.369h-.634l-1.2,1.8-.8-1.8h-.577l1.029,2.321-1.6,2.406h.632l1.222-1.837Z"
                  transform="translate(-913.377 -3357.794)"
                  fill="#fcfcfc"
                />
              </g>
            </g>
          </g>
        </g>
      );
    } else {
      return (
        <image
          xlinkHref={HexTypes[hextype].image}
          x={cx - r / 3}
          y={-r / 3 - 6}
          width={(2 * r) / 3}
          height={(2 * r) / 3}
          style={{ pointerEvents: "none" }}
        />
      );
    }
  };

  render() {
    var points = [],
      innerpoints = [],
      degree = 0;
    const { cx, onClick, hextype, highlighted, onDoubleClick, keys, id } =
      this.props;

    if (hextype != "blank") {
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
        {/* BALNK */}
        <defs>
          <linearGradient
            id="blank"
            x1="1.19"
            y1="-0.947"
            x2="0"
            y2="1.515"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#F0F0F0" />
            <stop offset="1" stop-color="#F8F8F8" />
          </linearGradient>
        </defs>

        {/* START */}
        <defs>
          <linearGradient
            id="start"
            y1="0.766"
            x1="-0.11"
            y2="0.283"
            x2="0.961"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#38B7AA" />
            <stop offset="1" stop-color="#40D3C4" />
          </linearGradient>
        </defs>

        {/* END CONDITION, END REPEAT */}
        <defs>
          <linearGradient
            id="endRed"
            y1="0.766"
            x1="-0.11"
            y2="0.283"
            x2="0.961"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#CE6878" />
            <stop offset="1" stop-color="#F17A8D" />
          </linearGradient>
        </defs>

        {/* active_hand */}
        <defs>
          <linearGradient
            id="active_hand"
            y1="0.766"
            x1="-0.11"
            y2="0.283"
            x2="0.961"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#D7B24F" />
            <stop offset="1" stop-color="#FDD15D" />
          </linearGradient>
        </defs>

        {/* condition */}
        <defs>
          <linearGradient
            id="condition"
            y1="0.766"
            x1="-0.11"
            y2="0.283"
            x2="0.961"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#7676CC" />
            <stop offset="1" stop-color="#8C8CF2" />
          </linearGradient>
        </defs>

        {/* //  REPEAT  */}
        <defs>
          <linearGradient
            id="repeat"
            y1="0.766"
            x1="-0.11"
            y2="0.283"
            x2="0.961"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#38B7AA" />
            <stop offset="1" stop-color="#40D3C4" />
          </linearGradient>
        </defs>

        {/* ACTIONS */}
        <defs>
          <linearGradient
            id="action"
            y1="0.766"
            x1="-0.11"
            y2="0.283"
            x2="0.961"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#319BD1" />
            <stop offset="1" stop-color="#37ADE9" />
          </linearGradient>
        </defs>

        {/* // THIS Loop  IS REAPEAT ONLY FOR IMG  */}
        <defs>
          <linearGradient
            id="loop"
            y1="0.766"
            x1="-0.11"
            y2="0.283"
            x2="0.961"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#D7806E" />
            <stop offset="1" stop-color="#F2907C" />
          </linearGradient>
        </defs>

        <defs>
          <linearGradient
            id="end"
            y1="0.766"
            x1="-0.11"
            y2="0.283"
            x2="0.961"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#66C7D" />
            <stop offset="1" stop-color="#F67C90" />
          </linearGradient>
        </defs>

        {/* variable_output - HARDWAR - WAIT */}
        <defs>
          <linearGradient
            id="variable_output"
            y1="0.766"
            x1="-0.11"
            y2="0.283"
            x2="0.961"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#3099CE" />
            <stop offset="1" stop-color="#37AFEC" />
          </linearGradient>
        </defs>

        <defs>
          <linearGradient
            id="variable_output"
            y1="0.766"
            x1="-0.11"
            y2="0.283"
            x2="0.961"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#3099CE" />
            <stop offset="1" stop-color="#37AFEC" />
          </linearGradient>
        </defs>

        {/* INSERT BLOCK  */}
        <defs>
          <linearGradient
            id="insert"
            y1="0.766"
            x1="-0.11"
            y2="0.283"
            x2="0.961"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#D4B04E" />
            <stop offset="1" stop-color="#FDD15D" />
          </linearGradient>
        </defs>

        {/* DELETE BLOCK */}

        <defs>
          <linearGradient
            id="delete"
            y1="0.766"
            x1="-0.11"
            y2="0.283"
            x2="0.961"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#A3A3A3" />
            <stop offset="1" stop-color="#BFBFBF" />
          </linearGradient>
        </defs>

        {/* REPEAT END */}
        <defs>
          <linearGradient
            id="repeatEnd"
            y1="0.766"
            x1="-0.11"
            y2="0.283"
            x2="0.961"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#D96E7F" />
            <stop offset="1" stop-color="#FD8094" />
          </linearGradient>
        </defs>

        <g>
          {/* STOCK AND CONDITION CHECKING */}
          <polygon
            className={classNamevar}
            points={points.join(" ")}
            strokeWidth={r * 0.4}
            // stroke={highlighted ? Colors.flash_yellow : Colors.white}
            // fill={highlighted ? Colors.flash_yellow : Colors.white}

            // stroke={highlighted ? Colors.flash_yellow : "#D9F6FE"}
            // fill={highlighted ? Colors.flash_yellow : "#D9F6FE"}

            stroke={highlighted ? Colors.flash_yellow : `url(#blank)`}
            fill={highlighted ? Colors.flash_yellow : `url(#blank)`}
            id={`${keys}`}
            strokeLinejoin="round"
          />

          {/* COLOR FOR THE BLOCK EX: START BLOCK Have GREEN color */}
          <polygon
            points={innerpoints.join(" ")}
            strokeWidth={r * 0.4 * 0.9}
            // stroke={HexTypes[hextype].color}
            // fill={HexTypes[hextype].color}

            stroke={this.renderCompnentColor(hextype)}
            fill={this.renderCompnentColor(hextype)}
            strokeLinejoin="round"
          />
        </g>

        {/* IMAGES inside the BLOCK  CLIP_PART*/}
        {this.renderCompnentImage(cx, r, hextype)}

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
          {/* {HexTypes[hextype].name} */}

          {hextype == "repeat"
            ? "repeat"
            : hextype == "loop"
            ? "loop"
            : hextype == "sensor"
            ? "condition"
            : hextype == "end"
            ? "stop"
            : HexTypes[hextype].name}
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
