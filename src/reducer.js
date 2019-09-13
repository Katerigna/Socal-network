// reducer.js

export default function reducer(state = {}, action) {
    if (action.type === 'ACTION_THAT_WILL_CHANGE_A_THING') {
        // then change redux state (immutably!)
    }
    if (action.type === 'GET_ANIMALS') {
        state = {
            ...state,
            cuteAnimals: action.cuteAnimals
        };
    }
    return state;
}
