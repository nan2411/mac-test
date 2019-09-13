import React from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import { List, ListItem, withStyles } from "@material-ui/core";

import footerStyle from "../../variables/styles/footerStyle";

function FooterLogin({ ...props }) {
  const { classes, t } = props;
  return (
    <footer className={classes.footer +" " + classes.footerDisplay}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={classes.block}>
                {t("privacy_policy")}
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()} {t('footer_msg')}
           , made by Visionaria Games
          </span>
        </p>
      </div>
    </footer>
  );
}

FooterLogin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(translate("translations")(FooterLogin));
