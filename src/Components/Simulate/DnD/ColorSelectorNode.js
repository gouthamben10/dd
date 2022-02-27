import React, { memo } from "react";

import { Handle } from "react-flow-renderer";
// import {IllusLoginSrc} from '../../../source/source';
export default memo(({ data }) => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        className="faltuA"
        style={{ background: "#555", top: 83 }}
        onConnect={(params) => console.log("handle onConnect", params)}
        id="d"
      />
      <img
        src="Bisoft_UI/Main/PNG/PC_image@3x.png"
        alt="login"
        height="150px"
        width="150px"
      />
      <Handle
        type="source"
        position="right"
        className="faltuB"
        id="a"
        style={{ top: 83, background: "#555" }}
      />
      <Handle
        type="source"
        position="right"
        className="faltuB"
        id="b"
        style={{ top: 108, background: "#555" }}
      />
      <Handle
        className="faltuA"
        type="source"
        position="left"
        style={{ background: "#555", top: 108 }}
        id="c"
      />
    </>
  );
});
