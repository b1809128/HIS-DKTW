import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { apiStatisticChartConfig } from "../components/token/authorize";
import ColumnChart from "../components/Chart/ColumnChart";
import DoughnutChart from "../components/Chart/DoughnutChart";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
function ChartAPI() {
  const [chartApi, setChartApi] = useState([]);
  const [token] = useCookies("access-token");
  useEffect(() => {
    const getAPI = async () => {
      const res = await axios.get(apiStatisticChartConfig, {
        headers: {
          token:
            "cotI/T+E++ZkSS/GUcJ5ouDk9xSq41QigVyd0Jt0IkOR/Vc0QCzh9WAwaNscPCDe6O3Ne61n9a0SWjFUcMeyGRT9/qAj7Yn4x0Y8Ikm5CYNDyD2oKdtRJZ6TRqEnkhlCVxzv8qPxZmS7fxCIUJ08q5paSO2Ph99IbPeaxizKekI=",
        },
      });
      setChartApi(res.data.value);
    };

    getAPI();
  }, [token]);

  // console.log(chartApi);
  return (
    <>
      {chartApi.map((data) => {
        return (
          <Row>
            {data.property[3].value === "pie" ? (
              <Col sm={4}>
                <DoughnutChart />
              </Col>
            ) : (
              <Col sm={6}>
                <ColumnChart />
              </Col>
            )}
            <p>
              {data.code} - {data.display} - {data.property[3].value}
            </p>
          </Row>
        );
      })}
    </>
  );
}

export default ChartAPI;
