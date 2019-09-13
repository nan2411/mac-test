import ApiHelper from './../../core/helpers/ApiHelper';
import {SET_DIARY,SET_PAGES} from "./defaultActions";
import Toast from "../../core/helpers/Toast";

const helper    = new ApiHelper();
helper.resource = 'user/diary';

const setDiary     = value => ({type: SET_DIARY,value});
const setPages     = value => ({type: SET_PAGES,value});

/**
 * Obtener diario del usuario
 * @returns {function(*)}
 */
export const getDiary = () => {
    let token       = localStorage.getItem('token');

    return dispatch => {
        return helper.get('',token).then(data => {
            dispatch(setDiary(data.data.diary));
        });
    };

};

/**
 * Actualizar diario
 * @returns {function(*)}
 */
export const updateDiary = (diary) => {
    let token = localStorage.getItem('token');

    return dispatch => {
        return helper.put('',diary,token).then(data => {
            dispatch(setDiary(data.data.diary));
        });
    };

};

/**
 * Obtener paginas del diario de un usuario
 * @returns {function(*)}
 */
export const getPages = () => {
    let token       = localStorage.getItem('token');

    return dispatch => {
        return helper.get('pages',token).then(data => {
            dispatch(setPages(data.data.pages));
        });
    };
};

/**
 * Guardar paginas de un diario
 * @returns {function(*)}
 */
export const savePages = (pages) => {
    let token       = localStorage.getItem('token');

    return dispatch => {
        pages.forEach((value) => {
            if (value.isNew) {
                return helper.post('pages', value, token).then(data => {
                });
            } else {
                return helper.put('pages/'+value.id, value, token).then(data => {
                });
            }
        });
        Toast("Paginas guardadas correctamente!");
    }
};
