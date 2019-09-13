import React, {Component} from 'react';
import {translate} from "react-i18next";
import { Avatar, Typography,  withStyles, IconButton} from "@material-ui/core";
//Helpers
import diaryStyles from "../../variables/styles/diaryStyles";
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';

import Redo from '@material-ui/icons/RedoRounded';

class MasterDiary extends Component{
  constructor(){
    super();
  }

  render(){
    const {t, classes} = this.props;
    return(
      <React.Fragment>
        <div className={classes.masterWrapContent}>
          <Avatar alt="User Avatar" className={classes.mediumAvatar} src="https://tress.com.mx/portals/0/Images/Comunidad%20GTI/Cercania/2018/2018foto02.jpg?ver=2018-08-20-000447-450"/>
          <div className={classes.avatarTitle}>
            <Typography variant="subtitle1" >
              McNeely Kruopensky
            </Typography>
            <div>
              <Typography variant="caption" >
                <IconButton className={classes.noPadding}>
                  <FiberManualRecord className={classes.dotState}/>
                </IconButton> {t("available")}
              </Typography>
            </div>
          </div>
          {/* Message content*/}
          <div>
            <div className="message received">
              <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor suscipit arcu nec congue. Quisque convallis mattis odio, ac vestibulum quam rutrum ut. Vivamus diam dui, placerat ut elit nec, facilisis volutpat erat. Etiam facilisis aliquet arcu. Phasellus pellentesque velit orci, at pulvinar lorem fringilla vitae. Etiam accumsan posuere magna. Pellentesque quis venenatis lacus. Ut eu elementum turpis.</span>
              <div className={classes.footerMessage}>
                <IconButton className={classes.noPadding + " " + classes.arrowButton}>
                  <Redo/>
                </IconButton>
                <span> 11/nov/18</span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(diaryStyles)(translate("translations")(MasterDiary));
