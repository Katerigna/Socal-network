import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { socket, init } from "./socket";
import { useSelector, useDispatch } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector(state => state.chatMessages);

    const keyCheck = e => {
        if (e.key == "Enter") {
            e.preventDefault();

            socket.emit("My chat message", e.target.value);
            e.target.value = "";
        }
    };

    const elemRef = useRef();

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    return (
        <div className="chat-container">
            <h1>Chat Room</h1>
            <div className="chat-messages-list" ref={elemRef}>
                <ul>
                    {chatMessages &&
                        chatMessages.map(chatMessage => (
                            <li
                                key={chatMessage.id}
                                className="chat-message-item"
                            >
                                <Link to={"/user/" + chatMessage.sender_id}>
                                    <img height="50" src={chatMessage.url} />
                                </Link>

                                <p className="chat-message-sender">
                                    {chatMessage.first}
                                </p>
                                <p className="chat-message-sender">
                                    {chatMessage.last} says:
                                </p>

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
