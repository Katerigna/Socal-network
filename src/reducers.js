export default function(state = {}, action) {
    if (action.type == 'RECEIVE_USERS') {
        // state = Object.assign({}, state, {
        //     users: action.users
        // });
        state = {
            ...state,
            users: action.users
        };
    }
    if (action.type == 'MAKE_HOT' || action.type == 'MAKE_NOT') {
        state = {
            ...state,
            users: state.users.map(
                user => {
                    if (user.id != action.id) {
                        return user;
                    } else {
                        return {
                            ...user,
                            hot: action.type == 'MAKE_HOT'
                        };
                    }
                }
            )
        };
    }
    console.log(state);
    return state;
}
