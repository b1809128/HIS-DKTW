import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "./Chart.css";
import { apiStatisticData } from "../token/authorize";
import { useCookies } from "react-cookie";
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ height }) {
  const [apiData, setApiData] = useState([]);
  const [token] = useCookies(["access-token"]);
  useEffect(() => {
    const getAPI = async () => {
      await axios
        .get(apiStatisticData, {
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
  }, [token]);

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
    <div className="chart-div" style={{ height: height }}>
      <Pie data={data} />
      <p style={{ textAlign: "center" }}>Biểu đồ </p>
    </div>
  );
}
export default PieChart;
