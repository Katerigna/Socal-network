
import axios from './axios';
// actions.js

export function getCuteAnimals() {
    return axios.get('/cute-animals.json').then(({ data }) => {
        return {
            type: 'GET_ANIMALS',
            cuteAnimals: data
        };
    });
}










export function example() {
    return {
        type: 'ACTION_THAT_WILL_CHANGE_A_THING'
    };
}
