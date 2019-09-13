// ##############################
// // // Daily News styles
// #############################
import {
  boxShadow,
  defaultFont,
  grayBoxShadow,
  ligthOrange,
  darkOrange,
  primaryGradient,
  primaryGray,
  backgroundYellowText
} from "../../variables/styles";

const dailyNewsStyles = theme => ({
  mediumAvatar: {
    margin: "auto",
    width: 63,
    height: 63,
    border: `4px solid ${ligthOrange}`/*,
    marginBottom: "15px"*/
  },
  bodyText:{
    backgroundColor : backgroundYellowText,
    margin: 5,
    padding: 10
  },
  accionButton:{
    color:darkOrange
  },
  primaryBoxShadow : grayBoxShadow,
  bodyComponent : {
    border : `1px solid #e0e0e0`,
    padding: "10px",
    ...defaultFont
  },
  dotState :{
    color : darkOrange,
    fontSize : "10px"
  },
  noPadding:{
    "padding":"0px"
  }
});

export default dailyNewsStyles;
