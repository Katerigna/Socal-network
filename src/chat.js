import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);

    const keyCheck = e => {
        console.log("A key was pressed", e.key);
        if (e.key == "Enter") {
            e.preventDefault();
            console.log(e.target.value);
            socket.emit("My chat message", e.target.value);
            e.target.value = "";
        }
    };

    const elemRef = useRef();

    useEffect(() => {
        console.log("chat mounted");
        console.log("element", elemRef.current);
        console.log("scroll from top", elemRef.current.scrollTop);
        console.log("scroll height", elemRef.current.scrollHeight);
        console.log("client height", elemRef.current.clientHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);
    //change empty array to chatMessages from Redux

    return (
        <div className="chat-container">
            <h1>Chat Room</h1>
            <div className="chat-messages" ref={elemRef}>
                <p>Chat messages will go here</p>
            </div>
            <textarea
                placeholder="Add your message here"
                onKeyDown={keyCheck}
                className="chat-input"
            />
        </div>
    );
}
