import * as io from "socket.io-client";
import { chatMessages, chatMessage } from "./actions";

export let socket;

export default function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("Message from server", msg => {
            console.log(
                `Got message from front end About to start Redux stuff by dispatching an action. My message: ${msg}`
            );
        });
    }
}
