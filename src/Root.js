import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./App";
import CreateAccount from "./CreateAccount";
import ForgotPassword from "./ForgotPassword";
import CalendarView from "./CalendarView";
import Planned from "./Planned";
import Following from "./Following";
import Account from "./Account";
import CreateEvent from "./CreateEventPage"
import Page from "./Page";

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route component={CreateAccount} path="/createaccount" />
                    <Route component={ForgotPassword} path="/forgotpassword" />
                    <Route component={Page} path="/calendar" />
                    <Route component={Planned} path="/planned" />
                    <Route component={Following} path="/following" />
                    <Route component={Account} path="/account" />
                    <Route component={CreateEvent} path="/createevent" />
                    <Route component={App} path="/" />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default Root;