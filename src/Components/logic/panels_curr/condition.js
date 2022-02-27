import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Output from './output/';
import WaitPanel from './wait';
import StartPanel from './start';
import IfPanelVar from './if'
import IfPanelOut from './if_O'







// var BottomPanel = React.createClass({
class Conditions extends Component {
    constructor(props) {
        super(props);
        var { value, show, toggle, current, PortConnections, state, onChange } = this.props;

        this.state = {
            currenttab: "IfPanelVar"
        }
    }

    change = (value) => {
        this.setState({ currenttab: value })

    }
    componentWillReceiveProps = () => {

        var { value, show, toggle, current, PortConnections, state, onChange } = this.props;
        this.setState({ currenttab: current })

    }


    render() {
        var { value, PortConnections, state, onChange, hexTypeCheck, hexChange, current, startState, componentProps, bottomPanelDeleteKey } = this.props


        if (current == "condition") {
            current = "variable"
        }

        return (
            <div>


                {current == "variable" ? <IfPanelVar componentProps={componentProps} value={value} PortConnections={PortConnections} state={state} onChange={onChange} hexTypeCheck={hexTypeCheck}
                    current={current} startState={startState} bottomPanelDeleteKey={bottomPanelDeleteKey} hexChange={hexChange} />
                    : (current == "sensor" ? <IfPanelOut componentProps={componentProps} value={value} PortConnections={PortConnections} state={state} onChange={onChange} hexTypeCheck={hexTypeCheck}
                        current={current} startState={startState} bottomPanelDeleteKey={bottomPanelDeleteKey} hexChange={hexChange} />
                        :
                        ""
                    )}

            </div>


        );
    }

}

export default Conditions;