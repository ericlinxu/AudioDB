import React, { useState } from "react";
import "./ChangePassword.css";
import { validUser, updatePassword } from "../utils/apiWrapper";

import {
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [userID, setUserID] = useState("");

  const changePassword = async () => {
    const resp = await validUser(userID, password);
    if (!resp.error) {
      if (resp.data[0]["valid"] === 1) {
        setValid(true);
        const resp1 = await updatePassword(userID, newPassword);
        if (!resp1.error) {
            console.log("Password Changed!");
        }
      }
      console.log(resp.data[0]["valid"]);
    }
  }
  return (
  <>
    <div className="CreateAccount">
      <h1 style={{color: "red", marginTop: "24vh"}}>Create Account</h1>
      {valid ?
        <div>
          <p>Password Changed Successfully</p>
        </div>
        :
        <div className="Error">
          <p>Incorrect userID or password. Password Change Fail</p>
        </div>
      }
      <Form>
        <FormGroup className="UpdateInput">
          <Input
            type="text"
            value={password}
            id="password-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="text"
            value={userID}
            id="userID-input"
            placeholder="userID"
            onChange={(e) => setUserID(e.target.value)}
            required
          />
          <Input
            type="text"
            value={newPassword}
            id="newPassword-input"
            placeholder="Enter New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button
          onClick={changePassword}
          className="changePassword"
          style={{marginBottom: 8}}
          >
          Change Password
        </Button>
      </Form>
    </div>
  </>
  );
}