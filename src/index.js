import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducer from "./redux/reducers";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import Learn from './components/learn';
// import MidProgramming from './components/learn/mid_program_homePage';
// import Level from './components/level';
// import CenterMode from './components/concept';
// import SlideChangeHooks from './components/concept/slideTrial.js'
// import CenterMode from './components/concept/slideTrial'
// import Slide from './components/concept/slide'
// import Assembly from './components/Assembly/index';
import { BrowserRouter, HashRouter } from "react-router-dom";

import $ from "jquery";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "bootstrap/dist/css/bootstrap.css";

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
