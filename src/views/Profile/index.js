import React, {Component} from 'react';
import {Col, Row} from "react-flexbox-grid";
import {
    Button, FormControl, FormHelperText, Input, InputLabel, Paper,
    Typography
} from "@material-ui/core";
import {connect} from "react-redux";
import {updateUser, updateUserAvatar, updateUserPassword} from "../../rdx/actions/UserActions";
import { Upload } from 'mdi-material-ui';
import ProfileCard from "../../components/Cards/ProfileCard";

class Profile extends Component{
    constructor(){
        super();
        this.state = {nickname:'',name:'',last_name:'',
            password:'',new_password:'',new_password_confirmation:'',
            avatar_src:'',avatar:'',imageValid:false,
            editFormValid:false,passwordFormValid:false};
        this.saveProfile    = this.saveProfile.bind(this);
        this.savePassword   = this.savePassword.bind(this);
        this.saveImage      = this.saveImage.bind(this);
    }

    componentDidMount(){
        const {nickname,name,last_name} = this.props.user;
        this.setState({nickname,last_name,name:name.length > 0?name:nickname},()=>{
            this.validateEditForm(this.state);
        });

        this.setState({avatar_src:this.props.user.avatar});
    }

    saveProfile(){
        const {nickname,name,last_name} = this.state;

        this.props.updateUser({nickname,name,last_name});
    }

    savePassword(){
        const {password,new_password,new_password_confirmation} = this.state;

        this.props.updateUserPassword(password,new_password,new_password_confirmation);
    }

    saveImage(){
        this.props.updateUserAvatar(this.state.avatar);
    }

    render(){
        return(
                <Row>
                    <Col md={6}>

                        <Paper elevation={4} className="paper-main">
                            <Typography variant="headline" component="h2">
                                Editar datos personales
                            </Typography>
                            <Row>
                                <Col md={12}>
                                    <FormControl fullWidth aria-describedby="nickname-error-text" error={this.props.errors.nickname?true:false}>
                                        <InputLabel htmlFor="nickname">Nickname</InputLabel>
                                        <Input id="nickname" value={this.state.nickname} onChange={(ev) => {
                                            this.handleEditChange(ev)
                                        }} />
                                        <FormHelperText id="name-error-text">{this.props.errors.nickname}</FormHelperText>
                                    </FormControl>
                                </Col>

                                <Col md={12}>
                                    <FormControl fullWidth aria-describedby="name-error-text" error={this.props.errors.name?true:false}>
                                        <InputLabel htmlFor="name">Nombre</InputLabel>
                                        <Input id="name" value={this.state.name} onChange={(ev) => {
                                            this.handleEditChange(ev)
                                        }} />
                                        <FormHelperText id="name-error-text">{this.props.errors.name}</FormHelperText>
                                    </FormControl>
                                </Col>

                                <Col md={12}>
                                    <FormControl fullWidth aria-describedby="last_name-error-text" error={this.props.errors.last_name?true:false}>
                                        <InputLabel htmlFor="last_name">Apellidos</InputLabel>
                                        <Input id="last_name" value={this.state.last_name} onChange={(ev) => {
                                            this.handleEditChange(ev)
                                        }} />
                                        <FormHelperText id="last_name-error-text">{this.props.errors.last_name}</FormHelperText>
                                    </FormControl>
                                </Col>

                                <Col md={12}>
                                    <FormControl>
                                        <Button size="small" color="secondary" variant="contained"
                                                disabled={!this.state.editFormValid} fullWidth onClick={this.saveProfile}>
                                            Guardar
                                        </Button>
                                    </FormControl>
                                </Col>
                            </Row>
                        </Paper>
                        {/*contraseña*/}

                        <Paper elevation={4} className="paper-main align-left">
                            <Typography variant="headline" component="h2">
                                Cambiar contraseña
                            </Typography>
                            <Row>
                                <Col md={12} >
                                    <FormControl fullWidth aria-describedby="password-error-text" error={this.props.errors.password?true:false}>
                                        <InputLabel htmlFor="password">Contraseña actual</InputLabel>
                                        <Input id="password" value={this.state.password} onChange={(ev) => {
                                            this.handlePassChange(ev)
                                        }} />
                                        <FormHelperText id="password-error-text">{this.props.errors.password}</FormHelperText>
                                    </FormControl>
                                </Col>

                                <Col md={12}>
                                    <FormControl fullWidth aria-describedby="name-error-text" error={this.props.errors.new_password?true:false}>
                                        <InputLabel htmlFor="new_password">Nueva contraseña</InputLabel>
                                        <Input id="new_password" value={this.state.new_password} onChange={(ev) => {
                                            this.handlePassChange(ev)
                                        }} />
                                        <FormHelperText id="newPassword-error-text">{this.props.errors.new_password}</FormHelperText>
                                    </FormControl>
                                </Col>

                                <Col md={12}>
                                    <FormControl fullWidth aria-describedby="nickname-error-text" >
                                        <InputLabel htmlFor="new_password_confirmation">Confirmar contraseña</InputLabel>
                                        <Input id="new_password_confirmation" value={this.state.new_password_confirmation} onChange={(ev) => {
                                            this.handlePassChange(ev)
                                        }} />
                                    </FormControl>
                                </Col>
                                <Col md={12} className="default-margin-top">
                                    <FormControl>
                                        <Button size="small" color="secondary" variant="contained"
                                                disabled={!this.state.passwordFormValid} fullWidth onClick={this.savePassword}>
                                            Guardar
                                        </Button>
                                    </FormControl>
                                </Col>
                            </Row>
                        </Paper>
                    </Col>

                    <Col md={6}>
                            <ProfileCard
                                avatar={this.state.avatar_src}
                                footer={
                                    [<Button color="secondary" variant="contained"
                                             className="default-margin-bottom"
                                             component="label" key={'a1'}>
                                        {'Subir'}
                                        <Upload  />
                                        <input
                                            accept="image/*"
                                            onChange={(e) =>(this.handleImage(e.target))}
                                            style={{ display: 'none' }}
                                            type="file"
                                        />
                                    </Button>,
                                        <Button color="secondary" variant="contained" key={'a2'}
                                                component="label"
                                                className="default-margin-bottom"
                                                disabled={!this.state.imageValid}
                                                onClick={this.saveImage}
                                        >Guardar</Button>]
                                }
                            />
                    </Col>

                </Row>
        );
    }

    handleImage(target){
        if(target.files[0]){
            let src = URL.createObjectURL(target.files[0]);
            this.setState({avatar_src:src,avatar:target.files[0],imageValid:true});
        }else{
            this.setState({avatar_src:this.props.user.avatar,avatar:'',imageValid:false});
        }

    }

    handleEditChange(e){
        let change = {};
        change[e.target.id] = e.target.value;

        this.setState(change,()=>{
            this.validateEditForm(this.state);
        });
    }

    handlePassChange(e){
        let change = {};
        change[e.target.id] = e.target.value;

        this.setState(change,()=>{
            this.validatePassForm(this.state);
        });
    }

    validateEditForm(state){
        let inputs = ['nickname','name','last_name'];
        let count  = 0;
        inputs.forEach((value) => {
            count += state[value].trim().length > 0?1:0;
        });
        if(count === inputs.length){
            this.setState({editFormValid:true});
        }
    }

    validatePassForm(state){
        let inputs = ['password','new_password','new_password_confirmation'];
        let count  = 0;
        inputs.forEach((value) => {
            count += state[value].trim().length > 0?1:0;
        });

        let equals = state.new_password === state.new_password_confirmation;

        if(count === inputs.length && equals){
            this.setState({passwordFormValid:true});
        }
    }
}

const stateToProps      = ({user,errors}) => ({user,errors:errors.errors?errors.errors:{}});
const dispatchToProps   = (dispatch)=>({//custom props
    updateUser: (newProps) => dispatch(updateUser(newProps)),
    updateUserPassword: (password,new_password,new_password_confirmation) => dispatch(updateUserPassword(password,new_password,new_password_confirmation)),
    updateUserAvatar: (avatar) => dispatch(updateUserAvatar(avatar)),
});
const conn = connect(stateToProps,dispatchToProps);
export default conn(Profile);