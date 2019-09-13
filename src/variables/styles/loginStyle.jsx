// ##############################
// // // Login styles
// #############################
import {
  darkOrange,
  ligthOrange,
  darkYellow,
  ligthYellow,
  primaryGradient,} from "../../variables/styles";

const loginStyle = theme => ({
  buttonLogin : {
    color : "#fff"
  },
  titleLogin :{
    padding : "25pt",
    paddingBottom: "0px",
    color: darkOrange,
    [theme.breakpoints.down("xs")]: {
          padding: " 14pt !important",
          paddingBottom: "0px"
    },
    [theme.breakpoints.down("sm")]: {
          padding: " 18pt !important",
          paddingBottom: "0px"
    },
    [theme.breakpoints.down("md")]: {
          padding: " 20pt !important",
          paddingBottom: "0px"
    },
  },
  titleRegister :{
    paddingTop : "0pt",
    //padding : "25pt",
    paddingBottom: "0px",
    color: darkOrange,
    [theme.breakpoints.down("xs")]: {
          paddingTop : "0pt",
          //padding: " 14pt !important",
          paddingBottom: "0px"
    },
    [theme.breakpoints.down("sm")]: {
          paddingTop : "0pt",
          //padding: " 18pt !important",
          paddingBottom: "0px"
    },
    [theme.breakpoints.down("md")]: {
          paddingTop : "0pt",
          //padding: " 20pt !important",
          paddingBottom: "0px"
    },
  },
  loginContent:{
    display: "block",
    position: "absolute",
    top: "79px",
    bottom: "0px",
    left: "0px",
    right: "0px"
  },
  customCardContent:{
    paddingBottom: "50px!important",
    [theme.breakpoints.down("xs")]: {
      paddingBottom: "0px!important"
    },
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "0px!important",
    }
  },
  customMargin:{
    margin: "25px",
    [theme.breakpoints.down("xs")]: {
      margin: "0px"
    },
    [theme.breakpoints.down("sm")]: {
      margin: "10px"
    }
  },
  btnGradient : primaryGradient
});

export default loginStyle;
