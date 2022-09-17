import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main";
import ScrollTop from "../components/ScrollTop/ScrollTop";
import ListBar from "../components/ListBar/ListBar";
import DragList from "../components/DND/DragList";
import Table from "./Table";
import Configure from "./Configure";
import Unit from "./Unit";
import Receipt from "./Receipt";
import ChartAPI from "./ChartAPI";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarComponent from "../components/Navbar/Navbar";

export default function BodyApp() {
  const [configPosition, setConfigPosition] = useState([]);
  const [layOutArray] = useState([
    { size: 2, component: <ListBar /> },
    {
      size: 10,
      component: (
        <Router>
          <Routes>
            <Route exact path="/" element={<Main />} />
          </Routes>
          <Routes>
            <Route path="/Unit" element={<Unit />} />
          </Routes>
          <Routes>
            <Route path="/Receipt" element={<Receipt />} />
          </Routes>
          <Routes>
            <Route path="/Table" element={<Table />} />
          </Routes>
          <Routes>
            <Route path="/Drag" element={<DragList />} />
          </Routes>
          <Routes>
            <Route path="/ChartAPI" element={<ChartAPI />} />
          </Routes>
          <Routes>
            <Route path="/Configure" element={<Configure />} />
          </Routes>
          <ScrollTop />
        </Router>
      ),
    },
  ]);
  useEffect(() => {
    const getAPI = async () => {
      const getUserData = await axios.get(
        "http://localhost:5000/api/auth/usr1"
      );
      let cgPos = getUserData.data[0].content;
      let newCgPos = [];

      for (let i = 0; i < cgPos.length; i++) {
        for (let j = 0; j < layOutArray.length; j++) {
          if (cgPos[i] === layOutArray[j].size) {
            newCgPos[i] = {
              size: cgPos[i],
              component: layOutArray[j].component,
            };
          }
        }
      }
      setConfigPosition(newCgPos);
    };

    getAPI();
  }, [layOutArray]);

  return (
    <>
      <Row>
        <Col sm={12}>
          <NavbarComponent />
        </Col>
      </Row>
      <Row>
        {configPosition.map((data, index) => {
          return (
            <Col key={index} sm={data.size}>
              {data.component}
            </Col>
          );
        })}
      </Row>
    </>
  );
}
