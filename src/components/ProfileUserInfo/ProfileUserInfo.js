import React, { Component } from 'react';
import {
  withStyles,
  Hidden,
  Grid,Avatar, Typography, Link, IconButton,
  TextField,
} from "@material-ui/core";
import Clear from '@material-ui/icons/Clear';

//Helpers
import avatarStyle from "../../variables/styles/avatarStyle";
import { connect } from "react-redux";
import { updateUser } from "../../rdx/actions/UserActions";
import { translate } from "react-i18next";


class ProfileUserInfo extends Component {

  constructor(){
    super();
    this.state ={
      modeEdit : false,
      oUser : {},
      user : {},
      complete: true
    }
  }

  componentDidMount(){
      let oUserData = localStorage.getItem('user');
      oUserData = JSON.parse(oUserData);
      let user = {
          nickname: oUserData.nickname,
          name: oUserData.name,
          last_name: oUserData.last_name,
          email: oUserData.email,
          mobile_device: oUserData.mobile_device,
      }
      this.setState({ oUser : oUserData, user : user});
  }

  render(){
    const { classes, t } = this.props;
    const { oUser } = this.state;

    return(
      <React.Fragment>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={12}>
            { this.renderAccionButton() }
            { this.renderViewPerfil() }
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  updateUser(){
        const { user } = this.state;
        console.log('updateUser')
        //this.props.updateUser(user);
    }

  renderAccionButton(){
    const { classes, t } = this.props;
    return(
      <React.Fragment>
        {
          (!this.state.modeEdit)?
          <Grid item xs={12} align="center">
            <Link
                component="button"
                variant="body2"
                className={classes.accionButton}
                onClick={() => {
                  this.setState({modeEdit : !this.state.modeEdit})
                }}
              >
              <img src="./assets/images/icons/settings.svg" width="12" height="13"/> {t('edit')}
            </Link>
          </Grid>
          : this.renderAccionsButtons()
        }
      </React.Fragment>
    )
  }

  renderAccionsButtons(){
    const { classes, t } = this.props;
    return(
      <Grid container>
        <Grid item xs={6} align="center">
          <Link
              disabled={!this.state.complete}
              component="button"
              variant="body2"
              className={this.state.complete ? classes.accionButton : classes.accionButtonD }
              onClick={() => this.updateUser()}
            >
            <img src={this.state.complete ? "./assets/images/icons/save.svg" : "./assets/images/icons/saveG.svg" } width="12" height="13"/> {t('save')}
          </Link>
        </Grid>

        <Grid item xs={6} align="center">
          <Link
              component="button"
              variant="body2"
              className={classes.accionButton}
              onClick={() => {
                this.setState({modeEdit : !this.state.modeEdit})
              }}
            >
            <IconButton className={classes.noPadding}>
              <Clear className={classes.iconAccion}/>
            </IconButton> {t('cancel')}
          </Link>
        </Grid>
      </Grid>
    )
  }

  handleChange(event){
      let { user } = this.state;
      let complete = true;
      if (event.currentTarget.id == 'user_name'){
          user.name = event.currentTarget.value;
          if(user.name == null || user.name.trim() == ''){
              complete=false;
          }
      }
      if (event.currentTarget.id == 'user_last_name'){
          user.last_name = event.currentTarget.value;
          if(user.last_name == null || user.last_name.trim() == ''){
              complete=false;
          }
      }
      if (event.currentTarget.id == 'user_email'){
          user.email = event.currentTarget.value;
          if(user.email == null || user.email.trim() == ''){
              complete=false;
          }
          if(!(/.+@.+\.[A-Za-z]+$/.test(user.email))){
              complete=false;
          }
      }
      if (event.currentTarget.id == 'user_mobile_device'){
          user.mobile_device = event.currentTarget.value;
          if(user.mobile_device == null || user.mobile_device.trim() == ''){
              complete=false;
          }
      }

      this.setState({user, complete})
  }

  renderViewPerfil(){
      const { classes, t } = this.props;
      let { oUser } = this.state;
      return(
          (!this.state.modeEdit) ?
          <div>
              <Avatar alt="User Avatar" src={oUser.avatar} className={classes.bigAvatar}/>

              <Typography variant="subtitle2" align="center" className={classes.subtitle2}>
                  {t('user_name')}
              </Typography>

              <Typography variant="subtitle1" align="center" className={classes.subtitle1}>
                  {oUser.name} {oUser.last_name}
              </Typography>

              <Typography variant="subtitle2" align="center" className={classes.subtitle2}>
                  {t('email')}
              </Typography>
              <Typography variant="subtitle1" align="center" className={classes.subtitle1 + " " + classes.emailtext}>
                  {oUser.email}
              </Typography>

              <Typography variant="subtitle2" align="center" className={classes.subtitle2}>
                  {t('mobil_phone')}
              </Typography>
              <Typography variant="subtitle1" align="center" className={classes.subtitle1}>
                  {oUser.mobile_device || '+5512345678'}
              </Typography>
          </div>
          :
          <div style={{margin:'0px 25px'}}>
              <Avatar alt="User Avatar" src={oUser.avatar} className={classes.bigAvatar}/>
              <TextField
                required
                id="user_name"
                label={t('user_name')}
                defaultValue={this.state.oUser.name}
                onChange={(ev) => {this.handleChange(ev)}}
                className={classes.textField}
                margin="normal"
                fullWidth
              />
              <TextField
                required
                id="user_last_name"
                label={t('user_last_name')}
                defaultValue={oUser.last_name}
                onChange={(ev) => {this.handleChange(ev)}}
                className={classes.textField}
                margin="normal"
                fullWidth
              />
              <TextField
                required
                id="user_email"
                type="email"
                label={t('email')}
                defaultValue={oUser.email}
                onChange={(ev) => {this.handleChange(ev)}}
                className={classes.textField}
                margin="normal"
                fullWidth
              />
              <TextField
                required
                id="user_mobile_device"
                label={t('mobil_phone')}
                defaultValue={oUser.mobile_device || '+5512345678'}
                onChange={(ev) => {this.handleChange(ev)}}
                className={classes.textField}
                margin="normal"
                fullWidth
              />
          </div>
      )
  }

}

const dispatchToProps = (dispatch)=>({
    updateUser: (data) => dispatch(updateUser(data))
});
const conn = connect(dispatchToProps);

export default withStyles(avatarStyle)(conn(translate("translations")(ProfileUserInfo)));
