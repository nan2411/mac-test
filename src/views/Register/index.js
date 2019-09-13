import React, {Component} from 'react';
import {Col, Grid, Row} from "react-flexbox-grid";
import {
    Button, Card, CardContent, CardHeader, Divider, FormControl, FormHelperText, Input, InputLabel,Hidden, withStyles,
    FormGroup, FormControlLabel, Checkbox, Typography, IconButton, TextField
} from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Lock from '@material-ui/icons/Lock';
import Email from '@material-ui/icons/Email';
import Clear from '@material-ui/icons/Clear';
import {Link} from "react-router-dom";
import Toast from "../../core/helpers/Toast";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

//Helpers
import loginStyle from "../../variables/styles/loginStyle";
import AuthHelper from '../../core/helpers/AuthHelper';

//Custom Componentes
import Loading from "../../components/Loading/index";
import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import FooterLogin from '../../components/Footer/FooterLogin';
import { darkOrange } from "../../variables/styles";

const muiTheme = createMuiTheme({
  overrides: {
    MuiIconButton:{
      label:{
        color: darkOrange +" !important"
      }
    }
  }
});

const muiThemeCheckBox = createMuiTheme({
  overrides: {
    MuiTypography:{
      body1:{
        fontSize: "0.75rem",
        color: darkOrange +" !important"
      }
    }
  }
});

class Register extends Component{
    background = `url(${process.env.PUBLIC_URL+'/assets/images/Fondo.login.svg'}) no-repeat bottom`;
    constructor(){
        super();

        this.auth                           = new AuthHelper();
        document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL+'/assets/images/login-bg.jpg'})`;
        this.state                          = {formValid:false,nickname:'',email:'',password:'',rPassword:''};
        this.handleChange                   = this.handleChange.bind(this);
        this.validForm                      = this.validForm.bind(this);
        this.registerUser                   = this.registerUser.bind(this);
        document.body.style.background = "linear-gradient(180deg, #ffa726, #fb8c00)";
    }

    componentDidMount(){
        if(Object.keys(this.props.user).length !== 0 ){
            Toast("Ya tienes una sesion activa",'error');
            this.props.history.push('home');
        }
        this.validForm(this.state);
    }

    registerUser(){
        const {nickname,email,password,rPassword} = this.state;

        this.auth.register(nickname,email,password,rPassword).then(()=>{
            this.props.history.push('/login');
        });
    }

    render(){
        const { classes,t } = this.props;
        return(
          <React.Fragment>
            <Hidden only={['xs', 'sm']}>
              <HeaderLogin> </HeaderLogin>
            </Hidden>
            <Grid fluid style={{ background : this.background }}>
                <Row middle="xs" center="xs" style={{height: "100vh"}} className="center">
                    <Col xs={11} sm={8} md={6} lg={4} xl={4}>
                        <Card style={{margin: "0 auto"}}>
                            <Row end="xs">
                              <Col xs={12}>
                                <MuiThemeProvider theme={muiTheme}>
                                  <Link to={`${process.env.PUBLIC_URL}/`} className="default-link">
                                  <IconButton>
                                    <Clear/>
                                  </IconButton>
                                  </Link>
                                </MuiThemeProvider>
                              </Col>
                            </Row>
                            <CardHeader
                                classes={{
                                  title: classes.titleRegister,
                                }}
                                title={t("register")}
                            />

                            <CardContent>
                                <Col md={12} className="default-margin" >
                                    <FormControl fullWidth aria-describedby="nickname-error-text" error={this.props.errors.nickname?true:false}>
                                      <TextField label="Nombre" id="nickname" fullWidth onChange={(ev) => {
                                          this.handleChange(ev)
                                        }} value={this.state.email}   InputProps={{
                                          endAdornment: (
                                            <InputAdornment position="end">
                                              <IconButton>
                                                <PermIdentity/>
                                              </IconButton>
                                            </InputAdornment>
                                          )
                                        }}/>
                                      <FormHelperText id="nickname-error-text">{this.props.errors.nickname}</FormHelperText>
                                    </FormControl>
                                </Col>

                                <Col md={12} className="default-margin">
                                    <FormControl fullWidth aria-describedby="email-error-text" error={this.props.errors.email?true:false}>
                                      <TextField label="Email" id="email" type="email" fullWidth onChange={(ev) => {
                                          this.handleChange(ev)
                                        }} value={this.state.email} InputProps={{
                                          endAdornment: (
                                            <InputAdornment position="end">
                                              <IconButton>
                                                <Email/>
                                              </IconButton>
                                            </InputAdornment>
                                          )
                                        }}/>
                                        <FormHelperText id="email-error-text">{this.props.errors.email}</FormHelperText>
                                    </FormControl>
                                </Col>

                                <Col md={12} className="default-margin">
                                    <FormControl fullWidth aria-describedby="password-error-text" error={this.props.errors.password?true:false}>
                                      <TextField label="Password" id="password" type="password" fullWidth onChange={this.handleChange} value={this.state.password}
                                        InputProps={{
                                          endAdornment: (
                                            <InputAdornment position="end">
                                              <IconButton>
                                                <Lock/>
                                              </IconButton>
                                            </InputAdornment>
                                          )
                                        }}/>
                                        <FormHelperText id="password-error-text">{this.props.errors.password}</FormHelperText>
                                    </FormControl>
                                </Col>

                                <Col md={12} className="default-margin">
                                    <FormControl fullWidth aria-describedby="rPassword-error-text" >
                                      <TextField label="Repetir contraseña" id="rPassword" type="password" fullWidth onChange={this.handleChange} value={this.state.rPassword}
                                        InputProps={{
                                          endAdornment: (
                                            <InputAdornment position="end">
                                              <IconButton>
                                                <Lock/>
                                              </IconButton>
                                            </InputAdornment>
                                          )
                                        }}/>
                                    </FormControl>
                                </Col>

                                <Row center="xs" className="default-margin">
                                  <Col md={12} >
                                    <FormGroup row>
                                      <MuiThemeProvider theme={muiThemeCheckBox}>
                                      <FormControlLabel
                                        control={
                                          <Checkbox onChange={console.log("Check")} />
                                        }
                                        label="Deseo recibir notificaciones vía mensajes de text o Whatsapp"
                                      />
                                      </MuiThemeProvider>
                                    </FormGroup>
                                  </Col>
                                </Row>


                                <Row center="xs" className="default-margin">
                                    <Col md={12}>
                                        {/*<Divider/>*/}
                                        <Typography component="small" variant="caption">
                                            *Te enviaremos promociones, ofertas especiales, ideas y las actualizaciones de nuestras politícas a través de correo electrónico.
                                        </Typography>
                                    </Col>
                                    <Col md={7} className="default-margin">
                                        <Button size="small" variant="contained" className={classes.btnGradient + " " + classes.buttonLogin}
                                                disabled={!this.state.formValid} fullWidth onClick={this.registerUser}>
                                            Registrarse
                                        </Button>
                                    </Col>
                                    {/*<Col md={12}>
                                        <Link to={`${process.env.PUBLIC_URL}/`} className="default-link">Volver</Link>
                                    </Col>*/}
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
                <FooterLogin/>
            </Grid>
        </React.Fragment>
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
        let inputs  = ['nickname','email','password','rPassword'];
        let count   = 0;

        inputs.forEach((value) => {
            count += state[value].trim().length > 0?1:0;
        });


        let equals = state.password === state.rPassword;

        if(count === inputs.length && this.auth.validateEmail(state.email) && equals){
            this.setState({formValid:true});
        }
    }
}

const stateToProps      = ({user,errors}) => ({user,errors:errors.errors?errors.errors:{}});

const conn = connect(stateToProps,null);

export default withStyles(loginStyle)(conn(translate("translations")(Register)));
