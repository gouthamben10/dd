import React from 'react';
import Switch from 'react-switch';
import './SwitchDigital.styles.scss'
export default function SwitchDigital(props) {
    return (
        <Switch type="checkbox" 
        checkedIcon={
            <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 10,
          color: "white",
          paddingLeft: 3,
          position: "relative",
          bottom: '1%'
        }}
      >
        Digital
      </div>
        } 
        uncheckedIcon={
            <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 10,
          color: "white",
          paddingRight: 5,
          position: "relative",
          bottom: '5%'
        }}
      >
        Analog
      </div>
        } 
        onColor='#f8c01d'
        offColor='#5095ce'
        height={22}
        width={65}
        handleDiameter={20}
        disabled={props.disabled}
        checked={props.checked || props.checked1 || false}
        onChange={props.changeToggle1 || props.changeToggle2}
        className="ls"
        />
    )
}
