import React, { useState, useLayoutEffect } from "react";
import Slider from "../helpers/Slider";
import { useLocalStorage } from "../../../../../LocalStorage/LocalStorage";
import "./output.css";
var _0to60 = {},
  _0to24 = {},
  _0to1000 = {};
for (let i = 0; i < 24; i++) _0to24[i] = i;
for (let i = 0; i < 60; i++) _0to60[i] = i;
for (let i = 0; i < 1000; i += 50) _0to1000[i] = i;
let a1 = [],
  a2 = [],
  b1 = [],
  b2 = [],
  c1 = [],
  c2 = [],
  d1 = [],
  d2 = [],
  t0 = [],
  t1 = [],
  t2 = [],
  le = [],
  re = [],
  buzz = [],
  s1 = [],
  s2 = [],
  s3 = [],
  s4 = [];
for (let i = 0; i < 1000; i++) {
  a1[i] = 0;
  a2[i] = 0;
  b1[i] = 0;
  b2[i] = 0;
  c1[i] = 0;
  c2[i] = 0;
  d1[i] = 0;
  d2[i] = 0;
  t0[i] = 0;
  t1[i] = 0;
  t2[i] = 0;
  le[i] = 0;
  re[i] = 0;
  buzz[i] = 0;
  s1[i] = 0;
  s2[i] = 0;
  s3[i] = 0;
  s4[i] = 0;
}
var ms = 0;
const OutputPanel = (props) => {
  useLayoutEffect(() => {
    return () => {
      a1[props.check] = valA1;
      a2[props.check] = valA2;
      b1[props.check] = valB1;
      b2[props.check] = valB2;
      c1[props.check] = valC1;
      c2[props.check] = valC2;
      d1[props.check] = valD1;
      d2[props.check] = valD2;
      t0[props.check] = valT0;
      t1[props.check] = valT1;
      t2[props.check] = valT2;
      le[props.check] = valLeye;
      re[props.check] = valReye;
      buzz[props.check] = valBuzz;
      s1[props.check] = valSm1;
      s2[props.check] = valSm2;
      s3[props.check] = valSm3;
      s4[props.check] = valSm4;
      console.log("=====>props=====>======>", a1[props.check]);
    };
  });
  const [valA1, setvalA1] = useState(a1[props.check]);
  const [valA2, setvalA2] = useState(a2[props.check]);
  const [valB1, setvalB1] = useState(b1[props.check]);
  const [valB2, setvalB2] = useState(b2[props.check]);
  const [valC1, setvalC1] = useState(c1[props.check]);
  const [valC2, setvalC2] = useState(c2[props.check]);
  const [valD1, setvalD1] = useState(d1[props.check]);
  const [valD2, setvalD2] = useState(d2[props.check]);
  const [valT0, setvalT0] = useState(t0[props.check]);
  const [valT1, setvalT1] = useState(t1[props.check]);
  const [valT2, setvalT2] = useState(t2[props.check]);
  const [valLeye, setvalLeye] = useState(le[props.check]);
  const [valReye, setvalReye] = useState(re[props.check]);
  const [valBuzz, setvalBuzz] = useState(buzz[props.check]);
  const [valSm1, setvalSm1] = useState(s1[props.check]);
  const [valSm2, setvalSm2] = useState(s2[props.check]);
  const [valSm3, setvalSm3] = useState(s3[props.check]);
  const [valSm4, setvalSm4] = useState(s4[props.check]);
  // const [a1Checked] = useLocalStorage("a1-I/O");
  // const [a1Digi] = useLocalStorage("A1DIGI");
  const a1Checked = JSON.parse(sessionStorage.getItem("a1-I/O"));
  const a1Digi = JSON.parse(sessionStorage.getItem("A1DIGI"));
  const a2Checked = JSON.parse(sessionStorage.getItem("a2-I/O"));
  const a2Digi = JSON.parse(sessionStorage.getItem("A2DIGI"));
  const b1Checked = JSON.parse(sessionStorage.getItem("b1-I/O"));
  const b1Digi = JSON.parse(sessionStorage.getItem("B1DIGI"));
  const b2Checked = JSON.parse(sessionStorage.getItem("b2-I/O"));
  const b2Digi = JSON.parse(sessionStorage.getItem("B2DIGI"));
  const c1Checked = JSON.parse(sessionStorage.getItem("c1-I/O"));
  const c1Digi = JSON.parse(sessionStorage.getItem("C1DIGI"));
  const c2Checked = JSON.parse(sessionStorage.getItem("c2-I/O"));
  const c2Digi = JSON.parse(sessionStorage.getItem("C2DIGI"));
  const d1Checked = JSON.parse(sessionStorage.getItem("D1"));
  const d1Digi = JSON.parse(sessionStorage.getItem("D1DIGI"));
  const d2Checked = JSON.parse(sessionStorage.getItem("D2"));
  const d2Digi = JSON.parse(sessionStorage.getItem("D2DIGI"));
  const A1 = JSON.parse(sessionStorage.getItem("A1"));
  const A2 = JSON.parse(sessionStorage.getItem("A2"));
  const B1 = JSON.parse(sessionStorage.getItem("B1"));
  const B2 = JSON.parse(sessionStorage.getItem("B2"));
  const C1 = JSON.parse(sessionStorage.getItem("C1"));
  const C2 = JSON.parse(sessionStorage.getItem("C2"));
  const D1 = JSON.parse(sessionStorage.getItem("D1"));
  const D2 = JSON.parse(sessionStorage.getItem("D2"));

  let isTouchZeroOutput = JSON.parse(
    sessionStorage.getItem("isTouchZeroOutput")
  );
  let isTouchOneOutput = JSON.parse(sessionStorage.getItem("isTouchOneOutput"));
  let isTouchTwoOutput = JSON.parse(sessionStorage.getItem("isTouchTwoOutput"));
  let isSmileOne = JSON.parse(sessionStorage.getItem("isSmileOne"));
  let isSmileTwo = JSON.parse(sessionStorage.getItem("isSmileTwo"));
  let isSmileThree = JSON.parse(sessionStorage.getItem("isSmileThree"));
  let isSmileFour = JSON.parse(sessionStorage.getItem("isSmileFour"));
  let isEyeLeft = JSON.parse(sessionStorage.getItem("isEyeLeft"));
  let isEyeRight = JSON.parse(sessionStorage.getItem("isEyeRight"));
  let isBuzzer = JSON.parse(sessionStorage.getItem("isBuzzer"));
  // const [a1Digi, seta1d] = useState(
  //   JSON.parse(sessionStorage.getItem("A1DIGI"))
  // );
  const onChange = (key, value) => {
    if (key === "a1") {
      setvalA1(value);
      return;
    } else if (key === "a2") {
      setvalA2(value);
      return;
    } else if (key === "b1") {
      setvalB1(value);
      return;
    } else if (key === "b2") {
      setvalB2(value);
      return;
    } else if (key === "c1") {
      setvalC1(value);
      return;
    } else if (key === "c2") {
      setvalC2(value);
      return;
    } else if (key === "d1") {
      setvalD1(value);
      return;
    } else if (key === "d2") {
      setvalD2(value);
      return;
    } else if (key === "t0") {
      setvalT0(value);
    } else if (key === "t1") {
      setvalT1(value);
    } else if (key === "t2") {
      setvalT2(value);
    } else if (key === "leye") {
      setvalLeye(value);
    } else if (key === "reye") {
      setvalReye(value);
    } else if (key === "buzz") {
      setvalBuzz(value);
    } else if (key === "sm1") {
      setvalSm1(value);
    } else if (key === "sm2") {
      setvalSm2(value);
    } else if (key === "sm3") {
      setvalSm3(value);
    } else if (key === "sm4") {
      setvalSm4(value);
    }
    // if (key === "a1") {
    //   if (!a1Digi) {
    //     if (valA1 === 1) setvalA1(valA1 - 1);
    //     else if (valA1 === 0) setvalA1(valA1 + 1);
    //   }
    //   console.log("Changed====>>>>>>>>>>>>>>>>>>>>>>>>>");
    // } else if (key === "a2") {
    //   if (!a2Digi) {
    //     if (valA2 === 1) setvalA2(valA2 - 1);
    //     else if (valA2 === 0) setvalA2(valA2 + 1);
    //   }
    // } else if (key === "b1") {
    //   if (!b1Digi) {
    //     if (valB1 === 1) setvalA2(valB1 - 1);
    //     else if (valB1 === 0) setvalA2(valB1 + 1);
    //   }
    // } else if (key === "b2") {
    //   if (!b2Digi) {
    //     if (valB2 === 1) setvalA2(valB2 - 1);
    //     else if (valB2 === 0) setvalA2(valB2 + 1);
    //   }
    // } else if (key === "c1") {
    //   if (!c1Digi) {
    //     if (valC1 === 1) setvalA2(valC1 - 1);
    //     else if (valC1 === 0) setvalA2(valC1 + 1);
    //   }
    // } else if (key === "c2") {
    //   if (!c2Digi) {
    //     if (valC2 === 1) setvalA2(valC2 - 1);
    //     else if (valC2 === 0) setvalA2(valC2 + 1);
    //   }
    // } else if (key === "d1") {
    //   if (!d1Digi) {
    //     if (valD1 === 1) setvalA2(valD1 - 1);
    //     else if (valD1 === 0) setvalA2(valD1 + 1);
    //   }
    // } else if (key === "d2") {
    //   if (!d2Digi) {
    //     if (valD2 === 1) setvalA2(valD2 - 1);
    //     else if (valD2 === 0) setvalA2(valD2 + 1);
    //   }
    // } else if (key === "t0") {
    //   if (valT0 === 1) setvalT0(valT0 - 1);
    //   else if (valT0 === 0) setvalT0(valT0 + 1);
    // } else if (key === "t1") {
    //   if (valT1 === 1) setvalT1(valT1 - 1);
    //   else if (valT1 === 0) setvalT1(valT1 + 1);
    // } else if (key === "t2") {
    //   if (valT2 === 1) setvalT2(valT2 - 1);
    //   else if (valT2 === 0) setvalT2(valT2 + 1);
    // } else if (key === "leye") {
    //   if (valLeye === 1) setvalLeye(valLeye - 1);
    //   else if (valLeye === 0) setvalLeye(valLeye + 1);
    // } else if (key === "reye") {
    //   if (valReye === 1) setvalReye(valReye - 1);
    //   else if (valReye === 0) setvalReye(valReye + 1);
    // } else if (key === "buzz") {
    //   if (valBuzz === 1) setvalBuzz(valBuzz - 1);
    //   else if (valBuzz === 0) setvalBuzz(valBuzz + 1);
    // } else if (key === "sm1") {
    //   if (valSm1 === 1) setvalSm1(valSm1 - 1);
    //   else if (valSm1 === 0) setvalSm1(valSm1 + 1);
    // } else if (key === "sm2") {
    //   if (valSm2 === 1) setvalSm2(valSm2 - 1);
    //   else if (valSm2 === 0) setvalSm2(valSm2 + 1);
    // } else if (key === "sm3") {
    //   if (valSm3 === 1) setvalSm3(valSm3 - 1);
    //   else if (valSm3 === 0) setvalSm3(valSm3 + 1);
    // } else if (key === "sm4") {
    //   if (valSm4 === 1) setvalSm4(valSm4 - 1);
    //   else if (valSm4 === 0) setvalSm4(valSm4 + 1);
    // }
    // console.log("ddd====>", d1Checked);
  };

  return (
    <div className="outertabDiv-output">
      <div className="slider-section">
          {a1Checked && A1 ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              {!a1Digi ? (
                <div>
                  {" "}
                  <span>
                    {" "}
                    <span className="hardwareText">A1 Digital</span>
                    <Slider
                      title="Intensity"
                      value={valA1}
                      min={0}
                      max={1}
                      disabled={!a1Checked}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("a1", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      1
                    </p>
                  </span>
                </div>
              ) : (
                <div>
                  {" "}
                  <span>
                    {" "}
                    <span className="hardwareText">A1 Analog</span>
                    <Slider
                      title="Intensity"
                      value={valA1 || 0}
                      min={0}
                      max={100}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("a1", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      100
                    </p>
                  </span>
                </div>
              )}
            </div>
          ) : null}
      
          {a2Checked && A2 ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              {!a2Digi ? (
                <div>
                  {" "}
                  <span>
                    {" "}
                    <span className="hardwareText">A2 Digital</span>
                    <Slider
                      title="Intensity"
                      value={valA2 || 0}
                      min={0}
                      max={1}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("a2", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      1
                    </p>
                  </span>
                </div>
              ) : (
                <div>
                  {" "}
                  <span>
                    {" "}
                    <span className="hardwareText">A2 Analog</span>
                    <Slider
                      title="Intensity"
                      value={valA2 || 0}
                      min={0}
                      max={100}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("a2", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      100
                    </p>
                  </span>
                </div>
              )}
            </div>
          ) : (
            null
          )}
       
          {b1Checked && B1 ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              {!b1Digi ? (
                <div>
                  {" "}
                  <span>
                    {" "}
                   
                    <span className="hardwareText">B1 Digital</span>
                    <Slider
                      title="Intensity"
                      value={valB1 || 0}
                      min={0}
                      max={1}
                      disabled={!b1Checked}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("b1", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      1
                    </p>
                  </span>
                </div>
              ) : (
                <div>
                  {" "}
                  <span>
                    {" "}
                    
                    <span className="hardwareText">B1 Analog</span>
                    <Slider
                      title="Intensity"
                      value={valB1 || 0}
                      min={0}
                      max={100}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("b1", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      100
                    </p>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
      
          {b2Checked && B2 ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              {!b2Digi ? (
                <div>
                  {" "}
                  <span>
                    {" "}

                    <span className="hardwareText">B2 Digital</span>
                    <Slider
                      title="Intensity"
                      value={valB2 || 0}
                      min={0}
                      max={1}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("b2", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      1
                    </p>
                  </span>
                </div>
              ) : (
                <div>
                  {" "}
                  <span>
                    {" "}
                   
                    <span className="hardwareText">B2 Analog</span>
                    <Slider
                      title="Intensity"
                      value={valB2 || 0}
                      min={0}
                      max={100}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("b2", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      100
                    </p>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}

          {c1Checked && C1 ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              {!c1Digi ? (
                <div>
                  {" "}
                  <span>
                    {" "}
                    
                    <span className="hardwareText">C1 Digital</span>
                    <Slider
                      title="Intensity"
                      value={valC1 || 0}
                      min={0}
                      max={1}
                      disabled={!c1Checked}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("c1", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      1
                    </p>
                  </span>
                </div>
              ) : (
                <div>
                  {" "}
                  <span>
                    {" "}
                    
                    <span className="hardwareText">C1 Analog</span>
                    <Slider
                      title="Intensity"
                      value={valC1 || 0}
                      min={0}
                      max={100}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("c1", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      100
                    </p>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
      
          {c2Checked && C2 ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              {!c2Digi ? (
                <div>
                  {" "}
                  <span>
                    {" "}
                    
                    <span className="hardwareText">C2 Digital</span>
                    <Slider
                      title="Intensity"
                      value={valC2 || 0}
                      min={0}
                      max={1}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("c2", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      1
                    </p>
                  </span>
                </div>
              ) : (
                <div>
                  {" "}
                  <span>
                    {" "}
                    
                    <span className="hardwareText">C2 Analog</span>
                    <Slider
                      title="Intensity"
                      value={valC2 || 0}
                      min={0}
                      max={100}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("c2", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      100
                    </p>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
     
          {d1Checked && D1 ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              {!d1Digi ? (
                <div>
                  {" "}
                  <span>
                    {" "}
                  
                    <span className="hardwareText">D1 Digital</span>
                    <Slider
                      title="Intensity"
                      value={valD1 || 0}
                      min={0}
                      max={1}
                      disabled={!d1Checked}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("d1", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      1
                    </p>
                  </span>
                </div>
              ) : (
                <div>
                  {" "}
                  <span>
                    {" "}
                    
                    <span className="hardwareText">D1 Analog</span>
                    <Slider
                      title="Intensity"
                      value={valD1 || 0}
                      min={0}
                      max={100}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("d1", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      100
                    </p>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
     
          {d2Checked && D2 ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              {!d2Digi ? (
                <div>
                  {" "}
                  <span>
                    {" "}
                   
                    <span className="hardwareText">D2 Digital</span>
                    <Slider
                      title="Intensity"
                      value={valD2 || 0}
                      min={0}
                      max={1}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("d2", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      1
                    </p>
                  </span>
                </div>
              ) : (
                <div>
                  {" "}
                  <span>
                    {" "}
                    
                    <span className="hardwareText">D2 Analog</span>
                    <Slider
                      title="Intensity"
                      value={valD2 || 0}
                      min={0}
                      max={100}
                      renderIn="hardwarePropertyPanel"
                      onChange={(value) => onChange("d2", value)}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",
                        left: "33%",
                        fontSize: "16px",
                      }}
                    >
                      0
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        top: "55%",

                        fontSize: "16px",
                        right: "13%",
                      }}
                    >
                      100
                    </p>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
      
          {isTouchZeroOutput ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              <span>
                {" "}
                
                <span className="hardwareText">TouchPad Zero</span>
                <Slider
                  title="Intensity"
                  value={valT0 || 0}
                  min={0}
                  max={1}
                  renderIn="hardwarePropertyPanel"
                  onChange={(value) => onChange("t0", value)}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  1
                </p>
              </span>
            </div>
          ) : (
            null
          )}
      
          {isTouchOneOutput ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              <span>
                {" "}
                
                <span className="hardwareText">TouchPad One</span>
                <Slider
                  title="Intensity"
                  value={valT1 || 0}
                  min={0}
                  max={1}
                  renderIn="hardwarePropertyPanel"
                  onChange={(value) => onChange("t1", value)}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  1
                </p>
              </span>
            </div>
          ) : (
            null
          )}
      

          {isTouchTwoOutput ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              <span>
                {" "}
                
                <span className="hardwareText">TouchPad Two</span>
                <Slider
                  title="Intensity"
                  value={valT2 || 0}
                  min={0}
                  max={1}
                  renderIn="hardwarePropertyPanel"
                  onChange={(value) => onChange("t2", value)}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  1
                </p>
              </span>
            </div>
          ) : (
            null
          )}
      
          {isEyeLeft ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              <span>
                {" "}
                
                <span className="hardwareText">Left Eye</span>
                <Slider
                  title="Intensity"
                  value={valLeye || 0}
                  min={0}
                  max={1}
                  renderIn="hardwarePropertyPanel"
                  onChange={(value) => onChange("leye", value)}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  1
                </p>
              </span>
            </div>
          ) : (
            null
          )}
    
          {isEyeRight ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              <span>
                {" "}
                <span className="hardwareText">Right Eye</span>
                <Slider
                  title="Intensity"
                  value={valReye || 0}
                  min={0}
                  max={1}
                  renderIn="hardwarePropertyPanel"
                  onChange={(value) => onChange("reye", value)}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  1
                </p>
              </span>
            </div>
          ) : (
            null
          )}
       
          {isBuzzer ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              <span>
                {" "}
                <span className="hardwareText">Buzzer</span>
                <Slider
                  title="Intensity"
                  value={valBuzz || 0}
                  min={0}
                  max={1}
                  renderIn="hardwarePropertyPanel"
                  onChange={(value) => onChange("buzz", value)}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  1
                </p>
              </span>
            </div>
          ) : (
            null
          )}

          {isSmileOne ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              <span>
                {" "}
                <span className="hardwareText">Smile LED One</span>
                <Slider
                  title="Intensity"
                  value={valSm1 || 0}
                  min={0}
                  max={1}
                  renderIn="hardwarePropertyPanel"
                  onChange={(value) => onChange("sm1", value)}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  1
                </p>
              </span>
            </div>
          ) : (
            null
          )}
  
          {isSmileTwo ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              <span>
                {" "}
                <span className="hardwareText">Smile LED Two</span>
                <Slider
                  title="Intensity"
                  value={valSm2 || 0}
                  min={0}
                  max={1}
                  renderIn="hardwarePropertyPanel"
                  onChange={(value) => onChange("sm2", value)}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  1
                </p>
              </span>
            </div>
          ) : (
            null
          )}
      
          {isSmileThree ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              <span>
                {" "}
                <span className="hardwareText">Smile LED Three</span>
                <Slider
                  title="Intensity"
                  value={valSm3 || 0}
                  min={0}
                  max={1}
                  renderIn="hardwarePropertyPanel"
                  onChange={(value) => onChange("sm3", value)}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  1
                </p>
              </span>
            </div>
          ) : (
            null
          )}
     
          {isSmileFour ? (
            <div className="slider-item1" style={{ position: "relative" }}>
              {" "}
              <span>
                {" "}
                <span className="hardwareText">Smile LED Four</span>
                <Slider
                  title="Intensity"
                  value={valSm4 || 0}
                  min={0}
                  max={1}
                  renderIn="hardwarePropertyPanel"
                  onChange={(value) => onChange("sm4", value)}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "33%",
                    fontSize: "16px",
                  }}
                >
                  0
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "55%",

                    fontSize: "16px",
                    right: "13%",
                  }}
                >
                  1
                </p>
              </span>
            </div>
          ) : (
            null
          )}
     
      </div>
    </div>
  );
};

export default OutputPanel;
