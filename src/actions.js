import axios from "./axios";

export function example() {
    //this object in return is the action
    return {
        type: "ACTION_TO CHANGE" //every action needs corresponding if-statement in the reducer
    };
}

export function getCuteAnimals() {
    //we have to return it to get a promise , it' a middleware requirement
    return axios.get("/cute-animals.json").then(({ data }) => {
        // console.log("data", data);
        return {
            type: "GET_ANIMALS",
            cuteAnimals: data
        };
    });
}
