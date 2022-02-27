import React, { Component } from 'react'


const style = {
  display: 'inline-block',
  width: '50%',
  padding: '0.5em 0',
  color: '#929497',
  background: '#d1d2d4',
  boxShadow: 'inset 0 0 0 0.25em #FFF',
  fontWeight: 'bold',
  textAlign: 'center',
  width: "35vw"
};

const selectedStyle = {
  color: '#000',
  background: '#0095d9'

}


class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  toggle = () => {
    const { value, onChange } = this.props;
    onChange(!value);
  }
  render() {
    const { value, disabled, on, off } = this.props;
    return (
      <div >
        <label style={{
          ...style,
          ...(value && selectedStyle),
        }}><input type="radio" style={{ display: 'none' }} onClick={this.toggle} disabled={disabled} checked={value} />{on}</label>
        <label style={{
          ...style,
          ...(!value && selectedStyle),
          position: 'relative',
          right: '0.25em', // Equal to box shadow's iinset border
        }}>
          <input type="radio" style={{ display: 'none' }} onClick={this.toggle} disabled={disabled} checked={!value} />
        {off}
        </label>
      </div>
    );
  }

}

export default Switch

