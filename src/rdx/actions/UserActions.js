import ApiHelper from './../../core/helpers/ApiHelper';
import {SET_NOTIFICATIONS, SET_STATS, setUser} from "./defaultActions";
import Toast from "../../core/helpers/Toast";
import {store} from "../store";

const helper = new ApiHelper();

helper.resource = 'user';

const setNotifications = value => ({type: SET_NOTIFICATIONS,value});
const setStats         = value => ({type: SET_STATS,value});

export const updateUser = (user) =>{
    let token       = localStorage.getItem('token');

    return dispatch => {
        return helper.put('u',user,token).then(data => {
            Toast("Cambiaste tu perfil correctamente");
            localStorage.setItem('user',JSON.stringify(data.data.user));
            dispatch(setUser(data.data.user));
        });
    };
};

export const updateUserPassword = (password,new_password,new_password_confirmation) =>{
    let token       = localStorage.getItem('token');

    return dispatch => {
        return helper.put('password',{password,new_password,new_password_confirmation},token).then(data => {
            Toast("Cambiaste tu contraseña correctamente");
        });
    };
};

export const updateUserAvatar = (avatar) =>{
    let token       = localStorage.getItem('token');

    return dispatch => {
        return helper.put('image',{avatar},token).then(data => {
            Toast("Cambiaste tu avatar correctamente");
            localStorage.setItem('user',JSON.stringify(data.data.user));
            dispatch(setUser(data.data.user));
        });
    };
};


export const getNotifications = () =>{
    let token       = localStorage.getItem('token');
    return dispatch => {
        return helper.get('notifications',token).then(data => {
            dispatch(setNotifications(data.data.notifications));
        });
    };
};

export const getStats = () =>{
    let token       = localStorage.getItem('token');

    return dispatch => {
        return helper.get('stats',token).then(data => {
            dispatch(setStats(data.data.stats));
        });
    };
};

export const viewNotification = (notification) =>{
    let token       = localStorage.getItem('token');

    return dispatch => {
        return helper.put('notification/'+notification,{},token).then(data => {
            Toast('Notificacion vista', 'info');

            let notification = data.data.notification;
            let notifications = store.getState().notifications;

            notifications = notifications.map((value)=>{
                console.log(value.id === notification.id);
                return value.id === notification.id?notification:value;
            });

            dispatch(setNotifications(notifications));
        });
    };
};

export const allNotifications = () =>{
    let token       = localStorage.getItem('token');

    return dispatch => {
        return helper.put('notifications/',{},token).then(data => {
            let notifications = data.data.notifications;
            Toast('Marcaste todas las notificaciones como vistas!', 'info');
            dispatch(setNotifications(notifications));
        });
    };
};
