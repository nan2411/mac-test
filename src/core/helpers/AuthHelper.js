import ApiHelper from './ApiHelper';
import {store} from './../../rdx/store';
import {setUser} from "../../rdx/actions/defaultActions";

export default class AuthHelper extends ApiHelper{
    resource = 'user';

    constructor(){
        super();

        this.currentDate = (new Date()).getTime();
    }
    /**
     * Loguear
     * @param email
     * @param password
     * @returns {PromiseLike<T> | Promise<T>}
     */
    login(email,password){
        return this.post('login',{email,password}).then((data) => {
            this.setLocalStorage(data.data,true);
            store.dispatch(setUser(data.data.user));
            return data.data;
        });
    }

    loginFacebook(fb_token){
        return this.post('facebook/login',{fb_token}).then((data) => {
            this.setLocalStorage(data.data,true);
            store.dispatch(setUser(data.data.user));
            return data.data;
        });
    }

    loginGoogle(gg_token){
        return this.post('google/login',{gg_token}).then((data) => {
            this.setLocalStorage(data.data,true);
            store.dispatch(setUser(data.data.user));
            return data.data;
        });
    }

    /**
     * Registro del usuario
     * @param nickname
     * @param email
     * @param password
     * @param password_confirmation
     * @returns {PromiseLike<T> | Promise<T>}
     */
    register(nickname,email,password,password_confirmation){
        return this.post('register',{nickname,email,password,password_confirmation,provider:'web'}).then((data) => {
            this.setLocalStorage(data.data,true);
            store.dispatch(setUser(data.data.user));
            return data.data;
        });
    }

    sendRecoverPassMail(email){
        return this.post('password/email',{email}).then((data) => {
            return data.data;
        });
    }

    changePassword(token,email,password,password_confirmation){
        return this.post('password',{token,email,password,password_confirmation}).then((data) => {
            return data.data;
        });
    }

    /**
     * Cerrar session
     */
    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('last_check');
        store.dispatch(setUser({}));
    }

    /**
     * Verificar que el usuario exista
     * @returns {*}
     */
    checkUser(){
        var token       = localStorage.getItem('token');

        if(!token){
            return new Promise((resolve,reject) => {
                reject("Debes iniciar sesion");
            });
        }

        var lastChecked = localStorage.getItem('last_check');

        if((this.currentDate - parseInt(lastChecked?lastChecked:'00',10))/(1000*60) > 12){//sino ya pasaron 30 min o mas desde la ultima verificacion
            return this.get('',token).then((data) => {
                this.setLocalStorage(data.data,true);
                store.dispatch(setUser(data.data.user));
            }).catch((err)=>{
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                throw err;
            });
        }else{
            return new Promise((resolve,reject) => {
                store.dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
                resolve(localStorage.getItem('user'));
            })
        }

    }

    /**
     * Setear el localstorage
     * @param data
     * @param last_check
     */
    setLocalStorage(data,last_check = false){
        localStorage.setItem('user',JSON.stringify(data.user));

        if(last_check){
            localStorage.setItem('last_check',this.currentDate);
        }

        if(data.token){
            localStorage.setItem('token',data.token);
        }
    }

    validateEmail(email){
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email.trim() === ''){
            return false;
        }
        return re.test(String(email.trim()).toLowerCase());
    }
}