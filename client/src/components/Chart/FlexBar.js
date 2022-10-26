import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import {
  apiStatisticDataSTAVW_0001,
  apiStatisticDataSTAVW_0002,
  apiStatisticDataSTAVW_0003,
} from "../token/authorize";
import axios from "axios";
import { useCookies } from "react-cookie";

export function FlexBar({ dataCode, dataDisplay }) {
  const [apiData, setApiData] = useState([]);
  const [token] = useCookies(["access-token"]);
  let apiURL;
  if (dataCode === "STAVW_0001") {
    apiURL = apiStatisticDataSTAVW_0001;
  }
  if (dataCode === "STAVW_0002") {
    apiURL = apiStatisticDataSTAVW_0002;
  }
  if (dataCode === "STAVW_0003") {
    apiURL = apiStatisticDataSTAVW_0003;
  }

  useEffect(() => {
    const getAPI = async () => {
      await axios
        .get(apiURL, {
          headers: {
            token: token["access-token"],
          },
        })
        .then((res) => {
          setApiData(res.data.value);
        })
        .catch((err) => console.log(err));
    };
    getAPI();
  }, [apiURL, token]);

  /**
 apiData.map((data) => [
      data.display,
      data.elements[0],
      data.elements[1],
      data.elements[2],
      data.elements[3],
    ])

const data = [
    ["Chart", "Total", "New", "Process", "Final"],
    ["New York City, NY", 8175000, 8008000, 100000, 1768],
    ["Los Angeles, CA", 3792000, 3694000, 100000, 989010],
    ["Chicago, IL", 2695000, 2896000, 100000, 27839],
    ["Houston, TX", 2099000, 1953000, 100000, 2190380],
    ["Philadelphia, PA", 1526000, 1517000, 100000, 732987],
  ];

 */

  const options = {
    title: dataDisplay,
    chartArea: { width: "60%" },
    isStacked: true,
    hAxis: {
      title: "Biểu đồ thống kê",
      minValue: 0,
    },
  };

  let mapApiData = apiData.map((data) => [
    data.display,
    data.elements[0].value,
    data.elements[1].value,
    data.elements[2].value,
    data.elements[3].value,
  ]);
  let chartData = [["Chart", "Total", "New", "Process", "Final"]];
  for (let i = 0; i < mapApiData.length; i++) {
    chartData.push(mapApiData[i]);
  }

  // console.log(chartData);
  return (
    <>
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    </>
  );
}
