import {SET_COURSE, SET_COURSES, SET_LESSON, SET_LESSONS} from "../actions/defaultActions";

export function courses(state = false, action){
    switch (action.type){
        case SET_COURSES:
            return action.value;
        default:
            return state;
    }
}

export function course(state = false,action){
    switch (action.type){
        case SET_COURSE:
            return action.value;
        default:
            return state;
    }
}

export function lessons(state = false,action){
    switch (action.type){
        case SET_LESSONS:
            return action.value;
        default:
            return state;
    }
}

export function lesson(state = false,action){
    switch (action.type){
        case SET_LESSON:
            return action.value;
        default:
            return state;
    }
}