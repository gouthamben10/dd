import React, { Component } from 'react';

import Select from '../helpers/Select'
import Checkbox from '../helpers/Checkbox'
import InputNumber from '../helpers/InputNumber'

import logicVariables from '../../logicVariables'
import Colors from '../../Colors'





class IOTRow extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  _updateIotArrayList = (iotList, previousIotList) => {
    console.log('_updateIotArrayList', iotList, previousIotList)
    /* flushing all keys in Node state. */
    this._deleteIotArrayList(previousIotList);

    /* Updating all keys in Node state. */
    var keyPrefixesArr = ['assign', 'value', 'valuenum'];
    for (var iotObject in iotList) {
      for (var prefix in keyPrefixesArr) {
        if (keyPrefixesArr[prefix] != 'value')
          this.props.onChange(keyPrefixesArr[prefix] + iotList[iotObject].dropdown1, iotList[iotObject][keyPrefixesArr[prefix]]);
        else
          this.props.onChange(keyPrefixesArr[prefix] + iotList[iotObject].dropdown1, iotList[iotObject]['dropdown2']);
      }
    }
  }
  _deleteIotArrayList = (iotList) => {
    for (var index in iotList) {
      this.props.onChange('assign' + iotList[index].dropdown1, false);
      this.props.onChange('value' + iotList[index].dropdown1, 'edt');
      this.props.onChange('valuenum' + iotList[index].dropdown1, '0');
    }
  }

  addIotRow = () => {
    var IOTROW = this.props.rows_state;
    var COUNTER = IOTROW.length;
    if (COUNTER < 10) {
      COUNTER++;
      console.log("added", COUNTER);
      var obj = {
        assign: true,
        dropdown1: 'IOT1',
        dropdown2: 'edt',
        valuenum: '0',
      };
      IOTROW.push(obj);
      this.props.onChange('IOTROW', IOTROW);
      this._updateIotArrayList(IOTROW, []);
    }
  }
  deleteIotRow = () => {
    var IOTROW = this.props.rows_state;
    console.log("IOTROW", IOTROW)
    IOTROW.pop(IOTROW);
    this.props.onChange('IOTROW', IOTROW);
    this._updateIotArrayList(IOTROW, []);

  }

  _assign = (i, value) => {
    var IOTROW = this.props.rows_state;
    console.log(i, value, IOTROW);
    var previousIOTROW = [];
    for (var index in IOTROW) {
      previousIOTROW.push(IOTROW[index]);
    }
    if (value) {
      IOTROW[i - 1]['assign'] = value;
      this.props.onChange('IOTROW', IOTROW);
      this._updateIotArrayList(IOTROW, previousIOTROW);
    } else {
      if (IOTROW.length > 1) {
        IOTROW.splice(i - 1, 1);
      } else {
        IOTROW[i - 1]['assign'] = value;
        this.props.onChange('IOTROW', IOTROW);
      }
      this._updateIotArrayList(IOTROW, previousIOTROW);
    }

  }

  _dropdown1 = (i, value) => {
    console.log(i, value);
    var IOTROW = this.props.rows_state;
    var previousIOTROW = [];
    for (var index in IOTROW) {
      previousIOTROW.push(IOTROW[index]);
    }
    IOTROW[i - 1]['dropdown1'] = value;
    this.props.onChange('IOTROW', IOTROW);
    this._updateIotArrayList(IOTROW, previousIOTROW);

  }

  _dropdown2 = (i, value) => {
    console.log(i, value);
    var IOTROW = this.props.rows_state;
    IOTROW[i - 1]['dropdown2'] = value;
    this.props.onChange('IOTROW', IOTROW);
    this._updateIotArrayList(IOTROW, IOTROW);
  }

  _valuenum = (i, value) => {
    console.log(i, value);
    var IOTROW = this.props.rows_state;
    IOTROW[i - 1]['valuenum'] = value;
    this.props.onChange('IOTROW', IOTROW);
    this._updateIotArrayList(IOTROW, IOTROW);
  }

  getIotRows = () => {

    var onChange = this.props.onChange;
    var SelectOptions = this.props.SelectOptions;
    var SelectOptionsOrder = this.props.SelectOptionsOrder;
    var state = this.props.state;
    var rows_state = this.props.rows_state;
    var temp = [];
    var currentState = this.props.rows_state;
    console.log(currentState.length, "rows");
    currentState.map((iotrow, i) => {
      i++;
      var assignInitValue = iotrow['assign'] || false;
      var iotInitValue = iotrow.dropdown1 || 'IOT1';
      var valueInitValue = iotrow.dropdown2 || 'edt';
      var valueNumInitValue = iotrow['valuenum'] || 0;
      temp.push(
        <tr key={'row' + i} id={'row' + i} style={{ verticalAlign: 'middle', color: '#FFF', borderBottom: '2px solid grey', height: '72px', width: "98vw" }}>
          <td style={{ padding: '0.5em 0', fontWeight: 'bold', width: "15vw" }}>
            <Checkbox key={'assign_' + i} id={'assign_' + i} checked={assignInitValue}
              onChange={(value) => this._assign(i, value)}
              label='ASSIGN' />
          </td>
          <td>
          </td>
          <td style={{ width: '35vw' }}>
            <Select key={'iotrow' + i} id={'iotrow' + i} disabled={!assignInitValue} options={SelectOptions}
              order={SelectOptions} selected={iotInitValue}
              onChange={(value) => this._dropdown1(i, value)} color='#FFF'
              style={{
                display: 'inline-block',
                margin: '0',
                border: '3px solid #FFF',
                padding: '0.25em 0',
                background: Colors.blueshade,
                width: '25vw',
                fontWeight: 'bold',
                textAlign: 'center',
              }} />
          </td>
          <td style={{ textAlign: 'center' }}><span className='comp_lgc_pnl_out_equal'
            style={{ margin: '0px 30px 0px 20px', color: "black", fontSize: "2vw", }}> = </span></td>
          <td>
            <Select key={'valueiotrow' + i} id={'valueiotrow' + i} disabled={!assignInitValue} options={logicVariables}
              order={SelectOptionsOrder} selected={valueInitValue}
              onChange={(value) => this._dropdown2(i, value)} color='#FFF'
              style={{
                margin: '0 15%',
                color: 'black',
                padding: '0.25em 0',
                fontWeight: 'bold',
                width: '25vw',
                background: 'white',
                textAlign: 'center',
              }} />
          </td>
          <td>
            {(!valueInitValue || valueInitValue === 'edt') ? (
              <InputNumber key={'valuenumiotrow' + i} id={'valuenumiotrow' + i} disabled={!assignInitValue}
                value={valueNumInitValue} max={65535} min={0}
                onChange={(value) => this._valuenum(i, value)}
                style={{
                  padding: '0.25em 0',
                  float: 'right'
                }} />
            ) : null}
          </td>
        </tr >
      );
    });

    return temp;
  }

  render() {
    console.log('node specific state', this.props.state);
    const { state, onChange, rows_state, SelectOptions, SelectOptionsOrder } = this.props;
    var iotRows = this.getIotRows();
    return (
      <tbody style={{ width: "100vw" }}>
        {/* <tr id='iotTable' style={{ verticalAlign: 'middle', color: '#FFF' }}>
          <td>
          </td>
          <td>
          </td>
        </tr> */}

        {iotRows}
       <div>
       <button style={{ color: '#000', cursor: "pointer" }} onClick={this.addIotRow}>Add</button>
       <button style={{color: '#000', cursor: "pointer"}} onClick={this.deleteIotRow}>Remove</button>
       </div>

        {/* <img style={{ marginRight: "75%", height: "10%", width: "25%", color: '#000', cursor: "pointer", width: "35px", height: "35px" }} onClick={this.deleteIotRow} src="images/btn_close8.png"></img> */}

        {/* <img style={{ marginLeft: "50%", color: '#000', cursor: "pointer" }} onClick={this.addIotRow} src="images/plus.png"></img> */}

      </tbody>

    );
  }
}
export default IOTRow



