import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "./Chart.css";
import {
  apiStatisticDataSTAVW_0001,
  apiStatisticDataSTAVW_0002,
  apiStatisticDataSTAVW_0003,
} from "../token/authorize";
import { useCookies } from "react-cookie";
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ dataCode, dataDisplay }) {
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

  let labelsArray = apiData.map((data) => data.display);
  let dataArray = apiData.map((data) => data.elements[0].value);
  let data = {
    labels: labelsArray,
    datasets: [
      {
        label: "# of Votes",
        data: dataArray,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="chart-div">
      <Pie data={data} />
      <p style={{ textAlign: "center", fontWeight:500, fontSize: "0.8rem" }}>{dataDisplay}</p>
    </div>
  );
}
export default PieChart;
