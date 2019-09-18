import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { socket, init } from "./socket";
import { useSelector, useDispatch } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector(state => state.chatMessages);
    console.log("chatMessages", chatMessages);

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
        console.log("chatMessages in useEffect", chatMessages);
        console.log("chat mounted");
        console.log("element", elemRef.current);
        console.log("scroll from top", elemRef.current.scrollTop);
        console.log("scroll height", elemRef.current.scrollHeight);
        console.log("client height", elemRef.current.clientHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    return (
        <div className="chat-container">
            <h1>Chat Room</h1>
            <div className="chat-messages" ref={elemRef}>
                <ul>
                    {chatMessages &&
                        chatMessages.reverse().map(chatMessage => (
                            <li key={chatMessage.id}>
                                <Link to={"/user/" + chatMessage.sender_id}>
                                    <img height="50" src={chatMessage.url} />
                                </Link>
                                <p>{chatMessage.message}</p>
                            </li>
                        ))}
                </ul>
            </div>
            <textarea
                placeholder="Add your message here"
                onKeyDown={keyCheck}
                className="chat-input"
            />
        </div>
    );
}
