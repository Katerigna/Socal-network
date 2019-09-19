export default function reducer(state = {}, action) {
    if (action.type === "ACTION_TO CHANGE") {
        //then change redux thing
    }
    if (action.type === "GET_FRIENDS_WANNABES") {
        // console.log("get friends in reducer", action);
        state = {
            ...state,
            friendsWannabes: action.friendsWannabes
        };
    }
    if (action.type === "ACCEPT_FRIENDS") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.map(friendWannabe => {
                if (friendWannabe.id != action.id) {
                    return friendWannabe;
                } else {
                    return {
                        ...friendWannabe,
                        accepted: true
                    };
                }
            })
        };
    }
    if (action.type === "UNFRIEND") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.filter(friendWannabe => {
                if (friendWannabe.id != action.id) {
                    return friendWannabe;
                }
            })
        };
    }
    if (action.type === "GET_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.chatMessages.reverse()
        };
    }
    if (action.type === "ADD_MESSAGE") {
        state = {
            ...state,
            chatMessages: state.chatMessages.concat(action.msg)
        };
    }

    return state;
}
