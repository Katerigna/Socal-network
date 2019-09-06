import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile({ first, last, bio, image, id, setBio }) {
    return (
        <div>
            <h1>
                {first} {last}
            </h1>
            <ProfilePic first={first} url={image} last={last} size="xl" />
            <BioEditor bio={bio} setBio={setBio} />
        </div>
    );
}
