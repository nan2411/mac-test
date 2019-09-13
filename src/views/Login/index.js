import React,{Component} from "react";
import {Row,Col} from "react-flexbox-grid";
import {Button, Typography,Card,CardHeader, CardContent, TextField, withStyles, Checkbox , Hidden} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Redirect} from "react-router";
import {Grid} from "react-flexbox-grid";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Lock from '@material-ui/icons/Lock';

//Helpers
import loginStyle from "../../variables/styles/loginStyle";
import AuthHelper from '../../core/helpers/AuthHelper';

//Custom Componentes
import Loading from "../../components/Loading/index";
import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import FooterLogin from '../../components/Footer/FooterLogin'

import "../../styles/login.css";

class Login extends Component{
    background = `url(${process.env.PUBLIC_URL+'/assets/images/Fondo.login.svg'}) no-repeat bottom`;
    constructor(){
        super();
        this.state = {email:'admin@admin.com',password:'123456',validForm:false,isLoggedIn:''};

        this.auth = new AuthHelper(this.props);
        document.body.style.background = "linear-gradient(180deg, #ffa726, #fb8c00)";
        /*document.body.style.background = `url(${process.env.PUBLIC_URL+'/assets/images/login-bg.jpg'}) no-repeat center center fixed`;
        document.body.style.backgroundSize= 'cover';*/

        this.handleChange = this.handleChange.bind(this);
        this.loginNormal = this.loginNormal.bind(this);
    }

    componentDidMount(){
        this.auth.checkUser().then(()=>{
            this.setState({isLoggedIn:true});
        }).catch(()=>{
            this.setState({isLoggedIn:false})
        });
        this.validateForm();
    }

    handleChange(ev){
        var elm = ev.target;

        if(elm.id === "email") {
            this.setState({email:elm.value});
        }

        if(elm.id === "password") {
            this.setState({password:elm.value});
        }

        this.validateForm();
    }

    loginNormal(){
        this.auth.login(this.state.email,this.state.password).then((data)=>{
            this.props.history.push(process.env.PUBLIC_URL+"/home");
        });
    }
    componentWillReceiveProps(props){
        if(Object.keys(props.user).length > 0 && !this.state.isLoggedIn){
            this.setState({isLoggedIn:true});
        }
    }

    render(){
      const { classes,t } = this.props;
      return(
          <React.Fragment>
            <Hidden only={['xs', 'sm']}>
              <HeaderLogin> </HeaderLogin>
            </Hidden>
            {(this.state.isLoggedIn === false)? this.renderLogin() : (this.state.isLoggedIn === true)?<Redirect to={{ pathname: process.env.PUBLIC_URL+'/home' }} />:<Loading />}
          </React.Fragment>
      )
    }

    renderLogin(){
      const { classes,t } = this.props;
      return(
        <React.Fragment>
            <Grid fluid style={{ background : this.background }}>
              <Row middle="xs" center="xs" style={{height: "100vh"}} className="center">
                  <Col xs={11} sm={8} md={6} lg={4} xl={4}>
                      <Card style={{margin: "0 auto"}}>
                        <CardHeader
                          classes={{
                            title: classes.titleLogin,
                          }}
                          title={t("login")}
                          />

                        <CardContent className={classes.customCardContent}>
                          <Typography>
                            {this.props.errors.error}
                          </Typography>
                          <Row center="xs" className="default-margin">
                            <Col md={12} className={classes.customMargin}>
                              <TextField label={t('email')} id="email" fullWidth onChange={(ev) => {
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
                              </Col>
                              <Col md={12} className={classes.customMargin}>
                                <TextField label={t('password')} id="password" type="password" fullWidth onChange={this.handleChange} value={this.state.password}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton>
                                          <Lock/>
                                        </IconButton>
                                      </InputAdornment>
                                    )
                                  }}/>
                                </Col>
                          </Row>
                          <Row center="xs" className="default-margin">
                            <Col md={12} >
                              <FormGroup row>
                                <FormControlLabel
                                  control={
                                    <Checkbox onChange={console.log("Check")} />
                                  }
                                  label={t("remember_me")}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                            <Row center="xs" className="default-margin">
                              <Col md={6} >
                                <Button size="small" variant="contained" className={classes.btnGradient + " " + classes.buttonLogin} fullWidth
                                  disabled={!this.state.validForm} onClick={this.loginNormal}>
                                  {t('enter')}
                                </Button>
                              </Col>
                            </Row>
                            <Row center="xs" className="default-margin">
                              <Col md={6} className="default-margin-top">
                                <Link to={`${process.env.PUBLIC_URL}/registro`} className="default-link">{t("check_in")}</Link>
                              </Col>

                              <Col md={6} className="default-margin-top">
                                <Link to={`${process.env.PUBLIC_URL}/recuperar-contraseña`} className="default-link">{t("forgot_password")}</Link>
                              </Col>
                            </Row>
                          </CardContent>
                        </Card>
                  </Col>
              </Row>
              <FooterLogin/>
            </Grid>
        </React.Fragment>
      )
    }

    validateForm=()=>{
        this.setState({validForm:(this.auth.validateEmail(this.state.email) && this.state.password.trim() !== '')});
    }
}

const stateToProps      = ({errors,user}) => ({errors:errors.errors?errors.errors:{},user});
const conn = connect(stateToProps,null);

export default withStyles(loginStyle)(conn(translate("translations")(Login)));
