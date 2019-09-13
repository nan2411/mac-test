import React from "react";
import {
  withStyles,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Link
} from "@material-ui/core";
import PropTypes from "prop-types";

import ProgressBar from '../ProgressBar/ProgressBar';
import statsCardStyle from "../../variables/styles/statsCardStyle";

function StatsCard({ ...props }) {
  const {
    classes,
    title,
    subtitle,
    description,
    statLink,
    small,
    statText,
    statIconColor,
    iconColor,
    percentAchivment,
    titleAchivment
  } = props;
  return (
    <Card className={classes.card+' '+props.className} style={props.style}>
      <CardHeader
        classes={{
          root: classes.cardHeader + " " + classes[iconColor + "CardHeader"],
          avatar: classes.cardAvatar
        }}
        avatar={
          (props.whitImage === true)?drawImageIcon(props, classes)
          :<props.icon className={classes.cardIcon} />
        }
      />
      <CardContent className={classes.cardContent}>
        <Typography component="small" className={classes.cardCategory}>
          {title}
        </Typography>
        <Typography
          variant="headline"
          component="h2"
          className={classes.cardTitle}
        >
          {description}{" "}
          {small !== undefined ? (
            <small className={classes.cardTitleSmall}>{small}</small>
          ) : null}
        </Typography>
        <Grid container>
          <Grid item xs={7}>
            <Typography component="p" className={classes.cardCategory}>
              {titleAchivment}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <ProgressBar percent={percentAchivment}/>
          </Grid>
          {/*<Grid item xs={12}>
            <Typography component="h4" className={classes.cardCategory}>
              subtitle
            </Typography>
          </Grid>*/}
        </Grid>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.cardActionsContent}>
          <h4 className={classes.nextAchivment}>Entrenar el sentidor de la felicidad porque es bueno</h4>
          <div style={{textAlign : "right"}}>
            <Link
                className={classes.cardStatsLink}
                component="button"
                variant="body2"
                onClick={() => {
                  props.handleButton2({"event":"ok"});
                }}
              >
                Ver más
            </Link>
          </div>
        </div>

      </CardActions>
    </Card>
  );
}

function drawImageIcon(props,classes){
  return(
    <div className={classes.numberContent}>
      <div className={classes.numberWrapper}>
        <div className={classes.numberCenter}>
          <div className={classes.numberMiddle} style={props.styleCountCustom}>
            <span>{props.count}</span>
          </div>
        </div>
      </div>
      <img src={'./assets/images/icons/'+ props.imageName } className={classes.imageHeader} />
    </div>
  )
}

StatsCard.defaultProps = {
  iconColor: "white",
  statIconColor: "gray"
};

StatsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  //icon: PropTypes.func.isRequired,
  //iconColor: PropTypes.oneOf(["orange", "green", "red", "blue", "purple"]),
  title: PropTypes.node,
  description: PropTypes.node,
  small: PropTypes.node,
  statIcon: PropTypes.func.isRequired,
  statIconColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  statLink: PropTypes.object,
  statText: PropTypes.node
};

export default withStyles(statsCardStyle)(StatsCard);
