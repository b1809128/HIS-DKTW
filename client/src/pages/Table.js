import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Row from "react-bootstrap/esm/Row";
import MedicalTable from "../components/Table/MedicalTable";
import ReceiptTable from "../components/Table/ReceiptTable";
import SupplierTable from "../components/Table/SupplierTable";
import UnitTable from "../components/Table/UnitTable";
import * as signalR from "@microsoft/signalr";

function Table() {
  const [medicalData, setMedicalData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
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
        // console.log(name, message);
        if (!message) {
          await getAPI();
        } else {
          if (message.code === "addAuth") {
            const hubAuthData = await axios.get(
              "http://localhost:5000/api/auth"
            );
            setUserData(hubAuthData.data);
          } else if (message.code === "addMedical") {
            const hubMedicalData = await axios.get(
              "http://localhost:5000/api/medical"
            );
            setMedicalData(hubMedicalData.data);
          } else if (message.code === "addSupplier") {
            const hubSupplierData = await axios.get(
              "http://localhost:5000/api/supplier"
            );
            setSupplierData(hubSupplierData.data);
          } else if (message.code === "addUnit") {
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
  return (
    <>
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
    </>
  );
}

export default Table;
