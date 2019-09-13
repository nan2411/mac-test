// ##############################
// // // Diary News styles
// #############################
import {
  backgroundYellowText, ligthOrange, darkOrange, boxYellow, primaryGradient, grayColor
} from "../../variables/styles";

const diaryStyles = theme => ({
  backGroundMasterSection:{
    padding : "15px",
    position : "relative",
    height: "100%",
    paddingLeft: "30px"
  },
  masterWrapContent :{
    position: "relative",
    height: "100%",
    paddingRight: "15px",
    overflowY: "auto"
  },
  userWrapContent:{
    height: "calc(100% + 25px)",
    position: "relative",
    overflowY: "auto",
    overflowX : "hidden"
  },
  mediumAvatar: {
    float: "left",
    width: 63,
    height: 63,
    border: `4px solid ${ligthOrange}`
  },
  avatarTitle:{
    display: "inline-block",
    paddingLeft: "25px"
  },
  dotState :{
    color : darkOrange,
    fontSize : "10px"
  },
  noPadding:{
    "padding":"0px"
  },
  messageMaster:{
    background: boxYellow + '!important'
  },
  footerMessage:{
    textAlign : "right",
    fontWeight: 600,
    marginTop: "10px",
    marginBottom: "10px"
  },
  arrowButton:{
    transform: "rotate(320deg)",
    color : darkOrange
  },
  arrowGrayButton:{
    transform: "rotate(320deg)",
    color : grayColor
  },
  actionButtonGral:{
    color : darkOrange,
    marginRight: "15px"
  },
  backgoundMasterDiary:{
    backgroundColor : backgroundYellowText,
    position: "absolute",
    zIndex: "-1",
    top: "-30px",
    bottom: "-100px",
    left: "10px",
    right: "-30px",
    height: "auto"
  },
  textField: {
    border: '1px solid #ccc',
    borderRadius: '10px',

    width: "100%",
  },
  buttonsSecction :{
    textAlign : "right",
    marginRight: "15px"
  },
  btnGradient : {
    color : "#fff",
    ...primaryGradient
  },
  boxMassage:{
    width:'100%',
    padding: "15px",
    margin: "15px",
    border: `1px solid #e0e0e0`,
    position: "relative",
    borderRadius:'10px',
    boxShadow: '0px 0px 9px #ccc'
  },
  closeActionMessage:{
    position: "absolute",
    right: "0px"
  },
  bodyMessage:{
    padding: "15px"
},
  diary:{
      borderRadius:'10px',
      margin: '15px',
      boxShadow: '0px 0px 9px #ccc',
      padding: '20px',
  }
});

export default diaryStyles;
