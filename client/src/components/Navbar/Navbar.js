import React from "react";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
// import { FiLogOut } from "react-icons/fi";
import { useCookies } from "react-cookie";

import Row from "react-bootstrap/esm/Row";
const spanData = [
  { color: "#ea3433", text: "V" },
  { color: "#ffc929", text: "A" },
  { color: "#00b1f1", text: "S" },
  { color: "#00a85a", text: "D" },
];
function NavbarComponent() {
  const [removeCookie] = useCookies(["access-token"]);

  const logOut = () => {
    removeCookie(["access-token"]);
  };
  return (
    <div className="navbar-wrapper">
      <Navbar>
        <Container>
          <Navbar.Brand href="/">
            {spanData.map((data, index) => {
              return (
                <span
                  key={index}
                  style={{
                    color: data.color,
                    fontSize: "2.4rem",
                    fontWeight: "700",
                  }}
                >
                  {data.text}
                </span>
              );
            })}{" "}
            CO.,LTD
          </Navbar.Brand>
          <Navbar.Toggle />

          <Row>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <span>Signed in as:</span> <a href="/sign-in">Admin</a>
              </Navbar.Text>
              <span onClick={logOut} className="navbar-logout">
                Log Out
              </span>
            </Navbar.Collapse>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
