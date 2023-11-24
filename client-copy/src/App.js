import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import UserCrud from "./UserCrud";
import UserForm from "./UserForm";
import Home from "./Home";
import FormCrud from "./FormCrud";
const App = () => {

  const [loginState, setLoginState] = useState(false);
  const [selected, setSelected] = useState({});
  const [tokenKey, setTokenKey] = useState("");
  const [id, setId] = useState();
  


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              setTokenKey={setTokenKey}
              setLoginState={setLoginState}
              selected={selected}
              setSelected={setSelected}
              setId={setId}
            />
          }
        />
        {loginState ? (
          <Route
            path="/user"
            element={
              <UserCrud
                id={id}
                selected={selected}
                token={tokenKey}
                setSelected={setSelected}
              />
            }
          />

        ) : (
          <Route path="/user" element={<Navigate to="/" />} />

        )}
                <Route path="/formcrud" element={<FormCrud />} />
                <Route path="/form" element={<UserForm selected={selected} />}  />

        <Route path="/Signup" token={tokenKey} element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
