import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link, NavLink} from "react-router-dom";
import cx from "classnames";
import classNames from 'classnames';
import {
  withStyles,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,Avatar, Typography
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Notifications from '@material-ui/icons/Notifications';
import Info from '@material-ui/icons/Info';

import { HeaderLinks } from "./../../components";

import sidebarStyle from "../../variables/styles/sidebarStyle.jsx";
import {translate} from "react-i18next";
import AuthHelper from "../../core/helpers/AuthHelper";

const muiTheme = createMuiTheme({
  overrides: {
    MuiListItem:{
      root:{
        height: "80px"
      }
    },
    MuiBadge:{
      badge:{
        backgroundColor : "#FACB5F"
      }
    }
  }
});

class Sidebar extends React.Component {
  // verifies if routeName is the one active (in browser input)
  state = {
    open: false,
    openMenu : false,
    anchorEl: null,
    currentTab : null,
    oUser : {}
  };

  constructor(){
    super();
  }

  componentDidMount(){
      let oUserData = localStorage.getItem('user');
      oUserData = JSON.parse(oUserData);
      this.setState({ oUser : oUserData});
  }

  render(){
    const { classes, color, logo, image, logoText, routes,theme } = this.props;
    return (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >

          <div className={classes.sidebarWrapper}>
            <HeaderLinks />
            {this.renderLinksMovile()}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
           </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
            open={this.state.open}
          >
            {(this.state.open)?this.renderProfileAvatar():""}

            <div className={classes.sidebarWrapper}>{ this.renderLinks() }</div>
            {image !== undefined ? (
              <div
                className={this.returnBackGroudClass(this.state.open,classes)}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }

  renderBrand(){
    const { classes, color, logo, image, logoText, routes } = this.props;
    return(
      <div className={classes.logo}>
        <Link to={{pathname:`${process.env.PUBLIC_URL}/perfil/`}} className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          {logoText}
        </Link>
      </div>
    )
  }

  renderProfileAvatar(){
    const { classes, color, logo, image, logoText, routes } = this.props;
    const { oUser } = this.state;
    return(
      <div className={classes.logo}>
        <Grid container spacing={0} justify="center" alignItems="center">

          <Grid item xs={6} sm={6}>
            <img src="./assets/images/icons/minibrand.svg" className={classes.brandLogo}/>
          </Grid>
          <Grid item xs={6} sm={6} align="right" className={classes.iconRight}>
              <ChevronLeft style={{width: 35,height: 35}} onClick={()=>this.toogleMenu()}/>
          </Grid>

          <Grid item xs={12}>
            <Avatar alt="User Avatar" src={oUser.avatar} className={classes.bigAvatar} />
              <Typography variant="subtitle2" align="center"  style={{marginTop: "15px"}}>
                  {oUser.name} {oUser.last_name}
              </Typography>
          </Grid>
          <Grid item xs={6} sm={6} style={{paddingRight: "10px"}}>
            <Typography variant="caption" align="right" >
                <img src="./assets/images/icons/Mesa de trabajoICON4.png" height="10" style={{marginRight: 5}}/>  3
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} style={{paddingLeft: "10px"}}>
            <Typography variant="caption" align="left">
              <img src="./assets/images/icons/Mesa de trabajoiCON.png" height="10" style={{marginRight: 5}}/>  8
            </Typography>
          </Grid>
        </Grid>
      </div>

    )
  }

  renderIconsBar(){
    //Close session and Notifications
    const { classes, t } = this.props;

    return(
      <React.Fragment>
        <MuiThemeProvider theme={muiTheme}>
        {/*<ListItem button className={classes.itemLink + classes.onlyIcons} onClick={()=> console.log("Debe cerrar sesión")} title={ t('notifications')}>
          <ListItemIcon className={ this.returnItemIconClass(this.state.open,classes) }>
            <Badge badgeContent={4} invisible={false}>
                 <Notifications />
            </Badge>
          </ListItemIcon>
          {(this.state.open)?<ListItemText
            primary={t('notifications')}
            className={this.returnItemTextClass(this.state.open, classes)}
            disableTypography={true}
          />:""}
        </ListItem>*/}
        <ListItem button className={classes.itemLink + classes.onlyIcons} onClick={this.handleMenu} title={ t('logout') }>
          <ListItemIcon className={this.returnItemIconClass(this.state.open,classes) }>
            <PowerSettingsNew/>
          </ListItemIcon>
          {(this.state.open)?<ListItemText
            primary={ t('logout') }
            className={this.returnItemTextClass(this.state.open, classes)}
            disableTypography={true}
          />:""}
        </ListItem>
        <Menu id="logout" anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} onClose={this.handleCloseMenu}>
          <MenuItem onClick={this.logout}>{t('logout')}</MenuItem>
        </Menu>

        {/*}<ListItem button className={classes.itemLink + classes.onlyIcons} onClick={this.handleMenu} title={ t('tutorial') }>
          <ListItemIcon className={this.returnItemIconClass(this.state.open,classes) }>
            <Info/>
          </ListItemIcon>
          {(this.state.open)?<ListItemText
            primary={ t('tutorial') }
            className={this.returnItemTextClass(this.state.open, classes)}
            disableTypography={true}
          />:""}
        </ListItem>*/}
        </MuiThemeProvider>
      </React.Fragment>
    )
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleCloseMenu = () => {
        this.setState({ anchorEl: null });
  };

  renderLinks(){

    const { classes, color, routes } = this.props;
    return(

      <List className={classes.list}>
        {(!this.state.open)?this.renderHamburgerIcon():""}
        {routes.map((prop, key) => {
          this.checkActiveItem(prop, key);
          if (prop.redirect) return null;
          if (prop.visible === false) return null;

          const listItemClasses = cx({
            [" " + classes[color]]: this.activeRoute(prop.path)
          });
          const whiteFontClasses = cx({
            [" " + classes.whiteFont]: this.activeRoute(prop.path)
          });

          return (
            <NavLink

              to={process.env.PUBLIC_URL+prop.path}
              className={classes.item}
              activeClassName={"active activeCustom " + whiteFontClasses}
              key={key}
            >
              <MuiThemeProvider theme={muiTheme}>
                <ListItem button className={classes.itemLink+ classes.onlyIcons + listItemClasses } isActive={this.oddEvent} title={prop.sidebarName}>
                  <ListItemIcon className={this.returnItemIconClass(this.state.open,classes, key) + whiteFontClasses}>
                    <prop.icon />
                  </ListItemIcon>
                  {(this.state.open)?<ListItemText
                    primary={prop.sidebarName}
                    className={this.returnItemTextClass(this.state.open, classes,key, true)}
                    disableTypography={true}
                  />:""}


                </ListItem>
              </MuiThemeProvider>
            </NavLink>
          );
        })}
        {this.renderIconsBar()}
      </List>
    )
  }

  checkActiveItem(prop,index){
    if(prop.path === window.location.pathname){
      if(this.state.currentTab !== index){
        this.setState({currentTab : index});
      }
    }
  }

  renderLinksMovile(){
    const { classes, color, logo, image, logoText, routes } = this.props;
    return(

      <List className={classes.list}>

        {routes.map((prop, key) => {
          if (prop.redirect) return null;
          if (prop.visible === false) return null;

          const listItemClasses = cx({
            [" " + classes[color]]: this.activeRoute(prop.path)
          });
          const whiteFontClasses = cx({
            [" " + classes.whiteFont]: this.activeRoute(prop.path)
          });
          return (
            <NavLink
              to={process.env.PUBLIC_URL+prop.path}
              className={classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLinkMovile+ listItemClasses } title={prop.sidebarName}>
                <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={prop.sidebarName}
                  className={classes.itemText + whiteFontClasses}
                  disableTypography={true}
                />

              </ListItem>
            </NavLink>
          );
        })}
      </List>
    )
  }
  oddEvent(match, location){
     if (!match) {
       return false
     }
     const eventID = parseInt(match.params.eventID)
     let r = !isNaN(eventID) && eventID % 2 === 1
     return r;
   }
  renderHamburgerIcon(){
    const { classes } = this.props;
    return(
      <MuiThemeProvider theme={muiTheme}>
      <ListItem button className={classes.itemLink + classes.onlyIcons} onClick={()=>this.toogleMenu()}>
        <ListItemIcon className={this.returnItemIconClass(this.state.open,classes) }>
          <MenuIcon />
        </ListItemIcon>
      </ListItem>
    </MuiThemeProvider>
    )
  }

  returnBackGroudClass(isOpen, classes){
    let classBackGroud = classes.background;
    if(isOpen) classBackGroud += " " + classes.backgroundOpen;
    return classBackGroud;
  }

  returnItemTextClass(isOpen, classes, itemKey, whitWhite = null){
    let classItem = classes.itemText;
    if(isOpen){
      console.log(this.state.currentTab)
      if(itemKey === this.state.currentTab){
        if(whitWhite) classItem += " " + classes.whiteFontClasses;
      }
      else{
        classItem += " " + classes.itemTextLigthTheme;

      }
      /*if(whitWhite) classItem += " " + classes.whiteFontClasses;
      else classItem += " " + classes.itemTextLigthTheme;*/
    }
    return classItem;
  }

  returnItemIconClass(isOpen, classes, key){
    let classItem = classes.itemIcon;
    if(isOpen){
      if(this.state.currentTab !== key) classItem += " " + classes.itemIconLigthTheme;
    }
    return classItem;
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }

  toogleMenu=()=> {
    this.props.stateEvt(!this.state.open);
    this.setState({open : !this.state.open});
  }

  logout=()=>{
    let auth = new AuthHelper();
    auth.logout();
    window.location.href = process.env.PUBLIC_URL+'/login';
  }

};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(translate("translations")(Sidebar));
