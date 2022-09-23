import React from "react";
import "./Chart.css";
function SvgPieChart({data}) {
  return (
    <div
      id="my-pie-chart"
      style={{
        background: `conic-gradient(
    brown 0%,
    black 0% 0.55%,
    blue 0.55% 6.08%,
    green 6.08% 13.68%,
    yellow 13.68% 23.27%,
    orange 23.27% 40.47%,
    red 40.47%
  )`,
      }}
    ></div>
  );
}

export default SvgPieChart;
