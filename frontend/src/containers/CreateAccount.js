import React, { useState } from "react";
import "./CreateAccount.css";
import { getID, getCreateAccount } from "../utils/apiWrapper";

import {
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

export default function CreateAccount() {
  const [password, setPassword] = useState("");
  const [results, setResults] = useState(false);
  const [userID, setUserID] = useState("");

  const createAccount = async () => {
    const resp = await getID();
    if (!resp.error) {
      setUserID(resp.data[0]["uID"]);
      console.log(resp.data[0]["uID"]);
    }
    console.log(userID);
    // const salt = await bcrypt.genSalt(); // Creating a new salt
    // this.password = await bcrypt.hash(this.password, salt); // Hashing salt and password using 100 iterations
    const resp1 = await getCreateAccount(userID, password);
    if (!resp1.error) {
      console.log("Account Created!");
      setResults(true);
    }
  }
  return (
  <>
    <div className="CreateAccount">
      <h1 style={{color: "red", marginTop: "24vh"}}>Create Account</h1>
      <br></br>
      <Form>
        <FormGroup className="CreateInput">
          <Input
            type="text"
            value={password}
            id="password-input"
            // placeholder="Password"
            placeholder = " "
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label for = "pass2Input" class = "form__input"> Enter password</label>
        </FormGroup>
        <br></br>
        <Button
          onClick={createAccount}
          className="createAccount"
          style={{marginBottom: 8}}
          >
          Create Account
        </Button>
      </Form>
      <br></br>
      {results ?
        <div>
          <p>Your ID is {userID}. Please remember this as you need it to Login.</p>
          <p>Go back to the Login page to login.</p>
        </div>
        :
        <div className="Error">
          Create Account Failed
        </div>
      }
    </div>
  </>
  );
}