import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListBar from "./components/ListBar/ListBar";
import NavbarComponent from "./components/Navbar/Navbar";
import DragList from "./components/DND/DragList";
import Table from "./pages/Table";
import Configure from "./pages/Configure";
import Unit from "./pages/Unit";
import Receipt from "./pages/Receipt";
import Login from "./pages/Login";
import { useCookies } from "react-cookie";
import ChartAPI from "./pages/ChartAPI";
import axios from "axios";
import * as signalR from "@microsoft/signalr";

function App() {
  const [token] = useCookies("access-token");

  // const getLayOutLocal = JSON.parse(localStorage.getItem("layOutApp"));

  // const setLayOut = () => {
  //   let newLayOut = [];

  //   if (getLayOutLocal) {
  //     for (let i = 0; i < getLayOutLocal.length; i++) {
  //       for (let j = 0; j < layOutArray.length; j++) {
  //         if (getLayOutLocal[i].size === layOutArray[j].size) {
  //           newLayOut[i] = {
  //             size: getLayOutLocal[i].size,
  //             component: layOutArray[j].component,
  //           };
  //         }
  //       }
  //     }
  //   }
  //   return newLayOut;
  // };

  const [configPosition, setConfigPosition] = useState([]);
  const [userConfigData, setUserConfigData] = useState([]);

  useEffect(() => {
    const getAPI = async () => {
      const getUserData = await axios.get(
        "http://localhost:5000/api/auth/usr1"
      );
      let cgPos = getUserData.data[0].layout.content;
      setUserConfigData(getUserData.data[0]);
      // console.log(getUserData.data[0].layout.tags);
      let newCgPos = [];
      const layOutArray = [
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
      ];
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
    (async () => {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://14.241.182.251:55078/chathub", {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        }) // Ensure same as BE
        .withAutomaticReconnect()
        .build();
      await newConnection.start();

      // Let's also setup our receiving method...
      newConnection.on("ReceiveMessage", async (name, message) => {
        // console.log(data);
        if (!message) {
          await getAPI();
        } else {
          if (message.code === "addAuth") {
            const hubAuthData = await axios.get(
              "http://localhost:5000/api/auth"
            );
            setUserConfigData(hubAuthData.data[0]);
          }
        }
      });
    })();
    getAPI();
  }, []);

  let dragItems = useRef(null);
  let dragOverItems = useRef(null);

  const handleSortNavbar = () => {
    let duplicateLayOutItems = [...configPosition];
    let draggedItemsContent = duplicateLayOutItems.splice(
      dragItems.current,
      1
    )[0];
    duplicateLayOutItems.splice(dragOverItems.current, 0, draggedItemsContent);

    dragItems = null;
    dragOverItems = null;

    setConfigPosition(duplicateLayOutItems);
    updateLayout(duplicateLayOutItems);
    // console.log(duplicateLayOutItems.map((data) => data.size));
  };

  const updateLayout = (arrChange) => {
    axios.patch("http://localhost:5000/api/auth/config/set/dd_2", {
      layout: {
        tags: userConfigData.layout.tags,
        chart: userConfigData.layout.chart,
        content: arrChange.map((data) => data.size),
      },
    });
  };
  return (
    <Container>
      {!token["access-token"] ? (
        <Login />
      ) : (
        <>
          <Row>
            <Col sm={12}>
              <NavbarComponent />
            </Col>
          </Row>
          <Row>
            {configPosition.map((data, index) => {
              return (
                <Col
                  key={index}
                  draggable
                  onDragStart={(e) => (dragItems.current = index)}
                  onDragEnter={(e) => (dragOverItems.current = index)}
                  onDragEnd={handleSortNavbar}
                  onDragOver={(e) => e.preventDefault()}
                  sm={data.size}
                >
                  {data.component}
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </Container>
  );
}

export default App;
