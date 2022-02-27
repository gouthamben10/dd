import React, { Component } from 'react';
class EndIfLoop extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div style={{
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingTop: '0.5em',
      }}>
        END OF {this.props.current.substr('end_'.length)}
      </div>
    );
  }
}

export default EndIfLoop;

// var React = require('react');
// var PropTypes = React.PropTypes;

// var EndIfLoop = React.createClass({

//   render: function() {
//     return (
//       <div style={{
//           textAlign: 'center',
//           textTransform: 'uppercase',
//           fontWeight: 'bold',
//           paddingTop: '0.5em',
//         }}>
//         END OF {this.props.current.substr('end_'.length)}
//       </div>
//     );
//   }

// });

// module.exports = EndIfLoop;
