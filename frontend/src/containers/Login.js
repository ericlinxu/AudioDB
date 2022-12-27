import React, { useState } from "react";
import "./Login.css";
import { getUser } from "../utils/apiWrapper";
import Typical from 'react-typical';

import {
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

export default function Login() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [results, setResults] = useState(false);

  const login = async () => {
    const resp = await getUser(userID, password);
    if (!resp.error) {
      console.log("Attempt Login");
      console.log(resp.data[0].isValid);
      if (resp.data[0].isValid === 1) {
        console.log("it worked!");
        window.location.href= `/home/${userID}`;
      }
      else {
        console.log("Incorrect password or user does not exist");
        setResults(true);
      }
    }
  }

  // const createAccount = async () => {
  //   window.location.href= `/createaccount`;
  // }

  const changePassword = async () => {
    window.location.href= `/changepassword`;
  }

  return (
  <>
    <div className="Login">
        <h1 style={{color: "red", marginTop: "24vh"}}>♩♪ AudioDB ♫♬</h1>
        {<p> A music database for {' '}

          <Typical
            loop = {Infinity}
            wrapper = "b"
            steps = {[
              ' finding your favorite songs',
              3000,
              ' discovering new music',
              3000,
              ' curating to your music taste',
              3000
            ]}
          />
          
        </p>}
        {results ?
          <div className="Error">
            Incorrect Login
          </div>
          :
          <div>
            
          </div>
        }
        <Form>
            <FormGroup className="login-input">
                <Input
                    type="text"
                    value={userID}
                    id="username-input"
                    class = "form__input"
                    // placeholder="Username"
                    placeholder=" "
                    onChange={(e) => setUserID(e.target.value)}
                    required
                />
                <label for = "userInput" class = "form__input"> Username</label>
                <Input
                    type="text"
                    value={password}
                    id="password-input"
                    // placeholder="Password"
                    placeholder = " "
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label for = "passInput" class = "form__input"> Password</label>
            </FormGroup>
            <Button
                onClick={login}
                className="Login"
                style={{marginBottom: 8}}
                >
                Login
            </Button>
            {/* <Button
                onClick={createAccount}
                className="CreateAccount"
                style={{marginBottom: 8}}
                >
                Create Account
            </Button> */}
            <Button
                onClick={changePassword}
                className="ChangePassword"
                style={{marginBottom: 8}}
                >
                Change Password
            </Button>
        </Form>
    </div>
  </>
  );
}