import React, { useState } from "react";
import Switch from "react-switch";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
export default function SwitchButton(props) {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Digital", value: "1" },
    { name: "Analog", value: "2" },
  ];
  return (
    <>
      {/* <ButtonGroup>
        <ToggleButton
 
          id={props.text}
          type="radio"
          variant={"outline-success"}
          name="radio"
          checked={props.checked}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
          disabled={props.disable1}
        ></ToggleButton>
        <ToggleButton

          id={props.text}
          type="radio"
          variant={"outline-success"}
          name="radio"
          checked={props.checked1}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
          disabled={props.disable1}
        ></ToggleButton>
      </ButtonGroup> */}
      <br />
    </>
  );
}
