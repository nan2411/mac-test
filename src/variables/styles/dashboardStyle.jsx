// ##############################
// // // Dashboard styles
// #############################

import { successColor,warningColor, buttonMacTheme, primaryGray, orangeText } from "../../variables/styles";

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
        fontWeight: '600',
        width:'50px',
        display: 'table-cell',
    },
    divProgressD:{
        margin: '0px 25px 0px 60px',
        display:'flex',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    divSeparador:{
        borderTop: '6px solid',
        borderColor: orangeText,
        width: '5%',
        display: 'table-cell',
        marginTop:'-1px',
        marginLeft:'-1px'
    }
};

export default dashboardStyle;
