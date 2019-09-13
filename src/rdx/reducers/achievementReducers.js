import {SET_ACHIEVEMENTS,SET_ACHIEVENT} from "../actions/defaultActions";

export function achievements(state = false, action){
    switch (action.type){
        case SET_ACHIEVEMENTS:
            return action.value;
        default:
            return state;
    }
}


export function achievement(state = false, action){
    switch (action.type){
        case SET_ACHIEVENT:
            return action.value;
        default:
            return state;
    }
}