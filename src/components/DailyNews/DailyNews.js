
import dailyNewsStyles from "../../variables/styles/dailyNewsStyles";
import React, { Component } from 'react';
import {
  withStyles,
  Hidden,
  Grid,Avatar, Typography, Link, IconButton
} from "@material-ui/core";
import {translate} from "react-i18next";
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Courses from '../../views/Courses/index.js';

class DailyNews extends Component {

  render(){
    const { classes, t } = this.props;
    return(
      <React.Fragment>
        <Grid container spacing={0} justify="center" alignItems="center" className={classes.bodyComponent}>
          <Grid item xs={12}>
            <Avatar alt="User Avatar" className={classes.mediumAvatar} src="https://tress.com.mx/portals/0/Images/Comunidad%20GTI/Cercania/2018/2018foto02.jpg?ver=2018-08-20-000447-450"/>
            <Typography variant="subtitle1" align="center">
              McNeely Kruopensky
            </Typography>
            <div>
              <Typography variant="caption" style={{textAlign:"center"}}>
                <IconButton className={classes.noPadding}>
                  <FiberManualRecord className={classes.dotState}/>
                </IconButton> {t("available")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.bodyText}>
              <Typography variant="body1" style={{textAlign:"justify"}}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
              </Typography>
              <Typography variant="subtitle1" align="right">
                {t('tody')}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} align="right">
            <Link
                className={classes.accionButton}
                variant="body2"
                to={`${process.env.PUBLIC_URL}/cursos`}
              >
                {t('show_more')}
            </Link>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}
export default withStyles(dailyNewsStyles)(translate("translations")(DailyNews));
