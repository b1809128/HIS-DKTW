import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import axios from "axios";
import ReceiptTable from "../Table/ReceiptTable";

function ReceiptDetails({ id }) {
  const [propId, setPropId] = useState([]);
  useEffect(() => {
    const getAPI = async () => {
      try {
        const singleData = await axios.get(
          `http://localhost:5000/api/receipt/${id}`
        );
        setPropId(singleData.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAPI();
  }, [id]);

  return (
    <>
      <Row>
        <h4>VASD Software Company</h4>
        <p>
          <span style={{ fontWeight: 600 }}>Địa chỉ:</span>54/11a Trần Việt
          Châu, Phường An Hòa, Quận Ninh Kiều, Thành phố Cần Thơ
        </p>
        <p>
          <span style={{ fontWeight: 600 }}>Số điện thoại:</span> 8438793509
        </p>
        <p>
          <span style={{ fontWeight: 600 }}>Email:</span> vasd2014@gmail.com
        </p>
      </Row>
      <hr />
      <Row>
        <h4>Thông tin khách hàng</h4>
        {propId.map((data) => {
          return (
            <>
              <p>
                <span style={{ fontWeight: 600 }}>Mã khách hàng:</span>{" "}
                {data.customer.code}
              </p>
              <p>
                <span style={{ fontWeight: 600 }}>Tên khách hàng:</span>{" "}
                {data.customer.name}
              </p>
              <p>
                <span style={{ fontWeight: 600 }}>Số điện thoại:</span>{" "}
                {data.customer.phone}
              </p>
              <p>
                <span style={{ fontWeight: 600 }}>Email:</span>{" "}
                {data.customer.email}
              </p>
              <p>
                <span style={{ fontWeight: 600 }}>Địa chỉ:</span>{" "}
                {data.customer.address}
              </p>
            </>
          );
        })}
      </Row>
      <hr />
      <Row>
        <ReceiptTable idProps={id} />
      </Row>
    </>
  );
}

export default ReceiptDetails;
