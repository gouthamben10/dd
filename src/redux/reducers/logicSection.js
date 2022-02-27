

if (sessionStorage.getItem('logic')) {
    var logic = sessionStorage.getItem('logic');
    logic = JSON.parse(logic);
}
else {
    var logic = {


        program: [{
            type: "start",
            state: { bic1: false, bic2: false, bic3: false, bid2: false, bif1: false, bif2: false, bif3: false },
            bic1: false,
            bic2: false,
            bic3: false,
            bid2: false,
            bif1: false,
            bif2: false,
            bif3: false,
            bid3: false,
            bid1: false,
            bmp3: false
        },
        ],
        end: { type: "end", state: "repeat" },
        insertState: false,

        offset: { left: 0, top: 0 }
        ,
        scale: 1,
        currentProgramGuide: 0,
        active: [-1, -1],
        bottomPanel: "border",


    };

}






const logicSelection = (state = logic, action) => {


    var { payload } = action

    switch (action.type) {


        case 'LOGIC_SELECTION':
            var { program, end, insertState, offset, scale, currentProgramGuide, active, bottomPanel } = payload
            console.log("OFFSET KHUSHBOO", offset)
            var data = { ...state, program, end, insertState, offset, scale, currentProgramGuide, active, bottomPanel }
            sessionStorage.setItem('logic', JSON.stringify(data));
            return data;

        case 'LOGIC_RESET':
            console.log("LOGIC PAYLOAD", payload)

            var { program, end, insertState, offset, scale, currentProgramGuide, active, bottomPanel } = payload
            var data = { ...state, program, end, insertState, offset, scale, currentProgramGuide, active, bottomPanel }
            sessionStorage.setItem('logic', JSON.stringify(data));
            console.log("LOGIC DATA", data)

            return data;



        default:
            sessionStorage.setItem('logic', JSON.stringify(state));
            return state;
    }
}

export default logicSelection;