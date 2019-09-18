import React from "react";
import PropTypes from "prop-types";
import { Menu } from "@material-ui/icons";
import SearchIcon from '@material-ui/icons/Search';
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Button,
  Typography,
  InputBase
} from "@material-ui/core";
import cx from "classnames";
import {Link} from "react-router-dom";
import headerStyle from "../../variables/styles/headerStyle.jsx";

import HeaderLinks from "./HeaderLinks";

function replaceAll(target,search,replace){
    return target.replace(new RegExp(search, 'g'), replace);
}

function Header({ ...props }) {



  function makeBrand() {

      let found = props.routes.map((prop, key) => {
          let fullPath = process.env.PUBLIC_URL+prop.path;
          let pathName = props.location.pathname.replace(/\/\s*$/, "")
          let location = pathName.split('/').filter(function(e){return e});
          let path     = fullPath.split('/').filter(function(e){return e});
          if (fullPath === pathName) {
                return prop.navbarName;
          } else if(location.length === path.length){

                if(fullPath.indexOf('/:')>-1){
                    let matches = 0;
                    let params  = 0;
                    let title   = '';

                    path.forEach((value,idx)=>{
                      if(value.indexOf(':') > -1){
                        let text = replaceAll(location[idx],'-',' ');
                        text = text.charAt(0).toUpperCase() + text.slice(1);
                        title = text;

                        params++;
                      }else if(value === location[idx])
                      {
                        matches++;
                      }
                    });

                    if(matches+params === path.length){
                        return title;
                    }
                }
          }
      return null;
    });
    return found.filter(function(n){ return n != null })[0];
  }

  const { classes, color } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });

  return (
    <AppBar position="static" color="white">
      <Toolbar>
        {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
          <MenuIcon />
        </IconButton>*/}
        <Button className={classes.buttonImage} component={Link} to={process.env.PUBLIC_URL + '/'}>
          <img src="./assets/images/brandlogo.svg" className={classes.brandLogo}/>
        </Button>

        <div className={classes.grow} />
        {/*<div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Buscar…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>*/}
        <div>
          <a className={classes.socialLinks}><img src="./assets/images/icons/twitter.svg" width="22" height="22"/></a>
          <a className={classes.socialLinks}><img src="./assets/images/icons/facebook.svg" width="22" height="22"/></a>
          <a className={classes.socialLinks}><img src="./assets/images/icons/instagram.svg" width="22" height="22"/></a>
        </div>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
