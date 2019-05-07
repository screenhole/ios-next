import React from "react";
import { Svg } from "expo";

function AddIcon(props) {
  return (
    <Svg width="54" height="54">
      <Svg.G
        fill="none"
        fillRule="evenodd"
        stroke={props.color}
        strokeWidth="3"
        transform="translate(2 2)"
      >
        <Svg.Circle cx="25" cy="25" r="25" />
        <Svg.Rect width="9" height="27" x="20.5" y="11.5" rx="4.5" />
        <Svg.Rect
          width="9"
          height="27"
          x="20.5"
          y="11.5"
          rx="4.5"
          transform="rotate(90 25 25)"
        />
      </Svg.G>
    </Svg>
  );
}

export default AddIcon;
