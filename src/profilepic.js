import React from "react";

export default function ProfilePic({ imageurl, first, last, toggleModal }) {
    imageurl = imageurl || "/default.png";

    return (
        <div>
            <img
                width="150"
                height="150"
                src={imageurl}
                onClick={toggleModal}
                alt={first && last}
            />
        </div>
    );
}
