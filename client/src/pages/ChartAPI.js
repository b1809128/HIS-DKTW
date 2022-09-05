import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
// import { apiStatisticChartConfig } from "../components/token/authorize";
function ChartAPI() {
  const [chartApi, setChartApi] = useState([]);
  const [token] = useCookies("access-token");
  useEffect(() => {
    const getAPI = async () => {
      const res = await axios.get("/api/medical", {
        headers: { token: token["access-token"] },
      });
      setChartApi(res.data);
    };

    getAPI();
  }, [token]);

  console.log(chartApi);
  return <div>ChartAPI</div>;
}

export default ChartAPI;
