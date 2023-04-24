import React, { useState, useEffect } from "react";
import axios from "axios";
import cssCls from "./user_management.module.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Users = () => {
  const url = "https://mocki.io/v1/f60f8c81-06ae-421d-a8aa-eca1548e18d8";

  const [data, setData] = useState([]);
  const fetchInfo = () => {
    return axios.get(url).then((res) => {
      console.log("result", res);
      setData(res.data.users);
    });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className={cssCls.userTable}>
      <Button cl component={Link} to={"/"}>
        Log Out
      </Button>
      <table>
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Approval</th>
          </tr>
          {data.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.firstName}</td>
                <td>{val.lastName}</td>
                <td>{val.email}</td>
                <td>{val.approval ? "True" : "False"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
