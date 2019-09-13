import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute";
import Achievement from "../../components/Achievement";
import Error from "../../components/Error";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "@material-ui/core";
import Profile from '../../views/Profile';
import Course from '../../views/Course';
import Lesson from '../../views/Lesson';
import {Header, Footer, Sidebar} from "../../components";
import appRoutes from "./../../routes/app.jsx";

import appStyle from "./../../variables/styles/appStyle.jsx";

import {connect} from "react-redux";
import {translate} from "react-i18next";
import LangHelper from "../../core/helpers/LangHelper";

class App extends React.Component {

  constructor(){
      super();
      let oUser = localStorage.getItem("user");
      if(oUser) JSON.parse(oUser);
      else oUser = { };
      this.state = {
          mobileOpen: false,
          oUserData : oUser,
          classSideBar : "orange"
      };

      this.lang = new LangHelper();
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    return this.props.location.pathname !== "/maps";
  }

  componentDidMount() {
      if(navigator.platform.indexOf('Win') > -1){
      // eslint-disable-next-line
        const ps = new PerfectScrollbar(this.refs.mainPanel);
      }
      document.body.style.background = 'white';
      document.body.style.backgroundSize= 'cover';
  }

  componentDidUpdate() {
    this.refs.mainPanel.scrollTop = 0;
  }

  stateSidebar = (state) =>{
    if(state) this.setState({classSideBar : "orangeGradient"});
    else this.setState({classSideBar : "orange"});
  }

  render() {
    const { classes,t, ...rest } = this.props;
    const trns = this.lang.menuTranslate(t);

    const switchRoutes = (
          <Switch>
              <PrivateRoute path={`${process.env.PUBLIC_URL}/perfil`} component={Profile}/>
              <Route exact path={`${process.env.PUBLIC_URL}/curso/:course/leccion/:lesson`} component={Lesson}/>
              <Route exact path={`${process.env.PUBLIC_URL}/curso/:slug`} component={Course}/>

              {appRoutes(trns).map((prop, key) => {
                  if (prop.redirect)
                      return <Redirect from={prop.path} to={prop.to} key={key} />;
                  return <PrivateRoute path={`${process.env.PUBLIC_URL+prop.path}`} component={prop.component} key={key} />;
              })}

          </Switch>
      );

    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={appRoutes(trns)}
          logoText={this.state.oUserData.nickname}
          logo={this.state.oUserData.avatar}
          image=""
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          stateEvt={this.stateSidebar}
          color={this.state.classSideBar}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={appRoutes(trns)}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
            {
                /*this.props.errors.type === 'message'?
                    <Error visible={this.props.errors.error?true:false} message={this.props.errors.errors.error}/>
                    :''*/
            }

            {
                /*this.props.achievement !== false?
                    <Achievement achievement={this.props.achievement}/>
                    :''*/
            }

        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const stateToProps      = ({}) => ({});
const dispatchToProps   = (dispatch)=>({

});

const conn = connect(stateToProps,dispatchToProps);

export default withStyles(appStyle)(conn(translate("translations")(App)));
