import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import classes from "./login.module.css";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

const Login = () => {
  const [errorMessages, setErrorMessages] = useState({ name: "", message: "" });
  const [successMessage, setSuccessMessages] = useState({
    newentry: false,
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNewRegistre, setIsNewRegistered] = useState(false);
  const [unameCrendtials, setunameCrendtials] = useState({
    uname: "",
    pass: "",
    email: "",
    retypepass: "",
  });

  // Dummy User Login info
  const database = [
    {
      username: "user1",
      password: "Pass@1",
      email: "user1@dummy.com",
    },
    {
      username: "user2",
      password: "Pass@2",
      email: "user2@dummy.com",
    },
  ];
  const navigate = useNavigate();

  /*
    ^	The password string will start this way
      (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
      (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
      (?=.*[0-9])	The string must contain at least 1 numeric character
      (?=.[!@#$%^&])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
      (?=.{8,})	The string must be six characters or longer
    */
  const passValidateRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );

  // Buttin Text based on new user vs existing user
  const labelText = {
    signin: "SignIn",
    newuser: "New User",
    exiztinguser: "Existing User",
    submit: "Submit",
  };
  //const successMessage = {newentry:false,message:""};

  const errors = {
    uname: "invalid username",
    email: "invalid email ID",
    pass: "invalid password",
    invalidPass:
      "Password must contain at least 1 lowercase alphabetical character,\
       1 uppercase alphabetical character, \
       least 1 numeric character and 1 special character",
    mismatch: "Password does not match",
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <Alert severity="error">{errorMessages.message}</Alert>
      //<div className="passerror">{errorMessages.message}</div>
    );
  const renderSuccessMessage = (name) =>
    name === setSuccessMessages.message && (
      <Alert severity="success">{successMessage}</Alert>
      //<div className="passerror">{errorMessages.message}</div>
    );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);
    setunameCrendtials({
      ...unameCrendtials,
      [name]: e.target.value,
    });
  };

  const handleSubmit = (str) => (event) => {
    // Prevent page reload
    event.preventDefault();
    setIsNewRegistered(str === "register");

    let { uname, pass, email, retypepass } = unameCrendtials;

    // Find user login info
    const userData = database.find((user) => user.username === uname);
    if (uname.length === 0) {
      setErrorMessages({ name: "uname", message: errors.uname });
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessages({ name: "email", message: errors.email });
      return;
    } else if (!passValidateRegex.test(pass)) {
      setErrorMessages({ name: "pass", message: errors.invalidPass });
      return;
    } else if (isNewRegistre && !passValidateRegex.test(retypepass)) {
      setErrorMessages({ name: "pass", message: errors.pass });
      return;
    } else if (isNewRegistre && retypepass !== pass) {
      setErrorMessages({ name: "pass", message: errors.mismatch });
      return;
    } else {
      //Push to server for creating new user
      setSuccessMessages({ newentry: true, message: "Successfully Registred" });
      setErrorMessages({});
    }
    // Compare existing user info
    if (userData && !isNewRegistre) {
      if (userData.password !== pass) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else if (userData.email !== email) {
        // Invalid password
        setErrorMessages({ name: "email", message: errors.email });
      } else {
        setIsSubmitted(true);
        navigate("Users");
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  //code for login form
  const renderForm = (
    <div>
      <Typography variant="h5" align="center">
        User Management
      </Typography>
      <div>
        <FormControl>
          <div className={classes.formEle}>
            <TextField
              variant="outlined"
              type="input"
              placeholder="Username"
              required
              name="uname"
              value={unameCrendtials.name}
              onChange={handleInputChange}
            ></TextField>
          </div>
          <div className={classes.formEle}>
            <TextField
              variant="outlined"
              type="email"
              placeholder="Email"
              required
              name="email"
              value={unameCrendtials.email}
              onChange={handleInputChange}
            ></TextField>
          </div>
          <div className={classes.formEle}>
            <TextField
              variant="outlined"
              type="password"
              placeholder="Password"
              required
              name="pass"
              value={unameCrendtials.pass}
              onChange={handleInputChange}
            ></TextField>
          </div>
          <div
            className={classes.formEle}
            style={{ display: isNewRegistre ? "block" : "none" }}
          >
            <TextField
              variant="outlined"
              type="password"
              placeholder="Retype Password"
              required
              name="retypepass"
              value={unameCrendtials.retypepass}
              onChange={handleInputChange}
            ></TextField>
          </div>
          <div className={classes.formEle}>
            {renderErrorMessage("uname")}
            {renderErrorMessage("pass")}
            {renderErrorMessage("email")}
            {renderSuccessMessage("newentry")}
          </div>
          <div className={classes.formEle}>
            <Button
              type="submit"
              variant={!isNewRegistre ? "contained" : "outlined"}
              onClick={handleSubmit("")}
            >
              {isNewRegistre ? labelText.exiztinguser : labelText.signin}
            </Button>
            <Button
              type="submit"
              variant={isNewRegistre ? "contained" : "outlined"}
              onClick={handleSubmit("register")}
            >
              {!isNewRegistre ? labelText.newuser : labelText.submit}
            </Button>
          </div>
        </FormControl>
      </div>
    </div>
  );

  return (
    <div className="App">
      {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
    </div>
  );
};

export default Login;
