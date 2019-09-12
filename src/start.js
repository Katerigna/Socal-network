import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import { App } from "./app";

let elem;

if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}

//redux middleware
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { reducer } from "./reducer";

const store = createStore(reducer, applyMiddleware(reduxPromise));
//redux middleware

ReactDOM.render(
    elem, //JSX element
    document.querySelector("main")
);
