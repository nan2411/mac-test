import {
    SET_ERRORS, SET_USER, SET_BG_IMAGE, SET_NOTIFICATIONS, SET_STATS, SET_BG_MENU_IMAGE
} from '../actions/defaultActions';

export function errors(state = {},action){
    switch (action.type){
        case SET_ERRORS:
            return action.value;
        default:
            return state;
    }
}

export function user(state = {},action){
    switch (action.type){
        case SET_USER:
            return action.value;
        default:
            return state;
    }
}

export function bgImage(state = false,action){
    switch (action.type){
        case SET_BG_IMAGE:
            return action.value;
        default:
            return state;
    }
}

export function bgMenuImage(state = false,action){
    switch (action.type){
        case SET_BG_MENU_IMAGE:
            return action.value;
        default:
            return state;
    }
}

export function notifications(state = {},action){
    switch (action.type){
        case SET_NOTIFICATIONS:
            return action.value;
        default:
            return state;
    }
}

export function stats(state = {},action){
    switch (action.type){
        case SET_STATS:
            return action.value;
        default:
            return state;
    }
}



//[variable]:{key1:value1, key2:value2}