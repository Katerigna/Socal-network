import React from "react";
import Registration from "./registration";
import Login from "./login";
import App from "./app";
import { HashRouter, Route, Link } from "react-router-dom";

export default function Welcome() {
    return (
        <HashRouter>
            <div className="welcome-container">
                <img src="logo.png" />

                <div className="form-container">
                    <h1>Welcome!</h1>

                    <Route path="/login" component={Login} />
                    <Route exact path="/" component={Registration} />
                </div>

                <Link to="/login">log in</Link>
            </div>
        </HashRouter>
    );
}
