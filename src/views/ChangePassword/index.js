import React, {Component} from "react";
import {Col, Grid, Row} from "react-flexbox-grid";
import {
    Button, Card, CardContent, CardHeader, FormControl, FormHelperText, Input, InputLabel,
    TextField
} from "@material-ui/core";
import AuthHelper from '../../core/helpers/AuthHelper';
import {withRouter} from "react-router";
import Toast from "../../core/helpers/Toast";
import {connect} from "react-redux";

class ChangePassword extends Component {
    constructor(){
        super();
        document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL+'/assets/images/login-bg.jpg'})`;

        this.state = {email:'',formValid:false,password:'123456',password_confirmation:'123456',token:''};
        this.changePassword = this.changePassword.bind(this);
    }

    componentDidMount(){
        if(Object.keys(this.props.user).length !== 0 ){
            Toast("Ya tienes una sesion activa",'error');
            this.props.history.push('home');
        }

        let params = new URLSearchParams(this.props.location.search);
        let token  = params.get('token');

        if(!token){
            Toast('Ups! no puedes ver este contenido','error');
            this.props.history.push('/login');
        }

        this.auth = new AuthHelper();
        this.setState({token,email:params.get('email')},()=>{
            this.validForm(this.state);
        });


    }

    changePassword() {
        const {token,email,password,password_confirmation} = this.state;
        this.auth.changePassword(token,email,password,password_confirmation).then(()=>{
            Toast('Contraseña cambiada correctamente');
            this.props.history.push('/login');
        });
    }

    componentWillReceiveProps(props){
        if(props.errors.token || props.errors.error){
            Toast(props.errors.token?props.errors.token[0]: props.errors.error,'error');
        }
    }

    render(){
        return(
            <Grid fluid>
                <Row middle="xs" center="xs" style={{height: "100vh"}} className="center">
                    <Col md={3}>
                        <Card>

                            <CardHeader
                                title="Mac"
                                subheader="Recuperar contraseña"
                            />

                            <CardContent>
                                <Row>
                                    <Col md={12}>
                                        <FormControl fullWidth aria-describedby="email-error-text" error={this.props.errors.email?true:false}>
                                            <InputLabel htmlFor="email">Correo</InputLabel>
                                            <Input id="email" value={this.state.email} onChange={(ev) => {
                                                this.handleChange(ev)
                                            }} />
                                            <FormHelperText id="email-error-text">{this.props.errors.email}</FormHelperText>
                                        </FormControl>
                                    </Col>
                                    <Col md={12}>
                                        <FormControl fullWidth aria-describedby="password-error-text" error={this.props.errors.password?true:false}>
                                            <InputLabel htmlFor="password">Contraseña</InputLabel>
                                            <Input id="password" value={this.state.password} onChange={(ev) => {
                                                this.handleChange(ev)
                                            }} />
                                            <FormHelperText id="password-error-text">{this.props.errors.password}</FormHelperText>
                                        </FormControl>

                                    </Col>
                                    <Col md={12}>
                                        <TextField label="Confirmar contraseña" id="password_confirmation" fullWidth onChange={(ev) => {
                                            this.handleChange(ev)
                                        }} value={this.state.password_confirmation}/>

                                    </Col>

                                    <Col md={12} className="big-margin-top">
                                        <Button color="secondary" variant="contained" fullWidth
                                                disabled={!this.state.formValid} onClick={this.changePassword}>
                                            Enviar correo de recuperacion
                                        </Button>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
            </Grid>
        );
    }

    handleChange(e){
        let change = {};
        change[e.target.id] = e.target.value;

        this.setState(change,()=>{
            this.validForm(this.state);
        });
    }

    validForm(state){
        let inputs  = ['email','password','password_confirmation','token'];
        let count   = 0;

        inputs.forEach((value) => {
            count += state[value].trim().length > 0?1:0;
        });


        let equals = state.password === state.password_confirmation;

        if(count === inputs.length && this.auth.validateEmail(state.email) && equals){
            this.setState({formValid:true});
        }
    }
}
const stateToProps      = ({user,errors}) => ({user,errors:errors.errors?errors.errors:{}});

const conn = connect(stateToProps,null);

export default withRouter(conn(ChangePassword));