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
            "DDnsj7zXrM+9O3kbExmb/+vLLWJT7FIZpnWMDrNABLp7iJ+QlpKb8HPx79FeuSTTJnxgLHg2PPq5zWBmmkkrWEZIoO+feS1XcctW0HHFUbQax029MscJfQwO+fuQwjwGqqbMUbc9p9yXS+bGGfA9SMIMFl2cAkOJahrSMygC/ak=",
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
