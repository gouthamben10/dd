import { IFFT } from "@tensorflow/tfjs-core";

var board,
  connections,
  maxCols,
  curRow,
  curCol,
  selectorOpen,
  activeRef,
  activeParentRef,
  activeIndex; // These are initialized in the main exported method
// let elem = []
// let val = 0;
function addRow() {
  console.log("PROGRAMTODRAWINF addRow");

  console.log("BEFOR board addRow:", board);
  board.push([{ type: "blank" }]);

  console.log("AFTER board addRow:", board);
}

function makeRowsProper() {
  console.log("PROGRAMTODRAWINF makeRowsProper");

  board.forEach((row) => {
    while (row.length < maxCols + 15) row.push({ type: "blank" });
  });

  console.log("board makeRowsProper:", board);
}

function setCurCol(newValue) {
  console.log("PROGRAMTODRAWINF setCurCol");
  console.log("PROGRAMTODRAWINF setCurCol maxCols", maxCols);

  curCol = newValue;
  if (curCol > maxCols) maxCols = curCol;
}

function recurse(instructions, active) {
  console.log("PROGRAMTODRAWINF recurse");
  let num = 0;
  // elem.push(curRow)

  // console.log(elem, 'eleeeeeeeeeee')

  console.log("PROGRAMTODRAWINF recurse instructions", instructions.length);

  console.log(curCol);
  console.log(curRow);
  console.log(instructions);
  console.log(board);
  console.log(board.length, "board.length");
  console.log(board[curRow], "oard[curRow]");

  if (instructions.length === 0) {
    console.log("PROGRAMTODRAWINF recurse IF ");

    while (board.length <= curRow) addRow();

    while (board[curRow].length < curCol) {
      board[curRow].push({ type: "blank" });
    }
  } else {
    console.log("PROGRAMTODRAWINF recurse ELSE ");

    instructions.map((instruction, index) => {
      const oldCol = curCol;
      console.log("MAP");

      console.log(instruction.type);

      if (
        instruction.type === "variable" ||
        instruction.type === "sensor" ||
        instruction.type === "condition" ||
        instruction.type === "loop"
      ) {
        curRow += 2;
        if (board[curRow] && board[curRow].length >= curCol)
          setCurCol(maxCols + 2);
        // For the vertiacal arrow
        connections.push({ from: [curRow - 2, curCol], to: [curRow, curCol] });
        const oldCol = curCol;
        recurse(instruction.subprogram, active);
        board[curRow].push({ type: "end_" + instruction.type });
        if (curRow === active[0] && board[curRow].length - 1 === active[1]) {
          activeRef = board[curRow][board[curRow].length - 1];
          activeParentRef = instruction.subprogram;
          activeIndex = instruction.subprogram.length;
        }
        // For the arrows to end if and end loop.
        if (instruction.subprogram.length > 0)
          connections.push({
            from: [curRow, curCol - 1],
            to: [curRow, curCol],
          });
        num += 1;
        instruction.subprogram.map((i, id) => {
          i.id = `${curRow}${oldCol + id}`;
        });
        curRow -= 2;
        setCurCol(oldCol);
      }

      while (board.length <= curRow) addRow();

      while (board[curRow].length <= curCol) {
        board[curRow].push({ type: "blank" });
      }

      console.log(board[curRow][curCol]);
      console.log(instruction.type);

      board[curRow][curCol].type = instruction.type;

      if (curRow === active[0] && curCol === active[1]) {
        activeRef = instruction;
        activeParentRef = instructions;
        activeIndex = index;
      }
      // Draw arrow from previous cell if there's a previous cell.
      if (index != 0)
        connections.push({ from: [curRow, oldCol - 1], to: [curRow, curCol] });
      setCurCol(curCol + 1);
    });
  }

  console.log("board recurse:", board);
}

function drawHands(currentProgramGuide, active, add) {
  console.log("PROGRAMTODRAWINF drawHands");

  console.log(board, "drawHands drawHands");

  console.log(currentProgramGuide, "drawHands currentProgramGuide");

  console.log(active, "drawHands active");

  // console.log(add, "drawHands add");

  var row = 1;

  console.log("drawHands row=================>", row);

  console.log(board, "drawHands active");

  console.log(board[row], "drawHands active");

  if (currentProgramGuide < 0) return;

  while (currentProgramGuide > 0) {
    console.log("drawHands", board);
    console.log("drawHands", board[row]);
    console.log("drawHands", row);

    board[row][board[row].length - 1] = { type: "blank" };

    row += 2;

    currentProgramGuide--;

    console.log("\n \n");
  }

  console.log("drawHands", board);
  console.log("drawHands", board[row]);
  console.log("drawHands", row);

  if (active[0] === row && active[1] === board[row].length - 1) {
    console.log(board[row], "drawHands if======================>board[row]");

    var col = board[row].length - 1;
    selectorOpen = true;

    board[row][col] = { type: "highlighted_hand" };

    while (board[row - 1].length < col) board[row - 1].push({ type: "blank" });

    board[row - 1][col] = { type: "blank" };
    board[row][col + 1] = { type: "repeat", onClick: () => add("repeat") };
    if (!board[row + 1]) addRow();
    while (board[row + 1].length < col) board[row + 1].push({ type: "blank" });
    board[row + 1][col] = { type: "loop", onClick: () => add("loop") };
    board[row + 1][col + 1] = { type: "action", onClick: () => add("action") };

    if (row === 1)
      board[row - 1][col + 1] = {
        type: "condition",
        onClick: () => add("condition"),
      };
    else {
      const type = "end_" + board[row - 2][board[row - 2].length - 2].type;

      console.log(type, "====================> TYPE");

      board[row][col + 1] = { type: type, onClick: () => add(type) };
    }
  } else {
    console.log("drawHands", board);
    console.log("drawHands", board[row]);
    console.log("drawHands", row);

    // if (typeof board[row] == "undefined") {
    //   console.log("YES");
    //   row = 1;
    //   recurse();
    // }

    board[row][board[row].length - 1] = { type: "active_hand" };
  }
}

export default function (
  program,
  end,
  currentProgramGuide,
  active,
  add,
  insertState,
  insertNode,
  deleteNode
) {
  console.log("PROGRAM_TO_DRAWING MAIN <<<<<<>>>>>");

  console.log(board, "==>BOARD");

  console.log("PROGRAM_TO_DRAWING MAIN << program", program); // for row 1
  console.log("PROGRAM_TO_DRAWING MAIN << end", end);
  console.log(
    "PROGRAM_TO_DRAWING MAIN << currentProgramGuide",
    currentProgramGuide
  );
  console.log("PROGRAM_TO_DRAWING MAIN << active", active);

  // (Re)initialize the variables
  board = [];
  connections = [];
  curRow = 1;
  maxCols = 0;
  setCurCol(1);
  activeRef = undefined;
  activeParentRef = undefined;
  activeIndex = 0;
  selectorOpen = false;
  addRow();
  addRow();
  recurse(program, active);
  connections.push({
    from: [1, board[1].length - 1],
    to: [1, board[1].length],
  });
  board[1].push({ type: end.state });
  if (active[0] === 1 && active[1] === board[1].length - 1) {
    activeRef = end;
    activeParentRef = program;
    activeIndex = program.length;
  }

  drawHands(currentProgramGuide, active, add);

  if (active[0] !== -1 && active[1] !== -1) {
    board[active[0]][active[1]].highlighted = true;
    while (board[active[0] - 1].length <= active[1])
      board[active[0] - 1].push({ type: "blank" });
    if (activeRef.type !== "start") {
      console.log("test==>", activeRef.type, board[active[0]][active[1]].type);

      console.log(activeRef.type);
      console.log("board block type", board[active[0]][active[1]]);

      if (!activeRef.type.startsWith("end")) {
        console.log("activeRef.type", activeRef.type);
        board[active[0] - 1][active[1]] = {
          type: "delete",
          onClick: () => deleteNode(),
        };
        board[active[0] - 1][active[1] + 1] = {
          type: "insert",
          onClick: () => insertNode(),
        };
        board[active[0] - 1][active[1] + 2] = {
          type: "wait",
          onClick: () => add("wait"),
        };
      }
      if (board[active[0]][active[1]].type == "highlighted_hand") {
        board[active[0] - 1][active[1] + 1] = {
          type: "condition",
          onClick: () => add("condition"),
        };

        board[active[0] + 1][active[1] + 1] = {
          type: "loop",
          onClick: () => add("loop"),
        };
        /// board[active[0] + 1][active[1]] = { type: 'loop', onClick: () => insertNode('loop') };
        board[active[0] + 1][active[1] + 1] = {
          type: "action",
          onClick: () => insertNode("action"),
        };
      }
      if (
        activeRef.type == "end_condition" ||
        activeRef.type == "end_if" ||
        activeRef.type == "end_sensor" ||
        activeRef.type == "end_variable"
      ) {
        board[active[0] - 1][active[1] + 1] = {
          type: "condition",
          onClick: () => insertNode("condition"),
        };
        // board[active[0] + 1][active[1]] = { type: 'loop', onClick: () => insertNode('loop') };
        // board[active[0] + 1][active[1] + 1] = { type: 'action', onClick: () => insertNode('action') };

        //   console.log("activeRef.type", activeRef.type)
        //   board[active[0] - 1][active[1]] = { type: 'delete', onClick: () => deleteNode() };
        //   board[active[0] - 1][active[1] + 1] = { type: 'insert', onClick: () => insertNode() };

        //   if (board[active[0] + 1]) {
        //     // console.log("activeRef.type", activeRef.type)

        //     //   board[active[0] + 1][active[1]] = { type: 'blank' };
        //     //   board[active[0] + 1][active[1] + 1] = { type: 'blank' };
        //     if (board[active[0] + 1][active[1]]) {
        //       if (board[active[0] + 1][active[1]].type == "loop") {
        //         // console.log("activeRef.type", activeRef.type)

        //         board[active[0] + 1][active[1]] = { type: 'blank' };
        //         //   board[active[0] + 1][active[1] + 1] = { type: 'blank' };

        //       }

        //     }
        //     if (board[active[0] + 1][active[1] + 1]) {
        //       if (board[active[0] + 1][active[1] + 1].type == "action") {
        //         // console.log("activeRef.type", activeRef.type)

        //         //   board[active[0] + 1][active[1]] = { type: 'blank' };
        //         board[active[0] + 1][active[1] + 1] = { type: 'blank' };

        //       }

        //     }

        //   }
      }
      if (
        board[active[0]][active[1]].type == "end" ||
        board[active[0]][active[1]].type == "end_variable" ||
        board[active[0]][active[1]].type == "end_loop" ||
        board[active[0]][active[1]].type == "end_condition" ||
        board[active[0]][active[1]].type == "end_sensor" ||
        board[active[0]][active[1]].type == "end_if" ||
        board[active[0]][active[1]].type == "repeat"
      ) {
        board[active[0] - 1][active[1] + 1] = {
          type: "insert",
          onClick: () => insertNode(),
        };
      }
    }
  }
  // Fill the board with blank hexagons
  while (board.length < 7) addRow(); // Add enough blank rows
  addRow(); // Add one extra blank row for insertNode selector
  makeRowsProper();
  if (insertState) {
    console.log("activeRef.type1234", active[0], active[1]);

    if (active[0] !== -1 && active[1] !== -1) {
      board[active[0] - 1][active[1]] = { type: "blank" };
      board[active[0] - 1][active[1] + 1] = {
        type: "condition",
        onClick: () => insertNode("condition"),
      };
      board[active[0] + 1][active[1]] = {
        type: "loop",
        onClick: () => insertNode("loop"),
      };
      board[active[0] + 1][active[1] + 1] = {
        type: "action",
        onClick: () => insertNode("action"),
      };
    }
  }
  activeRef = activeRef || {};
  return {
    board,
    connections,
    selectorOpen,
    updated: true,
    activeRef,
    activeParentRef,
    activeIndex,
  };
}
