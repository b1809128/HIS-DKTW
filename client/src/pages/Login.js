import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { apiLoginGetToken, rd_key } from "../components/token/authorize";
function Login() {
  //TODO: React Cookie
  const [, setToken] = useCookies(["access-token"]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmitLogin = async () => {
    const res = await axios.get(apiLoginGetToken, {
      headers: {
        user: userName,
        password: password,
        rd_key: rd_key,
      },
    });
    setToken("access-token", res.data.value.token, { path: "/", maxAge: 60 });
    if (res.data.value.token) {
      window.location.replace("/");
    }
  };

  return (
    <div class="container">
      <div class="row" style={{ marginTop: "100px" }}>
        <div class="col-sm-9 col-md-7 col-lg-4 mx-auto">
          <div class="card border-0 shadow rounded-4 my-6">
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label for="floatingPassword">Password</label>
                </div>

                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="rememberPasswordCheck"
                  />
                  <label class="form-check-label" for="rememberPasswordCheck">
                    Remember password
                  </label>
                </div>
                <div class="d-grid">
                  <button
                    class="btn btn-primary btn-login text-uppercase fw-bold"
                    onClick={handleSubmitLogin}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
