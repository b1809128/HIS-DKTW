import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
  apiStatisticChartConfig,
  apiStatisticData,
} from "../components/token/authorize";
import ColumnChart from "../components/Chart/ColumnChart";
import DoughnutChart from "../components/Chart/DoughnutChart";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ChartCustom from "../components/Chart/ChartCustom";
import Bar from "../components/Chart/Bar";
import SvgPieChart from "../components/Chart/SvgPieChart";
import PieChart from "../components/Chart/PieChart";
function ChartAPI() {
  const [chartApi, setChartApi] = useState([]);
  const [token] = useCookies("access-token");
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const getAPI = async () => {
      const res = await axios.get(apiStatisticChartConfig, {
        headers: {
          token:
            "cotI/T+E++ZkSS/GUcJ5ouDk9xSq41QigVyd0Jt0IkOR/Vc0QCzh9WAwaNscPCDe6O3Ne61n9a0SWjFUcMeyGRT9/qAj7Yn4x0Y8Ikm5CYNDyD2oKdtRJZ6TRqEnkhlCVxzv8qPxZmS7fxCIUJ08q5paSO2Ph99IbPeaxizKekI=",
        },
      });
      setChartApi(res.data.value);
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

  // console.log(apiData.value.map((data) => data.elements[0].value));
  let totalData = apiData.map((data) => data.elements[0].value);

  let calculatedTotalData = 0;
  for (let i = 0; i < totalData.length; i++) {
    calculatedTotalData += totalData[i];
  }
  const totalDataPercent = totalData.map(
    (data) => (data * 100) / calculatedTotalData
  );
  // console.log(totalDataPercent);

  const data = [
    { name: "Phone", expense: 151 },
    { name: "Electricity", expense: 100 },
    { name: "Car", expense: 5 },
    { name: "House", expense: 43 },
    { name: "Food", expense: 56 },
    { name: "Leisure", expense: 182 },
  ];
  const [expensesData] = useState(data);
  const maxExpense = 200;
  const chartHeight = maxExpense + 20;
  const barWidth = 50;
  const barMargin = 30;
  const numberofBars = expensesData.length;
  let width = numberofBars * (barWidth + barMargin);

  // Calculate highest expense for the month
  const calculateHighestExpense = (data) =>
    data.reduce((acc, cur) => {
      const { expense } = cur;
      return expense > acc ? expense : acc;
    }, 0);

  const [highestExpense] = useState(calculateHighestExpense(data));

  return (
    <>
      <ChartCustom height={chartHeight} width={width}>
        {expensesData.map((data, index) => {
          const barHeight = data.expense;
          return (
            <Bar
              key={data.name}
              x={index * (barWidth + barMargin)}
              y={chartHeight - barHeight}
              width={barWidth}
              height={barHeight}
              expenseName={data.name}
              highestExpense={highestExpense}
            />
          );
        })}
      </ChartCustom>

      <SvgPieChart data={totalDataPercent} />
      <PieChart />
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