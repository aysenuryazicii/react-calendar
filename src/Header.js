import React from "react";

const Header = function (props) {
  let date =
    props.months[props.dates.getMonth()] + " " + props.dates.getFullYear();
  return <h1>{date}</h1>;
};

export default Header;
