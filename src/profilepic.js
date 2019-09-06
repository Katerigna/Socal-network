import React from "react";

export default function ProfilePic({ imageurl, first, last, showModal }) {
    console.log("imageurl: ", imageurl);
    imageurl = imageurl || "/default.png";

    return (
        <div>
            My name is {first} {last}
            <img width="150" height="150" src={imageurl} onClick={showModal} />
        </div>
    );
}
