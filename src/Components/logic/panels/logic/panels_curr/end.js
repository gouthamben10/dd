import React, { Component } from 'react';
import Colors from '../Colors';

class End extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  selectRepeat = () => {
    sessionStorage.setItem('SelectedStatus', "rep");
  }
  selectEnd = () => {
    sessionStorage.setItem('SelectedStatus', 'end');
  }
  render() {
    const { state, onChange } = this.props;
    return (
      <div style={{
        textAlign: 'center',
        color: "black"
      }}>
        <label><input type='radio' onClick={this.selectRepeat} onChange={() => onChange('repeat')} name='logicEndPanelRadio' checked={state === 'repeat'} /> Repeat</label>&nbsp;
        <label><input type='radio' onClick={this.selectEnd} onChange={() => onChange('end')} name='logicEndPanelRadio' checked={state === 'end'} /> End</label>
      </div>
    );
  }
}

export default End;



//var React = require('react');
// var PropTypes = React.PropTypes;

// var End = React.createClass({

//   selectRepeat:function(){
//     sessionStorage.setItem('SelectedStatus',"rep");
//   },
//   selectEnd:function(){
//     sessionStorage.setItem('SelectedStatus','end');
//   },
//   render: function() {
//     const { state, onChange } = this.props;
//     return (
//       <div style={{
//           textAlign: 'center'
//         }}>
//         <label><input type='radio' onClick={this.selectRepeat} onChange={()=>onChange('repeat')} name='logicEndPanelRadio' checked={state === 'repeat'}/> Repeat</label>&nbsp;
//         <label><input type='radio' onClick={this.selectEnd} onChange={()=>onChange('end')} name='logicEndPanelRadio' checked={state === 'end'}/> End</label>
//       </div>
//     );
//   }

// });

// module.exports = End;
