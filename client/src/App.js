import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";

import Login from "./pages/Login";
import { useCookies } from "react-cookie";
import PageApp from "./pages/PageApp";

// import * as signalR from "@microsoft/signalr";

function App() {
  const [token] = useCookies("access-token");
  const [checkToken, setCheckToken] = useState(false);
  useEffect(() => {
    const getToken = () => {
      if (token["access-token"]) {
        setCheckToken(true);
      }
    };
    getToken();
  }, [token]);

  return <Container>{!checkToken ? <Login /> : <PageApp />}</Container>;
}

export default App;
