import ApiHelper from './../../core/helpers/ApiHelper';
import {SET_COURSES, SET_COURSE, SET_LESSONS, SET_LESSON, setAchievement} from "./defaultActions";
import Toast from "../../core/helpers/Toast";
const helper = new ApiHelper();

helper.resource = 'courses';

export const setCourses    = value => ({type: SET_COURSES,value});
export const setCourse     = value => ({type: SET_COURSE,value});
export const setLessons    = value => ({type: SET_LESSONS,value});
export const setLesson     = value => ({type: SET_LESSON,value});

/**
 * Obtener cursos
 * @returns {function(*)}
 */
export const getCourses = () => {
    let token       = localStorage.getItem('token');

    return dispatch => {
        return helper.get('',token).then(data => {
            dispatch(setCourses(data.data.courses));
        });
    };
};

/**
 * Obtener un curso
 * @param slug
 * @returns {function(*)}
 */
export const getCourse = (slug) => {
    let token       = localStorage.getItem('token');

    return dispatch => {
        return helper.get('slug/'+slug,token).then(data => {
            dispatch(setCourse(data.data.course));
        });
    };
};

/**
 * Obtener lecciones de un curso
 * @param course
 * @returns {function(*)}
 */
export const getLessons = (course) => {
    let token       = localStorage.getItem('token');

    return dispatch => {

        return helper.get(course+'/lessons',token).then(data => {
            dispatch(setLessons(data.data.lessons));
        });
    };
};

/**
 * Obtener una leccion (es necesario el curso y la leccion en slug)
 * @param course
 * @param lesson
 * @returns {function(*)}
 */
export const getLesson = (course,lesson) => {
    let token       = localStorage.getItem('token');

    return dispatch => {

        return helper.get('slug/'+course+'/lesson/'+lesson,token).then(data => {
            dispatch(setLesson(data.data.lesson));
        });
    };
};

/**
 * Obtener una leccion (es necesario el curso y la leccion en slug)
 * @param course
 * @param lesson
 * @returns {function(*)}
 */
export const viewLesson = (lesson) => {
    let token       = localStorage.getItem('token');

    return dispatch => {

        return helper.put('lessons/'+lesson,[],token).then(data => {
            dispatch(setLesson(data.data.lesson));
            if(data.data.achievement){
                dispatch(setAchievement(data.data.achievement));
            }
            Toast("Felicidades! completaste otra leccion.");
        });
    };
};
