import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

import init from "./socket";

// const socket = io.connect();

//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

// socket.on("welcome", function(data) {
//     console.log(data);
//     socket.emit("thanks", {
//         message: "Thank you. It is great to be here."
//     });
// });

ReactDOM.render(
    elem, //JSX element
    document.querySelector("main")
);
