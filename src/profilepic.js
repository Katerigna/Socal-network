import React from "react";

export default function ProfilePic({ imageurl, first, last, showModal }) {
    console.log("imageurl: ", imageurl);
    imageurl = imageurl || "/img/default.png";

    return (
        <div>
            My name is {first} {last}
            <img src={imageurl} onClick={showModal} />
        </div>
    );
}
