export default function reducer(state = {}, action) {
    if (action.type === "ACTION_TO CHANGE") {
        //then change redux thing
    }
    if (action.type === "GET_ANIMALS") {
        // console.log("get animals in reducer", action);
        state = {
            ...state,
            cuteAnimals: action.cuteAnimals
        };
    }
    return state;
}
