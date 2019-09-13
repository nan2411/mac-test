import React,{Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {setErrors} from "../../rdx/actions/defaultActions";

class Error extends Component{
    constructor(){
        super();

        this.resetError = this.resetError.bind(this);
    }

    resetError(){
        this.props.setErrors({error:false,message:'',type:''});
    }

    render(){
        return (
            <Dialog
                open={this.props.visible}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Ha ocurrido un error'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button component={Link} to={`${process.env.PUBLIC_URL}/home`} autoFocus color={"secondary"} onClick={this.resetError}>
                        Home
                    </Button>
                    <Button component={Link} to={`${process.env.PUBLIC_URL}/cursos`} autoFocus color={"secondary"} onClick={this.resetError}>
                        Cursos
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
const stateToProps   = ({errors})=>({errors});
const dispatchToProps   = (dispatch)=>({
    setErrors: (value)   => dispatch(setErrors(value))
});

const conn = connect(stateToProps,dispatchToProps);

export default withRouter(conn(Error));