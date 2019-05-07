import React from "react";
import { Svg } from "expo";

function SupIcon(props) {
  return (
    <Svg width="54" height="54">
      <Svg.Path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M30.061 38.723a2.59 2.59 0 0 1-.942.949 2.556 2.556 0 0 1-2.572 0 2.59 2.59 0 0 1-.943-.95h4.458zm10.654-5.205H14.95a3.845 3.845 0 0 0 2.733-1.143 3.924 3.924 0 0 0 1.132-2.76v-6.507c0-2.415.95-4.732 2.64-6.44A8.972 8.972 0 0 1 27.834 14c2.391 0 4.685.96 6.376 2.668a9.155 9.155 0 0 1 2.641 6.44v6.506c0 1.035.407 2.028 1.132 2.76a3.845 3.845 0 0 0 2.733 1.144z"
      />
    </Svg>
  );
}

export default SupIcon;
