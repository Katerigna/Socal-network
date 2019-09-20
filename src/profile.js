import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import DeleteProfile from "./deleteprofile";

export default function Profile({
    first,
    last,
    bio,
    imageurl,
    toggleModal,
    setBio
}) {
    return (
        <div className="profile-wrapper">
            <div className="profile-container">
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

                <DeleteProfile />
            </div>
        </div>
    );
}
