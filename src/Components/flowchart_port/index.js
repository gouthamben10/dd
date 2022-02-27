import React from "react";
import {
  Switch,
  Route,
  // Redirect
} from "react-router-dom";
import Port from "./Port";
import InputOutput from "./Input";
import Digital from "./Digital";
import FlowchartPage from "./FlowchartPage";
import InternalAccessories from "./InternalAccessories";
import Header from "./Header";

function Flow(props) {
  return (
    <div>
      <Switch>
        <Route exact path="/flow" component={InternalAccessories} />
        <Route exact path="/flow/selectports" component={Port} />
        <Route exact path="/flow/input-output" component={InputOutput} />
        <Route exact path="/flow/digital-analog" component={Digital} />
        <Route exact path="/flow/flowchart" component={FlowchartPage} />
      </Switch>
    </div>
  );
}

export default Flow;
