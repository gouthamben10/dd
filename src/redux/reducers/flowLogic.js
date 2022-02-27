

if (sessionStorage.getItem('flow-logic')) {
    var logicNew = sessionStorage.getItem('flow-logic');
    logicNew = JSON.parse(logicNew);
}
else {
    var logicNew = {

        cards:[{
            type:"start",
            cardId:0,
            connections:[{"to":0,"toPort":0}],
            left:346,
            top:100,
            invalid:false,
            state:{bic1:false,bic2:false,bic3:false,bid2:false,bif1:false,bif2:false,bif3:false,bid3:false,bid1:false,bmp3:false}}],
         nodeCount:1,
           cardConnections:{
            0:{
                type:"start",
                cardId:0,
                connections:[{"to":0,"toPort":0}],
                left:346,
                top:100,
                invalid:false,
                state:{bic1:false,bic2:false,bic3:false,bid2:false,bif1:false,bif2:false,bif3:false,bid3:false,bid1:false,bmp3:false}}},              
            end:{type:"end",state:"repeat"},
           offset:{left:0,top:0},
           scale:1,
          bottomPanel:"border"
    };

}






const flowlogicSelection = (state = logicNew, action) => {


    var { payload } = action

    switch (action.type) {


        case 'FLOW_LOGIC_SELECTION':
            var { cards,nodeCount, cardConnections,end,offset,scale,bottomPanel} = payload
            console.log("OFFSET ANKIT REDUCER")
            var data = { ...state, cards,nodeCount, cardConnections,end,offset,scale,bottomPanel }
            sessionStorage.setItem('flow-logic', JSON.stringify(data));
            return data;

        // case 'LOGIC_RESET':
        //     console.log("LOGIC PAYLOAD", payload)

        //     var { program, end, insertState, offset, scale, currentProgramGuide, active, bottomPanel } = payload
        //     var data = { ...state, program, end, insertState, offset, scale, currentProgramGuide, active, bottomPanel }
        //     sessionStorage.setItem('logic', JSON.stringify(data));
        //     console.log("LOGIC DATA", data)

        //     return data;



        default:
            sessionStorage.setItem('flow-logic', JSON.stringify(state));
            return state;
    }
}

export default flowlogicSelection;