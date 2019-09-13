import React, { Component } from 'react'
import { Route, Redirect} from 'react-router'
import AuthHelper from "../../core/helpers/AuthHelper";
import Loading from "../../components/Loading";

export default class PrivateRoute extends Component{
    constructor(props){
        super(props);
        this.state = {isLoggedIn:''};
        this.auth = new AuthHelper();

    }
    componentWillMount(){

        this.auth.checkUser().then((user)=>{
            this.setState({isLoggedIn:true});
        }).catch((err) => {
            this.setState({isLoggedIn:false});
        });
    }

    render () {
        if(this.state.isLoggedIn === false){
            return <Redirect to={{ pathname: process.env.PUBLIC_URL+'/login' }} />
        }else if(this.state.isLoggedIn === true){
            return <Route {...this.props.path} component={this.props.component}/>
        }else{
            return <Loading/>
        }
    }
}
