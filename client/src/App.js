import React, { useState, useRef } from "react";
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
function App() {
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
            <Route path="/Configure" element={<Configure />} />
          </Routes>
          <ScrollTop />
        </Router>
      ),
    },
  ];

  const getLayOutLocal = JSON.parse(localStorage.getItem("layOutApp"));
  // console.log(getLayOutLocal);
  const setLayOut = () => {
    let newLayOut = [];

    if (getLayOutLocal) {
      for (let i = 0; i < getLayOutLocal.length; i++) {
        for (let j = 0; j < layOutArray.length; j++) {
          if (getLayOutLocal[i].size === layOutArray[j].size) {
            newLayOut[i] = {
              size: getLayOutLocal[i].size,
              component: layOutArray[j].component,
            };
          }
        }
      }
    }
    return newLayOut;
  };
  // console.log(setLayOut());

  const [listBarComponent, setListBarComponent] = useState(
    getLayOutLocal ? setLayOut() : layOutArray
  );
  // const [listBarComponent, setListBarComponent] = useState(layOutArray);

  let dragItems = useRef(null);
  let dragOverItems = useRef(null);

  const handleSortNavbar = () => {
    let duplicateLayOutItems = [...listBarComponent];
    let draggedItemsContent = duplicateLayOutItems.splice(
      dragItems.current,
      1
    )[0];
    duplicateLayOutItems.splice(dragOverItems.current, 0, draggedItemsContent);

    dragItems = null;
    dragOverItems = null;

    setLocalStorageLayOut(
      duplicateLayOutItems.map((data) => {
        return {
          size: data.size,
        };
      })
    );

    // setLocalStorageLayOut(duplicateLayOutItems);
    setListBarComponent(duplicateLayOutItems);
  };

  const setLocalStorageLayOut = (data) => {
    localStorage.setItem("layOutApp", JSON.stringify(data));
  };

  return (
    <Container>
      <Row>
        <Col sm={12}>
          <NavbarComponent />
        </Col>
      </Row>
      <Row>
        {listBarComponent.map((data, index) => {
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
    </Container>
  );
}

export default App;
