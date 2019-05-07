import React from "react";
import { Svg } from "expo";

function HomeIcon(props) {
  return (
    <Svg width="54" height="54">
      <Svg.G fill="none" fillRule="evenodd" transform="translate(11 11)">
        <Svg.Path
          fill={props.color}
          fillRule="nonzero"
          d="M15.375 2.22l-.937-1.172.937 1.171zm1.25 0l.937-1.172-.937 1.171zm13 10.4l-.937 1.17.937-1.17zm-27.25 0l.937 1.17-.937-1.17zm26.125.78v15.32h3V13.4h-3zm.5 14.82H3v3h26v-3zm-25.5.5V13.4h-3v15.32h3zm-.188-14.93l13-10.4-1.874-2.342-13 10.4 1.874 2.342zm12.376-10.4l13 10.4 1.874-2.342-13-10.4-1.874 2.342zm.624 0a.5.5 0 0 1-.624 0l1.874-2.342a2.5 2.5 0 0 0-3.124 0l1.874 2.342zM3 28.22a.5.5 0 0 1 .5.5h-3a2.5 2.5 0 0 0 2.5 2.5v-3zm25.5.5a.5.5 0 0 1 .5-.5v3a2.5 2.5 0 0 0 2.5-2.5h-3zm3-15.32a2.5 2.5 0 0 0-.938-1.952l-1.874 2.342a.5.5 0 0 1-.188-.39h3zm-28 0a.5.5 0 0 1-.188.39l-1.874-2.342A2.5 2.5 0 0 0 .5 13.4h3z"
        />
        <Svg.Circle
          cx="11.625"
          cy="17.469"
          r="1.5"
          fill={props.color}
          fillRule="nonzero"
          stroke={props.color}
          strokeWidth=".5"
        />
        <Svg.Circle
          cx="20.375"
          cy="17.469"
          r="1.5"
          fill={props.color}
          fillRule="nonzero"
          stroke={props.color}
          strokeWidth=".5"
        />
        <Svg.Path
          fill={props.color}
          fillRule="nonzero"
          d="M14.335 20.692a1.5 1.5 0 1 0-1.92 2.305l1.92-2.305zm5.25 2.305a1.5 1.5 0 1 0-1.92-2.305l1.92 2.305zm-7.17 0l.064.053 1.92-2.305-.064-.053-1.92 2.305zm7.106.053l.064-.053-1.92-2.305-.064.053 1.92 2.305zm-7.042 0a5.5 5.5 0 0 0 7.042 0l-1.92-2.305a2.5 2.5 0 0 1-3.201 0l-1.921 2.305z"
        />
        <Svg.Path
          stroke={props.color}
          strokeLinecap="round"
          strokeWidth="3"
          d="M26.938 3.907v5.25"
        />
      </Svg.G>
    </Svg>
  );
}

export default HomeIcon;
