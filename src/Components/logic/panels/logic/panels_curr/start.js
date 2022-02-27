import React, { Component } from 'react';

import Checkbox from './helpers/Checkbox'
import InputNumber from './helpers/InputNumber'
import Colors from '../Colors'

const cellstyle = { borderRight: '0.125em solid ' + Colors.bordergrey, padding: '0.5em', color: "black" };
const padding = { padding: '0.5em', color: "black" };
const paddingNoRight = { padding: '0.5em', paddingRight: 0 };
const paddingNoLeft = { paddingLeft: 0 };
const blank = { height: '0.5em' };

class StartPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  onChange = (key, value) => {
    const { state, onChange } = this.props;
    state[key] = value;
    if (!value) {
      var keys_arr = [];
      if (key.includes('bic')) {
        keys_arr.push('assignCount' + key);
        keys_arr.push('valueCount' + key);
        keys_arr.push('valueNumCount' + key);
      } else if (key.includes('bid') || key.includes('bif')) {
        keys_arr.push('assign' + key);
        keys_arr.push('value' + key);
        keys_arr.push('valuenum' + key);
      } else if (key.includes('iot')) {
        for (var i = 1; i <= 10; i++) {
          keys_arr.push('assignIOT' + i);
          keys_arr.push('valueIOT' + i);
          keys_arr.push('valuenumIOT' + i);
        }
        keys_arr.push('IOT_counter');
        keys_arr.push('IOTROW');
      }
      console.log('keys to delete', keys_arr);
      for (var deleteKey in keys_arr) {
        this.props.bottomPanelDeleteKey(keys_arr[deleteKey]);
      }
    }
    onChange(state);
  }
  hexTypeCheck = () => {
    this.props.hexTypeCheck("start")

  }
  render() {
    const { state } = this.props;
    return (
      <div style={{ overflowX: "auto" }}>
        <table style={{
          color: '#FFF',
          // padding: '0.5em',
          fontWeight: 'bold',
          width: '100%', height: '50vh'
        }}>


          <tbody >
            <tr><td style={cellstyle} colSpan={2}><Checkbox checked={state.bmp3 || false} onChange={(value) => this.onChange('bmp3', value)} /><label>Bluetooth MP3</label> </td>
              <td style={cellstyle} colSpan={2}><Checkbox checked={state.btr || false} onChange={(value) => this.onChange('btr', value)} /><label>BT Remote</label></td>
              <td style={cellstyle} colSpan={2}>  <Checkbox checked={state.bts || false} onChange={(value) => this.onChange('bts', value)} /><label>BT Speech</label></td>
              <td style={padding} colSpan={2}> <Checkbox checked={state.iot || false} onChange={(value) => this.onChange('iot', value)} /><label>IOT</label></td>
            </tr>
            <tr><td style={blank} colSpan={6} /></tr>

            <tr>
              <td style={cellstyle} colSpan={2} > < Checkbox checked={state.bic1 || false} onChange={(value) => this.onChange('bic1', value)} /> <label>BICOUNTER 1</label> </td>
              <td style={cellstyle} colSpan={2}> <Checkbox checked={state.bic2 || false} onChange={(value) => this.onChange('bic2', value)} /><label>BICOUNTER 2</label></td>
              <td style={padding} colSpan={2}>  <Checkbox checked={state.bic3 || false} onChange={(value) => this.onChange('bic3', value)} /> <label>BICOUNTER 3</label></td>
            </tr>
            <tr><td style={blank} colSpan={6} /></tr>

            <tr>
              <td style={cellstyle} colSpan={2}><Checkbox checked={state.bif1 || false} onChange={(value) => this.onChange('bif1', value)} /><label>BIFLAG 1</label></td>
              <td style={cellstyle} colSpan={2}><Checkbox checked={state.bif2 || false} onChange={(value) => this.onChange('bif2', value)} /><label>BIFLAG 2</label></td>
              <td style={padding} colSpan={2}><Checkbox checked={state.bif3 || false} onChange={(value) => this.onChange('bif3', value)} /><label>BIFLAG 3</label></td>
            </tr>
            {/* <tr>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bif1 || false} onChange={(value) => this.onChange('bif1', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bif2 || false} onChange={(value) => this.onChange('bif2', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bif3 || false} onChange={(value) => this.onChange('bif3', value)}/>
            </td>
            <td style={{...padding,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
          </tr> */}
            <tr><td style={blank} colSpan={6} /></tr>
            <tr>
              <td style={cellstyle} colSpan={2}><Checkbox checked={state.bid1 || false} onChange={(value) => this.onChange('bid1', value)} />BI DATA 1</td>
              <td style={cellstyle} colSpan={2}><Checkbox checked={state.bid2 || false} onChange={(value) => this.onChange('bid2', value)} />BI DATA 2</td>
              <td style={padding} colSpan={2}><Checkbox checked={state.bid3 || false} onChange={(value) => this.onChange('bid3', value)} />BI DATA 3</td>
            </tr>
            {/* <tr>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bid1 || false} onChange={(value) => this.onChange('bid1', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bid2 || false} onChange={(value) => this.onChange('bid2', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bid3 || false} onChange={(value) => this.onChange('bid3', value)}/>
            </td>
            <td style={{...padding, ...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
          </tr> */}
            <tr><td style={blank} colSpan={6} /></tr>
            {/* <tr><td  style={cellstyle} colSpan={2}><Checkbox checked={state.bmp3 || false} onChange={(value) => this.onChange('bmp3', value)}/> Bluetooth MP3</td>
              <td  style={cellstyle} colSpan={2}><Checkbox checked={state.btr || false} onChange={(value) => this.onChange('btr', value)}/>BT Remote</td>
              <td style={padding} colSpan={2}> <Checkbox checked={state.iot || false} onChange={(value) => this.onChange('iot', value)}/>IOT</td>
          </tr> */}
            <tr>
              {/* <td style={paddingNoRight}>
              <Checkbox checked={state.bmp3 || false} onChange={(value) => this.onChange('bmp3', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox checked={state.btr || false} onChange={(value) => this.onChange('btr', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox checked={state.iot || false} onChange={(value) => this.onChange('iot', value)}/>
            </td>
            <td style={{...padding,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td> */}

            </tr>

          </tbody>
        </table>

      </div>
    );
  }
}

export default StartPanel;
