import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import {
  apiStatisticDataSTAVW_0001,
  apiStatisticDataSTAVW_0002,
  apiStatisticDataSTAVW_0003,
} from "../token/authorize";
import axios from "axios";
import { useCookies } from "react-cookie";
export function ComboChart({ dataCode, dataDisplay }) {
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

  const options = {
    title: dataDisplay,
    seriesType: "bars",
    series: { 4: { type: "line" } },
  };

  let mapApiData = apiData.map((data) => {
    let avg =
      (data.elements[0].value +
        data.elements[1].value +
        data.elements[2].value +
        data.elements[3].value) /
      4;
    return [
      data.display,
      data.elements[0].value,
      data.elements[1].value,
      data.elements[2].value,
      data.elements[3].value,
      avg,
    ];
  });

  let chartData = [["Chart", "Total", "New", "Process", "Final", "Average"]];
  for (let i = 0; i < mapApiData.length; i++) {
    chartData.push(mapApiData[i]);
  }

  return (
    <Chart
      chartType="ComboChart"
      width="100%"
      height="400px"
      data={chartData}
      options={options}
    />
  );
}
