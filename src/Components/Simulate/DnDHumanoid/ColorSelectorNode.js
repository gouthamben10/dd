import React, { memo } from "react";

import { Handle } from "react-flow-renderer";
import { humanoid_img } from "../../../source/source";
export default memo(({ data }) => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        className="faltuAA"
        style={{
          background: "#5B5F6A",
        }}
        onConnect={(params) => console.log("handle onConnect", params)}
        id="d"
      />
      <img src={humanoid_img} alt="login" height="350px" width="350px" />
      <Handle
        type="source"
        position="right"
        className="faltuBB"
        id="a"
        style={{ top: 83, background: "#5B5F6A" }}
      />
      <Handle
        type="source"
        position="right"
        className="faltucc"
        id="b"
        style={{ top: 108, background: "#5B5F6A" }}
      />
      <Handle
        className="faltuDD"
        type="source"
        position="left"
        style={{ background: "#555", top: 108 }}
        id="c"
      />
    </>
  );
});
