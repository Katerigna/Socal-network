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
            .post("/friends/add/" + id)
            .then(response => {
                console.log("db response on POST /friends/add", response.data);
                setFriendStatus("Cancel Request");
            })
            .then(err =>
                console.log("error on adding friend request to db", err)
            );
    }

    function deleteFriendRequest() {
        // console.log("I don#t wanna your friendship!");
        axios.post("/friends/delete/" + id).then(response => {
            console.log("response on deleting friend request", response.data);
            setFriendStatus("Add Friend");
        });
    }

    function addFriend() {
        axios
            .post("/friends/add/friend/" + id)
            .then(response => {
                console.log("db response on addfriend", response.data);
                setFriendStatus("Unfriend");
            })
            .catch(err =>
                console.log("error on adding friend request to db", err)
            );
    }

    return (
        <input
            type="submit"
            value={friendStatus}
            onClick={handleFriendStatus}
        ></input>
    );
}
