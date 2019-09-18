import axios from "./axios";
import { socket } from "./socket";

export async function getFriendsWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    console.log("data", data);

    return {
        type: "GET_FRIENDS_WANNABES",
        friendsWannabes: data
    };
}

export async function acceptFriends(id) {
    await axios.post(`/friends/add/${id}`);
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

export async function getChatMessages(data) {
    await socket.on("Last 10 messages", data);

    return {
        type: "GET_MESSAGES",
        chatMessages: data
    };
}

export async function addMessage(msg) {
    await socket.on("My chat message", msg);
    console.log("My chat message", msg);
    return {
        type: "ADD_MESSAGE",
        msg
    };
}
