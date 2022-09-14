import React, { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CalendarComponent from "../components/Calendar/Calendar";
import Tags from "../components/Tags/Tags";
import DoughnutChart from "../components/Chart/DoughnutChart";
import LineChart from "../components/Chart/LineChart";
import ColumnChart from "../components/Chart/ColumnChart";
import MedicalTable from "../components/Table/MedicalTable";
import SupplierTable from "../components/Table/SupplierTable";
import Aos from "aos";
import UnitTable from "../components/Table/UnitTable";
import ReceiptTable from "../components/Table/ReceiptTable";

import * as signalR from "@microsoft/signalr";
import axios from "axios";

/**
 * 
 * @UsingSignalRhere     
    (async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl("http://14.241.182.251:55078/chathub", {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        }) // Ensure same as BE
        .withAutomaticReconnect()
        .build();
      await newConnection.start();

      // Let's also setup our receiving method...
      newConnection.on("ReceiveMessage", (name, message) => {
        console.log(name, message);
      });
    })();
 */

function Main() {
  const [medicalData, setMedicalData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [userData, setUserData] = useState([]);

  //TODO: Tags change content
  const [tagItems, setTagItems] = useState([]);

  //TODO: Chart change content
  const [calendarItems, setCalendarItems] = useState([
    <DoughnutChart />,
    <CalendarComponent />,
  ]);

  const [chartItems, setChartItems] = useState([
    <LineChart />,
    <ColumnChart />,
  ]);

  let dragItems = useRef(null);
  let dragOverItems = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({
      duration: 2000,
    });

    //SignalR

    const getAPI = async () => {
      //AXIOS HERE
      const getMedicalData = await axios.get(
        "http://localhost:5000/api/medical"
      );
      const getSupplierData = await axios.get(
        "http://localhost:5000/api/supplier"
      );
      const getUnitData = await axios.get("http://localhost:5000/api/unit");
      const getUserData = await axios.get("http://localhost:5000/api/auth");

      setMedicalData(getMedicalData.data);
      setSupplierData(getSupplierData.data);
      setUnitData(getUnitData.data);
      setUserData(getUserData.data);

      let nameTags = getUserData.data[0].layout.tags;
      let listBarArray = [];

      for (let i = 0; i < nameTags.length; i++) {
        if (nameTags[i] === "Medical") {
          listBarArray[i] = { title: nameTags[i], number: medicalData.length };
        } else if (nameTags[i] === "Supplier") {
          listBarArray[i] = { title: nameTags[i], number: supplierData.length };
        } else if (nameTags[i] === "Unit") {
          listBarArray[i] = { title: nameTags[i], number: unitData.length };
        } else if (nameTags[i] === "User") {
          listBarArray[i] = { title: nameTags[i], number: userData.length };
        }
      }
      setTagItems(listBarArray);
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
            setUserData(hubAuthData.data);
          }
          if (message.code === "addMedical") {
            const hubMedicalData = await axios.get(
              "http://localhost:5000/api/medical"
            );
            setMedicalData(hubMedicalData.data);
          }
          if (message.code === "addSupplier") {
            const hubSupplierData = await axios.get(
              "http://localhost:5000/api/supplier"
            );
            setSupplierData(hubSupplierData.data);
          }
          if (message.code === "addUnit") {
            const hubUnitData = await axios.get(
              "http://localhost:5000/api/unit"
            );
            setUnitData(hubUnitData.data);
          }
        }
      });
    })();

    getAPI();
  }, [
    medicalData.length,
    supplierData.length,
    unitData.length,
    userData.length,
  ]);

  // console.log(userData[0].layout.tags);

  const handleSortTags = () => {
    let duplicateItems = [...tagItems];
    let draggedItemsContent = duplicateItems.splice(dragItems.current, 1)[0];
    duplicateItems.splice(dragOverItems.current, 0, draggedItemsContent);

    dragItems = null;
    dragOverItems = null;
    setTagItems(duplicateItems);
    updateTags(duplicateItems);
  };

  // console.log(userData[0].layout.content);
  const updateTags = (arrChange) => {
    axios.patch("http://localhost:5000/api/auth/config/set/usr1", {
      layout: {
        tags: arrChange.map((data) => data.title),
        chart: userData[0].layout.chart,
        content: userData[0].layout.content,
      },
    });
  };

  const handleSortCalendar = () => {
    let duplicateItems = [...calendarItems];
    let draggedItemsContent = duplicateItems.splice(dragItems.current, 1)[0];
    duplicateItems.splice(dragOverItems.current, 0, draggedItemsContent);

    dragItems = null;
    dragOverItems = null;

    setCalendarItems(duplicateItems);
  };

  const handleSortChart = () => {
    let duplicateItems = [...chartItems];
    let draggedItemsContent = duplicateItems.splice(dragItems.current, 1)[0];
    duplicateItems.splice(dragOverItems.current, 0, draggedItemsContent);

    dragItems = null;
    dragOverItems = null;

    setChartItems(duplicateItems);
  };

  return (
    <Row>
      <Col sm={12}>
        <Row>
          <Col sm={6}>
            <Row>
              {tagItems.map((data, index) => {
                return (
                  <Col
                    key={index}
                    draggable
                    onDragStart={(e) => (dragItems.current = index)}
                    onDragEnter={(e) => (dragOverItems.current = index)}
                    onDragEnd={handleSortTags}
                    onDragOver={(e) => e.preventDefault()}
                    sm={6}
                  >
                    <Tags title={data.title} dataNumber={data.number} />
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col sm={6}>
            <Row>
              {calendarItems.map((data, index) => {
                return (
                  <Col
                    key={index}
                    draggable
                    onDragStart={(e) => (dragItems.current = index)}
                    onDragEnter={(e) => (dragOverItems.current = index)}
                    onDragEnd={handleSortCalendar}
                    onDragOver={(e) => e.preventDefault()}
                    sm={6}
                  >
                    {data}
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        <Row>
          {chartItems.map((data, index) => {
            return (
              <Col
                key={index}
                draggable
                onDragStart={(e) => (dragItems.current = index)}
                onDragEnter={(e) => (dragOverItems.current = index)}
                onDragEnd={handleSortChart}
                onDragOver={(e) => e.preventDefault()}
                sm={6}
              >
                {data}
              </Col>
            );
          })}
        </Row>
        <h4 id="Medical">Manage Medical</h4>
        <Row>
          <MedicalTable medicalData={medicalData} />
        </Row>
        <h4 id="Supplier">Manage Supplier</h4>
        <Row>
          <SupplierTable supplierData={supplierData} />
        </Row>
        <h4 id="Unit">Manage Unit</h4>
        <Row>
          <UnitTable unitData={unitData} />
        </Row>
        <h4 id="Unit">Manage Receipt</h4>
        <Row>
          <ReceiptTable />
        </Row>
      </Col>
    </Row>
  );
}

export default Main;
