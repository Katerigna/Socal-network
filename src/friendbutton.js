import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ id }) {
    const [friendStatus, setFriendStatus] = useState("Add Friend");
    console.log("friend status", friendStatus);

    useEffect(() => {
        axios
            .get("/friends/" + id)
            .then(response => {
                console.log("friends?", response.data);
                if (response.data == "Total strangers") {
                    setFriendStatus("Add Friend");
                } else if (
                    response.data == "Incoming friend request detected"
                ) {
                    setFriendStatus("Accept Request");
                } else if (
                    response.data == "Outgoing friend request detected"
                ) {
                    setFriendStatus("Cancel Request");
                } else if (response.data == "Friend detected") {
                    setFriendStatus("Unfriend");
                }
            })
            .catch(err => console.log("error on get friends status", err));
    }, []);

    function handleFriendStatus() {
        if (friendStatus == "Add Friend") {
            addFriendRequest();
        }
        if (friendStatus == "Cancel Request") {
            deleteFriendRequest();
        }
        if (friendStatus == "Unfriend") {
            deleteFriendRequest();
        }
        if (friendStatus == "Accept Request") {
            addFriend();
        }
    }

    function addFriendRequest() {
        axios
            .post("/friends/addrequest/" + id)
            .then(response => {
                setFriendStatus("Cancel Request");
            })
            .then(err =>
                console.log("error on adding friend request to db", err)
            );
    }

    function deleteFriendRequest() {
        axios
            .post("/friends/delete/friend/" + id)
            .then(response => {
                setFriendStatus("Add Friend");
            })
            .catch(err => console.log("error on deleting friend from db", err));
    }

    function addFriend() {
        axios
            .post("/friends/add/" + id)
            .then(response => {
                setFriendStatus("Unfriend");
            })
            .catch(err => console.log("error on adding friend to db", err));
    }

    return (
        <input
            type="submit"
            value={friendStatus}
            onClick={handleFriendStatus}
        ></input>
    );
}
