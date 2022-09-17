import React from "react";
import "./ChartCustom.css";
export default function ChartCustom({ children, width, height }) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="30%"
      preserveAspectRatio="xMidYMax meet"
    >
      {children}
    </svg>
  );
}
