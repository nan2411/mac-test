import React,{Component} from 'react';
import { GoogleLogin } from 'react-google-login';
import AuthHelper from "../../core/helpers/AuthHelper";
import {Google} from "mdi-material-ui";
import Toast from "../../core/helpers/Toast";

export default class GoogleLoginButton extends Component{
    constructor(){
        super();
        this.googleSuccess  = this.googleSuccess.bind(this);
        this.googleFail     = this.googleFail.bind(this);
    }

    componentDidMount() {
        this.auth = new AuthHelper();
    }

    /**
     * Check login status and call login api is user is not logged in
     */
    googleSuccess(response){
       this.auth.loginGoogle(response.accessToken).catch((err)=>{
           Toast("Ocurrio un error, vuelve a intentarlo","error");
       });
    }

    googleFail(response){
        console.log(response)
        Toast('Ocurrio un error, vuelve a intentarlo','error');
    }

    render() {
        return (
            <GoogleLogin className='full-width btn-google'
                clientId="426231885856-8803rc2klgesip215t2dgluupr4jd4bb.apps.googleusercontent.com"
                onSuccess={this.googleSuccess}
                onFailure={this.googleFail}>
                <span>
                    <Google className="social-btn-icon"/>
                    <span className="social-btn-text-google">Entrar con Google</span>
                </span>

            </GoogleLogin>
        );
    }
}
