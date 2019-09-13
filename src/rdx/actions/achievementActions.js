import ApiHelper from './../../core/helpers/ApiHelper';
import {SET_ACHIEVEMENTS} from "./defaultActions";

const helper    = new ApiHelper();
helper.resource = 'achievements';


const setAchievements = value => ({type: SET_ACHIEVEMENTS,value});

/**
 * Obtener logros
 * @returns {function(*)}
 */
export const getAchievements = () => {
    let token       = localStorage.getItem('token');

    return dispatch => {
        return helper.get('',token).then(data => {
            dispatch(setAchievements(data.data.achievements));
        });
    };
};

