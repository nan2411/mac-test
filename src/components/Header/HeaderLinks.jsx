import React from "react";
import classNames from "classnames";
import { Manager, Reference, Popper } from "react-popper";
import {
    withStyles,
    IconButton,
    MenuList,
    Grow,
    Paper,
    ClickAwayListener,
    Hidden, ListItem, Avatar, ListItemText, Icon, Button, MenuItem, Menu
} from "@material-ui/core";
import { Notifications} from "@material-ui/icons";


import headerLinksStyle from "../../variables/styles/headerLinksStyle";
import {connect} from "react-redux";
import {allNotifications, getNotifications, viewNotification} from "../../rdx/actions/UserActions";
import {Link, withRouter} from "react-router-dom";
import {AccountCircle} from "mdi-material-ui";
import AuthHelper from "../../core/helpers/AuthHelper";
import {translate} from "react-i18next";

class HeaderLinks extends React.Component {
  state = {
    open: false,
    anchorEl:null
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = (notification = false) => {
    this.setState({ open: false });
    if(notification){
        this.props.viewNotification(notification.id);

        if(notification.typeName === 'achievement'){
            this.props.history.push(process.env.PUBLIC_URL+'/logros');
        }
    }
 };

  checkAll(){
      this.props.allNotifications();
  }

  componentDidMount(){
    this.props.getNotifications();
  }

  render() {
    const { classes,t } = this.props;
    const { open } = this.state;
    const openProfile = Boolean(this.state.anchorEl);

    return (
      <div>
        <Manager style={{ display: "inline-block" }}>
          <Reference>
            {({ ref }) => (
              <IconButton
                color="inherit"
                aria-label="Notifications"
                aria-owns={open ? "menu-list" : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                className={classes.buttonLink}
                >
                <Notifications className={classes.links} />
                <span className={classes.notifications}>{this.props.notifications.length > 0?this.props.notifications.filter((val)=> !val.viewed).length:0}</span>
                <Hidden mdUp>
                  <p onClick={this.handleClick} className={classes.linkText}>
                    Notification
                  </p>
                </Hidden>
              </IconButton>
            )}
          </Reference>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperResponsive
            }
          >
            {({ ref, style, placement, arrowProps }) => (
              <ClickAwayListener onClickAway={()=>this.handleClose()}>
                <Grow
                  in={open}
                  id="menu-list"
                  style={{ transformOrigin: "0 0 0" }}
                  >
                  <Paper className={classes.dropdown}>
                    <Button fullWidth color="secondary" className="view-all-btn" onClick={()=>this.checkAll()}>{t('mark_all_as_viewed')}</Button>

                    <MenuList role="menu">
                      {this.props.notifications.length > 0 && this.props.notifications.map((val,idx)=>{
                        return <ListItem onClick={()=>this.handleClose(val)} key={idx} className={!val.viewed?'new-notification':''} >
                          <Avatar>
                            {val.typeName === 'achievement' && <Icon>grade</Icon>}
                            {val.typeName === 'alert' && <Icon>notifications</Icon>}
                            {val.typeName === 'info' && <Icon>info_outline</Icon>}
                          </Avatar>
                          <ListItemText  primary={val.title} secondary={val.body} />
                        </ListItem>

                      })}

                    </MenuList>
                  </Paper>
                </Grow>
              </ClickAwayListener>
            )}
          </Popper>
        </Manager>

          <div style={{display:'inline-block'}}>
              <IconButton
                  aria-owns={openProfile ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                  aria-label={t('profile')}
                  className={classes.buttonLink}
              >
                  <AccountCircle className={classes.links}/>
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  open={openProfile}
                  onClose={this.handleCloseMenu}
              >
                  <MenuItem component={Link} to={`${process.env.PUBLIC_URL}/perfil`} >{t('profile')}</MenuItem>
                  <MenuItem onClick={()=>this.logout()}>{t('logout')}</MenuItem>
              </Menu>
          </div>

      </div>
    );
  }

  logout(){
    let auth = new AuthHelper();
    auth.logout();
      window.location.href = process.env.PUBLIC_URL+'/login';
  }

  handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
  };
  handleCloseMenu = () => {
        this.setState({ anchorEl: null });
  };
}

const stateToProps      = ({notifications}) => ({notifications});
const dispatchToProps   = (dispatch)=>({//custom props
    getNotifications: () => dispatch(getNotifications()),
    viewNotification: (notification) => dispatch(viewNotification(notification)),
    allNotifications: () => dispatch(allNotifications()),
});

const conn = connect(stateToProps,dispatchToProps);

export default withStyles(headerLinksStyle)(withRouter(conn(translate("translations")(HeaderLinks))));
