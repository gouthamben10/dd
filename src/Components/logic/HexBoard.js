import React, { Component } from "react";

import Sizes from "./Sizes";
import Hexagon from "./Hexagon";
import HexTypes from "./HexTypes";

import ArrowConnect from "./ArrowConnect";
import Colors from "./Colors";
let newArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let newArr3 = [];
let newArr5 = [];
let newArr7 = [];

class HexBoard extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    // this.simulateProgram = this.simulateProgram.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.drawing.updated;
  }
  simulateProgram = (time, newArray) => {
    this.myRef.current.play(time, newArray); //it will call play fun which is available at Hexagon.js(logic)
  };
  render() {
    // console.log("HEXBOARD",this);
    const { drawing, onClick, onDoubleClick } = this.props;

    let newId = 0;
    return (
      <g transform={"translate(0," + Sizes.r / 2 + ")"}>
        {drawing.board.map((row, rIndex) => {
          var xoff = 0;
          if (rIndex % 2 == 1) xoff += Sizes.xdiff / 2;
          return (
            <g
              transform={"translate(" + xoff + "," + rIndex * Sizes.ydiff + ")"}
              key={rIndex}
            >
              {row.map((cell, cIndex) => {
                //  || cell.type === "sensor" || cell.type === "variable" || cell.type === "loop"
                if (JSON.stringify(rIndex).charAt(0) == 1) {
                  if (
                    cell.type !== "blank" &&
                    (cell.type === "hardware" || cell.type === "wait")
                  ) {
                    if (!newArr.includes(rIndex + "" + cIndex)) {
                      newArr.push(rIndex + "" + cIndex);
                      sessionStorage.setItem("Types", newArr);
                    }
                  }
                }

                if (JSON.stringify(rIndex).charAt(0) == 3) {
                  if (
                    cell.type !== "blank" &&
                    (cell.type === "hardware" || cell.type === "wait")
                  ) {
                    if (!newArr3.includes(rIndex + "" + cIndex)) {
                      newArr3.push(rIndex + "" + cIndex);
                      sessionStorage.setItem("Types3", newArr3);
                    }
                  }
                }

                if (JSON.stringify(rIndex).charAt(0) == 5) {
                  if (
                    cell.type !== "blank" &&
                    (cell.type === "hardware" || cell.type === "wait")
                  ) {
                    if (!newArr5.includes(rIndex + "" + cIndex)) {
                      newArr5.push(rIndex + "" + cIndex);
                      sessionStorage.setItem("Types5", newArr5);
                    }
                  }
                }

                return (
                  <Hexagon
                    cx={cIndex * Sizes.xdiff}
                    hextype={cell.type}
                    highlighted={cell.highlighted}
                    onDoubleClick={onDoubleClick}
                    onClick={
                      cell.onClick
                        ? cell.onClick
                        : () => onClick(rIndex, cIndex)
                    }
                    keys={
                      cell.type === "blank"
                        ? null
                        : rIndex === 1
                        ? rIndex + "" + newId++
                        : rIndex + "" + cIndex
                    }
                    id={rIndex}
                    ref={this.myRef}
                  />
                );
              })}
            </g>
          );
        })}
        <g>
          {drawing.connections.map((connection, key) => {
            return (
              <ArrowConnect
                hex1r={connection.from[0]}
                hex1c={connection.from[1]}
                hex2r={connection.to[0]}
                hex2c={connection.to[1]}
                color={
                  HexTypes[
                    drawing.board[connection.from[0]][connection.from[1]].type
                  ].color
                }
                key={key}
              />
            );
          })}
        </g>
      </g>
    );
  }
}

// module.exports = HexBoard;
export default HexBoard;
