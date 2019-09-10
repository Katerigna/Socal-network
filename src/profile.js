import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile({
    first,
    last,
    bio,
    imageurl,
    toggleModal,
    setBio
}) {
    return (
        <div>
            <h1>
                {first} {last}
            </h1>

            <ProfilePic
                first="first"
                last="last"
                imageurl={imageurl}
                toggleModal={toggleModal}
                alt={first && last}
            />

            <BioEditor bio={bio} setBio={setBio} />
        </div>
    );
}
