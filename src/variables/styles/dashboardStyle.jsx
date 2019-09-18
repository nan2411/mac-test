// ##############################
// // // Dashboard styles
// #############################

import { successColor,warningColor, buttonMacTheme, primaryGray } from "../../variables/styles";

const dashboardStyle = {
  successText: {
    color: successColor
  },
    warningText: {
        color: warningColor
    },
  upArrowCardCategory: {
    width: 14,
    height: 14
  },
  //Custom
  spaceButton:{
    marginLeft: "15px"
  },
  spaceButtonRigth:{
    marginRight: "10px"
  },
  buttonMacTheme: buttonMacTheme,
  tittleSeccion:{
    color : primaryGray,
    fontSize : "14pt"
  },
  lastAchievement:{
    margin: "0px",
    fontSize: "14pt",
    color: "black",
    fontWeight: "400",
    lineHeight: "inherit"
    },
    circleProgressD:{
        margin:'5px',
        fontWeight: '600',
        width:'50px',
    },
    divProgressD:{
        margin: '0px 15px 0px 48px',
        display:'flex',
        justifyContent: 'space-between',
},
};

export default dashboardStyle;
