import React from "react";
import axios from "./axios";

export default function DeleteProfile() {
    function handleDelete() {
        alert(
            "Are you sure you want to delete your profile? All your data, images and messages will be deleted forever!"
        );
        axios.post("/delete").then(response => {
            console.log("deleting profile...", response);
            location.replace("/");
        });
    }

    return (
        <button onClick={handleDelete} className="delete-button">
            Delete profile
        </button>
    );
}
