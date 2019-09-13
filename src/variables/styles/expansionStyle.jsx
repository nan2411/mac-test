// ##############################
// // // Expansion styles
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
  primaryGray,
  grayColor
} from "../../variables/styles";

const expansionStyle = theme => ({
    iconos: {
      width: '100%',
      height: '100%',
      // padding: '10px',
    },
    divIconosExpand:{
        width: '20px',
        height: '20px',
    },
    divIconos: {
      width: '50px',
      height: '50px',
      padding: '5px',
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
  divLesson:{
      display: 'flex',
  },
  cardDescriptionExpand:{
      fontSize: '.75rem',
      fontWeight: '550',
      color:grayColor
  },
  cardDescription:{
      fontSize: '1rem',
      fontWeight: '450',
  },
  div1:{
      margin:'0px 10px 15px 10px',
  },
  div2:{
       margin:'8px 0px',
  },
  link:{
      color:darkOrange,
      fontSize: '.6rem',
      fontWeight:'400',
      textDecoration: 'underline',
  },
  actionLesson:{
      color:grayColor,
      fontSize:'1rem',
  },
  expandLessIcon:{
      color: darkOrange,

  },
  divExpand:{
      textAlign:'rigth'
  },
  divIconExpand:{
      marginBottom: '-26px',
      marginTop: '-22px',
  },
  iconoLogroDiv:{
    color: darkOrange,
    textAlign: 'center',
    fontSize: '.6rem',
    fontWeight: '500',
    lineHeight: 'initial',
    marginTop: '10px'
    },
    iconoLogroDivInactive:{
      color: grayColor,
      textAlign: 'center',
      fontSize: '.6rem',
      fontWeight: '500',
      lineHeight: 'initial',
      marginTop: '10px'
      },
      iconosStart: {
        width: '15px',
        height: '15px',
        // padding: '10px',
      },
      iconosJuego:{
          width: '20x',
          height: '20px',
      },
      divStart:{
          lineHeight:'initial'
      }

});
export default expansionStyle;
