import React from "react";
import { Svg } from "expo";

function HamburgerIcon(props) {
  return (
    <Svg width="54" height="54">
      <Svg.Path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeWidth="3"
        d="M14.5 18.5h25m-25 8.867h25m-25 8.866h25"
      />
    </Svg>
  );
}

export default HamburgerIcon;
