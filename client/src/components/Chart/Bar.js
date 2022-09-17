import React from "react";

function Bar({ x, y, width, height, expenseName, highestExpense }) {
  // console.log(expenseName);
  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={highestExpense === height ? `purple` : `rgb(0, 170, 204)`}
      />
      <text x={x + width / 3} y={y - 5}>
        {`${height}`}
      </text>
    </>
  );
}

export default Bar;
