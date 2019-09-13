import {SET_DIARY,SET_PAGES} from "../actions/defaultActions";

export function diary(state = false, action){
    switch (action.type){
        case SET_DIARY:
            return action.value;
        default:
            return state;
    }
}

export function pages(state = false, action){
    switch (action.type){
        case SET_PAGES:
            return action.value;
        default:
            return state;
    }
}