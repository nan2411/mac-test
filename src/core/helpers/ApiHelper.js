import {setErrors} from "../../rdx/actions/defaultActions";
import {store} from './../../rdx/store';

class ApiHelper{

    constructor(){
        this.route = window.api;
    }

    /**
     * Hacer una peticion get
     * @param path
     * @param token
     * @returns {Promise<Response>}
     */
    get(path,token = false){
        this.emptyErrors();
        return fetch(this.route+(this.resource !== ''?this.resource+'/':'')+path,{
            method: "GET",
            headers: this.getHeaders(token),
        }).then((response) => {
            if(response.status !== 200){
                throw response;
            }
            return response.json();
        }).catch(this.catchErrors);
    }

    /**
     * Hacer una peticion post
     * @param path
     * @param data
     * @param token
     * @returns {*}
     */
    post(path,data, token = false){
        return this.makeFetch(path,data, token,'POST');
    }

    /**
     * Hacer una peticion put
     * @param path
     * @param data
     * @param token
     * @returns {*}
     */
    put(path,data, token = false){
        return this.makeFetch(path,data, token,'PUT');
    }

    /**
     * Hacer una peticion
     * @param path
     * @param data
     * @param token
     * @param method
     * @returns {Promise<Response>}
     */
    makeFetch(path,data, token,method){
        this.emptyErrors();

        var form = new FormData();

        Object.keys(data).forEach((key)=>{
            form.append(key,data[key]);
        });
        return fetch(this.route + (this.resource !== '' ? this.resource + '/' : '') + path,
            {
                method: method,
                body: form,
                headers: this.getHeaders(token)
            }).then((response) => {
            if(response.status !== 200){
                throw response;
            }
            return response.json();
        }).catch(this.catchErrors);
    }

    /**
     * Headers generales que se usaran en el consumo de la api
     * @param token
     * @returns {{Accept: string}}
     */
    getHeaders(token){
        var headers = {'Accept': 'application/json',"Access-Control-Allow-Origin":'*',"Access-Control-Allow-Methods":'*'};
        if(token !== false){
            headers['Authorization'] = 'Bearer '+token;
        }

        return headers;
    }

    /**
     * Cachar errores cambiar el estado si hay errores
     * @param err
     */
    catchErrors(err){

        if(typeof err.json === 'function'){
            err.json().then((response) => {
                let keys = Object.keys(response.errors);
                if(keys.length === 1 && keys.indexOf('error') > -1){

                    store.dispatch(setErrors({error: true, errors: response.errors, type: 'message'}));
                }else if(keys.length >= 1){
                    store.dispatch(setErrors({error:true,errors:response.errors,type:'form'}));
                }else{
                    store.dispatch(setErrors({error:true,errors:{error: 'Ocurrio un errror'},type:'message'}));
                }
            }).catch(function () {
                store.dispatch(setErrors({error:true,errors:{error: err.toString()},type:'message'}));
            });
        }else{

            store.dispatch(setErrors({error:true,errors:{error: "Ocurrio un error, recarga la pagina o sigue uno de los siguientes enlaces"},type:'message'}));
        }

        throw err;
    }

    emptyErrors(){
        store.dispatch(setErrors({error:false,errors:{}, type:'message'}));
    }

}

export default ApiHelper;
