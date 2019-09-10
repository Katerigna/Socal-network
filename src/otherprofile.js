import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function OtherProfile({ match, history }) {
    const id = match.params.id;

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [imageurl, setImageurl] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        axios
            .get(`/api/user/` + id)
            .then(response => {
                if (response.data == "own id!") {
                    history.push("/app");
                } else {
                    setFirst(response.data.first);
                    setLast(response.data.last);
                    setImageurl(response.data.url);
                    setBio(response.data.bio);
                }
            })
            .catch(err => {
                console.log("error on get other profile", err);
            });
    }, [id]);

    return (
        <div>
            <h1>
                {first} {last}
            </h1>

            <img width="150" height="150" src={imageurl} alt={first && last} />

            <p>{bio}</p>
        </div>
    );
}
