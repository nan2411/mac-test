import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import {store} from './rdx/store';
import {Provider} from "react-redux";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import {Login,Register,PasswordRecover,ChangePassword,NotFound} from "./components";

import indexRoutes from "./routes/index.jsx";

import "./assets/css/material-dashboard-react.css";
import {ToastContainer} from "react-toastify";
import {I18nextProvider} from "react-i18next";

import i18n from "./languages/";
import {
  darkOrange,
  ligthOrange,
  darkYellow,
  ligthYellow,
  primaryGradient,
  defaultFont} from "./variables/styles";

const muiTheme = createMuiTheme({
  typography:{
    ...defaultFont
  },
  overrides: {
    MuiFormLabel:{
      focused:{
        color: ligthOrange +" !important"
      }
    },
    MuiInput :{
      underline:{
        '&::after':{
          borderBottom :"2px solid "+darkOrange+" !important"
        }
      }
    },
    MuiCheckbox :{
      checked :{
        color : darkOrange+" !important"
      }
    },
    MuiLinearProgress:{
      colorSecondary :{
        backgroundColor : darkOrange
      },
      barColorSecondary:{
        backgroundColor : ligthOrange
      }
    }
  }
});

const hist = createBrowserHistory();
const Root = () => (
    <Router history={hist}>
      <MuiThemeProvider theme={muiTheme}>
        <div>
            <Switch>
                <Route exact path={`${process.env.PUBLIC_URL}/`} component={Login}/>
                <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login}/>
                <Route exact path={`${process.env.PUBLIC_URL}/registro`} component={Register}/>
                <Route exact path={`${process.env.PUBLIC_URL}/recuperar-contraseña`} component={PasswordRecover}/>
                <Route exact path={`${process.env.PUBLIC_URL}/cambiar-contraseña`} component={ChangePassword}/>

                {indexRoutes.map((prop, key) => {
                    return <Route path={`${process.env.PUBLIC_URL+prop.path}`} component={prop.component} key={key} />;
                })}

                <Route path="/*" status={404} component={NotFound}/>
            </Switch>
            <ToastContainer autoClose={3000} />
        </div>
      </MuiThemeProvider>
    </Router>);

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
    <Provider store={store}>
        <Root />
    </Provider></I18nextProvider>, document.getElementById('root'));

registerServiceWorker();
