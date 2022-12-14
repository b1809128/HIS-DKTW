import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "./Chart.css";
import { apiStatisticDaily } from "../token/authorize";
import { useCookies } from "react-cookie";
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ height }) {
  const [apiData, setApiData] = useState([]);
  const [title, setTitle] = useState("");
  const [token] = useCookies(["access-token"]);
  useEffect(() => {
    const getAPI = async () => {
      await axios
        .get(apiStatisticDaily, {
          headers: {
            token: token["access-token"],
          },
        })
        .then((res) => {
          setApiData(res.data.value.elements);
          setTitle(res.data.value.display);
        })
        .catch((err) => console.log(err));
    };
    getAPI();
  }, [token]);
  // console.log(apiData);
  let newArray = [];
  for (let i = 0; i < apiData.length; i++) {
    for (let j = 0; j < apiData[i].items.length; j++) {
      newArray.push(apiData[i].items[j]);
    }
  }

  let data = {
    labels: newArray.map((data) => data.display),
    datasets: [
      {
        label: "# of Votes",
        data: newArray.map((data) => data.value),
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
      <Doughnut data={data} />
      <p style={{ textAlign: "center" }}>Bi???u ????? {title}</p>
    </div>
  );
}
export default DoughnutChart;