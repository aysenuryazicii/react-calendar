import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import NextPrev from "./NextPrev";

const App = function () {
  return <NextPrev />;
};

ReactDOM.render(<App />, document.querySelector("#root"));
