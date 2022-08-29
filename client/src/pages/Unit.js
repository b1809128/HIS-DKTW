import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import UnitTable from "../components/Table/UnitTable";
import axios from "axios";
function Unit() {
  const [unitDataPage, setUnitDataPage] = useState([]);
  useEffect(() => {
    (async () => {
      const unitAPI = await axios.get("http://localhost:5000/api/unit");
      setUnitDataPage(unitAPI.data);
    })();
  }, []);
  return (
    <>
      <h4 id="Unit">Manage Unit</h4>
      <Row>
        <UnitTable unitData={unitDataPage} />
      </Row>
    </>
  );
}

export default Unit;
