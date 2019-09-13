import React from "react";
import PropTypes from "prop-types";

import {
  withStyles,
  AppBar,
  Toolbar,
  //IconButton,
  //Hidden,
  //Button,
  //Typography,
  InputBase
} from "@material-ui/core";
import cx from "classnames";

import headerStyle from "../../variables/styles/headerStyle.jsx";

function HeaderLogin({ ...props }) {

  const { classes, color } = props;

  return (
    <AppBar position="absolute" color="white">
      <Toolbar className={classes.customHeight}>
        <img src="./assets/images/brandlogo.svg" className={classes.brandLogo}/>
        <div className={classes.grow} />

      </Toolbar>
    </AppBar>
  );
}

HeaderLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(HeaderLogin);
