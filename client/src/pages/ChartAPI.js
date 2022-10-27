import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { apiStatisticChartConfig } from "../components/token/authorize";
import ColumnChart from "../components/Chart/ColumnChart";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import PieChart from "../components/Chart/PieChart";
import { FlexBar } from "../components/Chart/FlexBar";
import { ComboChart } from "../components/Chart/ComboChart";

function ChartAPI() {
  const [chartApi, setChartApi] = useState([]);
  const [token] = useCookies("access-token");
  // const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const getAPI = async () => {
      const res = await axios.get(apiStatisticChartConfig, {
        headers: {
          token:
            "U7LIjm75IuMbDfUlTlpzfUfI02YqrjbfW+uQxZMSTnmUTdRlStbJNzfjaG3O2dHRQp+DAGMMR0BcXMoO3x5e2RLuN9sQNN9qaDxnth1PagHh+YT1hovR4F7YRKQBn7rOJFp5iJNsK0g8kbo092izb2bvp152NySR0ON6ChtpjkM=",
        },
      });
      setChartApi(res.data.value);
    };

    getAPI();
  }, [token]);

  return (
    <>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        {chartApi.map((data) => {
          return (
            <>
              {data.property[3].value === "pie" ? (
                <Col sm={5}>
                  <PieChart dataCode={data.code} dataDisplay={data.display} />
                </Col>
              ) : (
                <>
                  <Col sm={12}>
                    <FlexBar dataCode={data.code} dataDisplay={data.display} />
                  </Col>

                  <Col sm={12}>
                    <ComboChart
                      dataCode={data.code}
                      dataDisplay={data.display}
                    />
                  </Col>
                  <Col sm={12}>
                    <ColumnChart />
                  </Col>
                </>
              )}
              {/* <p>
              {data.code} - {data.display} - {data.property[3].value}
            </p> */}
            </>
          );
        })}
      </Row>
    </>
  );
}

export default ChartAPI;
