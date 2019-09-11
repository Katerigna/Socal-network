import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [recentUsers, setRecentUsers] = useState([]);

    const [foundUsers, setFoundUsers] = useState("");
    console.log("user in input field: ", foundUsers);

    const [heading, setHeading] = useState(true);

    useEffect(() => {
        axios
            .get("/users.json")
            .then(response => {
                setRecentUsers(response.data);
            })
            .catch(err => console.log("error on getting last users", err));
    }, []);

    useEffect(() => {
        if (foundUsers) {
            setHeading(false);
            axios
                .get("/search/" + foundUsers)
                .then(response => {
                    console.log("search result ", response.data);
                    setRecentUsers(response.data);
                })
                .catch(err => console.log("error on search", err));
        }
    }, [foundUsers]);

    return (
        <div>
            {heading && <h2>Look who has joined us recently!</h2>}

            <ul>
                {recentUsers.map(recentUser => (
                    <li key={recentUser.id}>
                        <p>
                            <strong>
                                {recentUser.first} {recentUser.last}
                            </strong>
                        </p>
                        <img src={recentUser.url} height="200" alt="first" />
                        <p>{recentUser.bio}</p>
                    </li>
                ))}
            </ul>

            <h3>Find people by name</h3>

            <input onChange={e => setFoundUsers(e.target.value)} />
        </div>
    );
}
