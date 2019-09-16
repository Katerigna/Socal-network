import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsWannabes, unfriend, acceptFriends } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const friendsWannabes = useSelector(state => state.friendsWannabes);
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

            {friendsWannabes &&
                friendsWannabes.map((friendWannabe, index) => {
                    return (
                        <div key={index}>
                            <img height="100" src={friendWannabe.url} />
                            <p>{friendWannabe.first}</p>
                        </div>
                    );
                })}

            <h2>Friends</h2>

            {friends &&
                friends.map((friend, index) => {
                    return (
                        <div key={index}>
                            <img height="100" src={friend.url} />
                            <p>
                                {friend.first} {friend.last}
                            </p>
                            <button
                                onClick={e => {
                                    dispatch(unfriend(friend.id));
                                }}
                            >
                                Let's change it!
                            </button>
                        </div>
                    );
                })}

            <h2>Wannabes</h2>

            {wannabes &&
                wannabes.map((wannabe, index) => {
                    return <p key={index}>{wannabe.first}</p>;
                })}
        </div>
    );
}
