import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import App from "./App";

const Apps = function () {
  return <App />;
};

ReactDOM.render(<Apps />, document.querySelector("#root"));
