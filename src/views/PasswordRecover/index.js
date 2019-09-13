import React,{Component} from 'react';
import {Col, Grid, Row} from "react-flexbox-grid";
import {
    Button, Card, CardContent, CardHeader, FormControl, FormHelperText, Input, InputLabel, Hidden, withStyles, IconButton
} from "@material-ui/core";
import Clear from '@material-ui/icons/Clear';
import {Link} from "react-router-dom";
import Toast from "../../core/helpers/Toast";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { darkOrange } from "../../variables/styles";

//Helpers
import loginStyle from "../../variables/styles/loginStyle";
import AuthHelper from '../../core/helpers/AuthHelper';

//Custom Componentes
import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import FooterLogin from '../../components/Footer/FooterLogin';

const muiTheme = createMuiTheme({
  overrides: {
    MuiIconButton:{
      label:{
        color: darkOrange +" !important"
      }
    }
  }
});

class PasswordRecover extends Component{
    background = `url(${process.env.PUBLIC_URL+'/assets/images/Fondo.login.svg'}) no-repeat bottom`;
    constructor(){
        super();
        this.state = {email:'',formValid:false};
        document.body.style.background = "linear-gradient(180deg, #ffa726, #fb8c00)";
        this.sendRecover = this.sendRecover.bind(this);
    }

    componentDidMount(){
        if(Object.keys(this.props.user).length !== 0 ){
            Toast("Ya tienes una sesion activa",'error');
            this.props.history.push('home');
        }

        this.validForm(this.state);
        this.auth = new AuthHelper();
    }

    handleEmail(e){
        if(e.target.value.trim().length > 0){
            this.setState({email:e.target.value},()=>{
                this.validForm(this.state);
            });
        }
    }

    validForm(state){
        if(state.email.trim().length > 0 && this.auth.validateEmail(state.email)){
            this.setState({formValid:true});
        }
    }

    sendRecover(){
        this.auth.sendRecoverPassMail(this.state.email).then(response=>{
            Toast("Te hemos enviado un correo de recuperacion!");
            this.props.history.push('/login');
        });
    }

    componentWillReceiveProps(props){
        if(props.errors.error){
            Toast(props.errors.error,'error');
        }
    }
    render(){
      const { classes, t} = this.props;
        return (
          <React.Fragment>
            <Hidden only={['xs', 'sm']}>
              <HeaderLogin> </HeaderLogin>
            </Hidden>
            <Grid fluid style={{ background : this.background }}>
              <Row middle="xs" center="xs" style={{height: "100vh"}} className="center">
                <Col md={3}>
                  <Card>
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
                        title: classes.titleRegister
                      }}
                      title={t("passwordRecovery")}
                      />

                    <CardContent>
                      <Row>
                        <Col md={12}>
                          <FormControl fullWidth aria-describedby="email-error-text" error={this.props.errors.email?true:false}>
                            <InputLabel htmlFor="email">Correo</InputLabel>
                            <Input id="email" value={this.state.email} onChange={(ev) => {
                                this.handleEmail(ev)
                              }} />
                              <FormHelperText id="email-error-text">{this.props.errors.email}</FormHelperText>
                            </FormControl>
                          </Col>

                          <Col md={12} className="big-margin-top">
                            <Button color="secondary" variant="contained" fullWidth
                              disabled={!this.state.formValid} onClick={this.sendRecover} className={classes.btnGradient + " " + classes.buttonLogin}>
                              {t("send_email")}
                            </Button>
                          </Col>
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
}

const stateToProps      = ({user,errors}) => ({user,errors:errors.errors?errors.errors:{}});

const conn = connect(stateToProps,null);

export default withStyles(loginStyle)(conn(translate("translations")(PasswordRecover)));
