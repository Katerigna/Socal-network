import * as io from "socket.io-client";
import { getChatMessages, addMessage } from "./actions";

export let socket;

export default function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("Last 10 messages", msgs => {
            // console.log(
            //     `Got message from front end About to start Redux stuff by dispatching an action. My message: ${msgs}`
            // );
            store.dispatch(getChatMessages(msgs));
        });

        socket.on("My chat message", msg => {
            store.dispatch(addMessage(msg));
        });
    }
    return store;
}
