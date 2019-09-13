// ##############################
// // // StatsCard styles
// #############################

import {
  card,
  cardHeader,
  defaultFont,
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardActions,
  grayColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  primaryColor,
  roseColor,
  darkOrange,
  primaryGray
} from "../../variables/styles";

const statsCardStyle = {
  card,
  cardHeader: {
    ...cardHeader,
    float: "left",
    textAlign: "center"
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardContent: {
    textAlign: "right",
    paddingTop: "10px",
    padding: "15px 20px"
  },
  cardIcon: {
    width: "40px",
    height: "36px",
    fill: "#fff"
  },
  cardAvatar: {
    margin: "8px"
  },
  cardCategory: {
    marginBottom: "0",
    color: grayColor,
    margin: "0 0 10px",
    ...defaultFont,
    //Custom
    textAlign : "left",
    fontSize : "9pt",
    fontWeight: "bolder",
    color: darkOrange
  },
  cardTitle: {
    margin: "0",
    ...defaultFont,
    fontSize: "1.625em"
  },
  cardTitleSmall: {
    fontSize: "65%",
    fontWeight: "400",
    lineHeight: "1",
    color: "#777"
  },
  cardActions: {
    ...cardActions,
    padding: "0!important",
  },
  nextAchivment:{
    margin:"0px",
    fontSize : "14pt",
    color : primaryGray,
    lineHeight: "inherit"
  },
  cardStats: {
    lineHeight: "22px",
    color: grayColor,
    fontSize: "12px",
    display: "inline-block",
    margin: "0!important"
  },
  cardStatsIcon: {
    position: "relative",
    top: "4px",
    width: "16px",
    height: "16px"
  },
  warningCardStatsIcon: {
    color: warningColor
  },
  primaryCardStatsIcon: {
    color: primaryColor
  },
  dangerCardStatsIcon: {
    color: dangerColor
  },
  successCardStatsIcon: {
    color: successColor
  },
  infoCardStatsIcon: {
    color: infoColor
  },
  roseCardStatsIcon: {
    color: roseColor
  },
  grayCardStatsIcon: {
    color: grayColor
  },
  cardStatsLink: {
    color: darkOrange,
    textDecoration: "none",
    ...defaultFont
  },
  imageHeader:{
    height: "auto",
    width: "100%",
    maxWidth: "43px",
    maxHeight: "43px"
  },
  numberContent:{
    position: "relative",
    height: "100%",
    width: "100%"
  },
  numberWrapper:{
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  numberCenter:{
    display: "table",
    width: "100%",
    height: "100%"
  },
  numberMiddle:{
    display: "table-cell",
    verticalAlign: "middle",
    paddingBottom: "15px",
    color: "white",
    fontWeight: "bold"
  }

};

export default statsCardStyle;
