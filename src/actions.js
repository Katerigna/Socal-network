import axios from "./axios";

export function example() {
    //this object in return is the action
    return {
        type: "ACTION_TO CHANGE" //every action needs corresponding if-statement in the reducer
    };
}

export async function getFriendsWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    console.log("data", data);

    return {
        type: "GET_FRIENDS_WANNABES",
        friendsWannabes: data
    };
}

export async function acceptFriends(id) {
    await axios.post(`/friends/add/friend/${id}`);
    return {
        type: "ACCEPT_FRIENDS",
        id
    };
}

export async function unfriend(id) {
    console.log("made to actions", id);
    await axios.post(`/friends/delete/friend/${id}`);
    return {
        type: "UNFRIEND",
        id
    };
}
