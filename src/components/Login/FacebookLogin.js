import React, { Component } from 'react';
import {Button} from "@material-ui/core";
import {Facebook} from "mdi-material-ui";
import AuthHelper from "../../core/helpers/AuthHelper";

class FacebookLogin extends Component {


    componentDidMount() {
        this.auth = new AuthHelper();
        document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
    }

    componentWillUnmount() {
        document.removeEventListener('FBObjectReady', this.initializeFacebookLogin);
    }

    /**
     * Init FB object and check Facebook Login status
     */
    initializeFacebookLogin(){
        this.FB = window.FB;
    };


    /**
     * Check login status and call login api is user is not logged in
     */
    facebookLogin(){
        window.FB.getLoginStatus(response => {

            if (response.status === 'connected') {
                const {accessToken} = response.authResponse;
                this.auth.loginFacebook(accessToken)
            } else {
                this.makeLogin();
            }
        }, );
    }

    makeLogin(){
        window.FB.login(function(response) {
            if (response.authResponse) {
                console.log('try to login');
                window.FB.api('/me', function(response) {
                    console.log(response);
                });
            } else {
                console.log('Not auth');
            }
        });
    }

    render() {
        return (
            <Button size="small" color="primary"
                    variant="contained" className="btn-facebook"
                    onClick={()=>this.facebookLogin()}
                    fullWidth>
                <Facebook className="social-btn-icon"/>
                <span className="social-btn-text-facebook">Entrar con Facebook</span>
            </Button>
        );
    }
}

export default FacebookLogin;