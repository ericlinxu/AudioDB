import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Discover from "./containers/Discover";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Navigation from "./containers/Navigation";
import Recommend from "./containers/Recommend";
import CreateAccount from "./containers/CreateAccount";
import ChangePassword from "./containers/ChangePassword";
import DailySongs from "./containers/DailySongs";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/Login"/>
                </Route>
                <Route exact path="/Home">
                    <Navigation />
                    <Home />
                </Route>
                <Route path="/Home/:userID">
                    <Navigation />
                    <Home />
                </Route>
                <Route exact path="/DailySongs">
                    <Navigation />
                    <DailySongs />
                </Route>
                <Route exact path="/Discover">
                    <Navigation />
                    <Discover />
                </Route>
                <Route exact path="/Recommend">
                    <Navigation />
                    <Recommend />
                </Route>
                <Route exact path="/Login">
                    <Navigation />
                    <Login />
                </Route>
                <Route exact path="/CreateAccount">
                    <Navigation />
                    <CreateAccount />
                </Route>
                <Route exact path="/ChangePassword">
                    <Navigation />
                    <ChangePassword />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
