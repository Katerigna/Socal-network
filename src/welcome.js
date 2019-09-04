import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route, Link } from "react-router-dom";

export default function welcome() {
    return (
        <HashRouter>
            <div>
                <img src="/public/summernight.png" />
                <h1>Welcome!</h1>

                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>

                <Link to="/login">log in</Link>
            </div>
        </HashRouter>
    );
}
