import React, { Component } from 'react'
import { connect } from 'react-redux'
import Checkbox from '../helpers/Checkbox'
import Slider from '../helpers/Slider'
var device = localStorage.getItem("biboxTypes");
var outputStyle;





class SliderRow extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    var { name, assign, port, value, onChange } = this.props;
    // if (assign == undefined) {//temporaray fix
    //   assign = true
    // }
    const { PortConnections } = this.props.assembly
    var defaultport;
    var min = this.props.min || 0;
    var max = this.props.max || 255;

    if (device == "*SNI#") {
      if (port == "B12") {
        defaultport = "B"
      }

      if (port == "C12") {
        defaultport = "C"
      }
      if (port == "G12") {
        defaultport = "PB"
      }
      else if (port == "F12") {
        defaultport = "PD"
      }
      else if (port == "AB") {
        defaultport = "A2"
      }
      else if (port == "AC") {
        defaultport = "PC"
      }
      else {
        defaultport = port;
      }

    }
    else {
      var connect = ['F', 'G', 'B12', 'B34', 'C12', 'C34']
      for (let i = 0; i < connect.length; i++) {
        if (PortConnections[connect[i]]) {
          if (PortConnections[connect[i]].type == "dual_splitter") {
            if (port == "A2") {
              defaultport = "A1"
            }
            else if (port == "A1") {

              defaultport = "A2"
            }
            else if (port == "A3") {
              defaultport = "A4"
            }
            else if (port == "A4") {
              defaultport = "A3"
            }
            else if (port == "F2") {
              defaultport = "F1"
            }
            else if (port == "F1") {
              defaultport = "F2"
            }
            else if (port == "G1") {
              defaultport = "G2"
            }
            else if (port == "G2") {
              defaultport = "G1"
            }
            else if (port == "B1") {
              defaultport = "B2"
            }
            else if (port == "B3") {
              defaultport = "B4"
            } else {
              defaultport = port;
            }
          }

          else {
            defaultport = port;
          }
        }
        else {
          defaultport = port;
        }
      }
    }
    //  else{
    //       defaultport = port;
    //       console.log("portportportport 111111",port);

    //       }


    console.log("portportportport", defaultport);


    if (name == "DUAL SPLITTER" || name == "SERVO EXTENDER") {
      outputStyle = {
        verticalAlign: 'middle',
        color: '#FFF',
        // borderBottom: '2px solid grey',
        height: '72px',
        display: 'none'
      }
    }
    else {
      outputStyle = {
        verticalAlign: 'middle',
        color: '#FFF',
        // borderBottom: '2px solid grey',
        height: '72px',
        width: "50%"
      }
    }
    return (
      <tr className="hide" style={outputStyle}>
        <td style={{ padding: '1.5em', textAlign: "start", fontWeight: 'bold' }}>
          <Checkbox checked={assign || false} onChange={(value) => onChange('assign' + port, value)} label={name} />
        </td>
        <span style={{ color: "black", display: "inline-block", position: 'relative', top: '28px', left: "-35px" }}>{defaultport}</span>

        {/* <td>
          <span style={{
            fontWeight: 'bold',
            fontSize: '0.9em',
            color: "black"
          }}>-{defaultport}</span>
        </td> */}
        <td colSpan={4} style={{
          width: '70%'
        }}>

          <Slider disabled={!assign} value={value || 0} min={min} max={max} onChange={(value) => onChange('value' + port, value)} />
        </td>


      </tr>
    );
  }
}

const mapStateToProps = state => {
  return state;
}
const mapDispatchToProps = dispatch => {
  return {


    PortConnections: (data) => {
      dispatch({ type: 'PORT_Connection', payload: data })
    }
  }
}
SliderRow = connect(mapStateToProps, mapDispatchToProps)(SliderRow)
export default SliderRow

// export default SliderRow
