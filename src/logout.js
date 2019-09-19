import React, { useState } from "react";
import axios from "./axios";

export default function Logout() {
    const [loginStatus, setLoginStatus] = useState(true);

    function handleLogout() {
        if (loginStatus) {
            axios.post("/logout").then(response => {
                console.log("logout response", response);
                setLoginStatus(false);
                location.replace("/");
            });
        }
    }

    return (
        <button onClick={handleLogout} className="logout-button">
            Log out
        </button>
    );
}
