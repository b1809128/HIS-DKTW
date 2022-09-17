import React from "react";
import Row from "react-bootstrap/Row";
import "./ListBar.css";
function ListBar() {
  let listBarArray = ["Medical", "Supplier"];
  let pageArray = [
    "Unit",
    "Receipt",
    "Table",
    "Drag",
    "ChartAPI",
    "Configure",
    "About",
  ];

  //TODO: Set active class
  const urlStringFlash = window.location.pathname.split("/");

  // console.log(urlStringFlash);

  return (
    <div className="list-bar-wrapper">
      <Row>
        <img src="/images/logo/logo.jpg" alt="Logo VASD" />
      </Row>
      <Row>
        <div
          className={
            !urlStringFlash[1] ? "list-bar list-bar--active" : "list-bar"
          }
        >
          <a className="list-bar-link" href="/">
            Home
          </a>
        </div>
      </Row>

      {listBarArray.map((data, index) => {
        return (
          <Row>
            <div
              key={data}
              className={
                // getOnPageChange === data
                //   ? "list-bar list-bar--active"
                "list-bar"
              }
            >
              <a className={"list-bar-link"} href={"/#" + data}>
                {data}
              </a>
            </div>
          </Row>
        );
      })}
      {pageArray.map((data, index) => {
        return (
          <Row>
            <div
              key={data}
              className={
                urlStringFlash[1] === data
                  ? "list-bar list-bar--active"
                  : "list-bar"
              }
            >
              <a className={"list-bar-link"} href={"/" + data}>
                {data}
              </a>
            </div>
          </Row>
        );
      })}
    </div>
  );
}

export default ListBar;
