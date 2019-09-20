import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsWannabes, unfriend, acceptFriends } from "./actions";
import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector(
        state =>
            state.friendsWannabes &&
            state.friendsWannabes.filter(
                friendWannabe => friendWannabe.accepted == true
            )
    );

    const wannabes = useSelector(
        state =>
            state.friendsWannabes &&
            state.friendsWannabes.filter(
                friendWannabe => friendWannabe.accepted == false
            )
    );

    useEffect(() => {
        dispatch(getFriendsWannabes());
    }, []);

    return (
        <div>
            <h1>Friends and Wannabes</h1>

            <h2>Friends</h2>

            <div className="friends-container">
                {friends &&
                    friends.map((friend, index) => {
                        return (
                            <div key={index}>
                                <Link
                                    to={"/user/" + friend.id}
                                    className="user-link"
                                >
                                    <img src={friend.url} className="userpic" />
                                    <p>
                                        {friend.first} {friend.last}
                                    </p>
                                </Link>
                                <button
                                    onClick={e => {
                                        dispatch(unfriend(friend.id));
                                    }}
                                >
                                    Unfriend
                                </button>
                            </div>
                        );
                    })}
            </div>

            <h2>Wannabes</h2>

            <div className="wannabes-container">
                {wannabes &&
                    wannabes.map((wannabe, index) => {
                        return (
                            <div key={index}>
                                <img src={wannabe.url} className="userpic" />
                                <p>
                                    {wannabe.first} {wannabe.last}
                                </p>
                                <button
                                    onClick={e => {
                                        dispatch(acceptFriends(wannabe.id));
                                    }}
                                >
                                    Accept request
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
