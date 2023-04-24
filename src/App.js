import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./containers/user_management/user_management";
import Login from "./containers/login/login";
import NoPage from "./containers/nopage/NoPage";
import Layout from "./containers/layout/Layout";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {/*<Route path="/" element={<Layout />}>
          <Route path="/" element={< Login/>} />
         <Route path='/Users' element={< Users/>} />
          <Route path="*" element={<NoPage />} />
  </Route>*/}
        <Route path="/" element={<Login />} />
        <Route path="/Users" element={<Users />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
