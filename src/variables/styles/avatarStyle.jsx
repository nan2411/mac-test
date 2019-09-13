// ##############################
// // // Avatar styles
// #############################
import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont,
  primaryColor,
  primaryBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  ligthOrange,
  darkOrange,
  primaryGradient,
  primaryGray
} from "../../variables/styles";

const avatarStyle = theme => ({
  bigAvatar: {
    margin: "auto",
    width: 135,
    height: 135,
    border: `4px solid ${ligthOrange}`,
    marginBottom: "15px"
  },
  subtitle2:{
    fontSize: "10pt",
    color: primaryGray
  },
  emailtext:{
    textTransform : "lowercase"
  },
  subtitle1:{
    fontSize: "12pt",
    fontWeight :"bold"
  },
  accionButton:{
    color:darkOrange
  },
  accionButtonD:{
    color:primaryGray
  },
  iconAccion:{
    "fontSize":"18px",
    "color" : darkOrange
  },
  noPadding:{
    "padding":"0px"
  }
});

export default avatarStyle;
