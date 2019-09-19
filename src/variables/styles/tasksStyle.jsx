// ##############################
// // // Tasks styles
// #############################

import { defaultFont, primaryColor, dangerColor, darkOrange, orangeText, grayColor } from "../../variables/styles";

const tasksStyle = {
  table: {
    marginBottom: "0"
  },
  tableRow: {
    position: "relative",
    borderBottom: "1px solid #dddddd"
  },
  tableActions: {
    display: "flex",
    border: "none",
    padding: "12px 8px !important",
    verticalAlign: "middle"
  },
  tableCell: {
    ...defaultFont,
    padding: "8px",
    verticalAlign: "middle",
    border: "none",
    lineHeight: "1.42857143",
    fontSize: "14px"
  },
  tableActionButton: {
    width: "27px",
    height: "27px"
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px"
  },
  edit: {
    backgroundColor: "transparent",
    color: primaryColor,
    boxShadow: "none"
  },
  close: {
    backgroundColor: "transparent",
    color: dangerColor,
    boxShadow: "none"
  },
  checked: {
    color: primaryColor
  },
  checkedIcon: {
    width: "20px",
    height: "20px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px"
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "10px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px"
  },
  tooltip: {
    padding: "10px 15px",
    minWidth: "130px",
    color: "#555555",
    lineHeight: "1.7em",
    background: "#FFFFFF",
    border: "none",
    borderRadius: "3px",
    boxShadow:
      "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)",
    maxWidth: "200px",
    textAlign: "center",
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "400",
    textShadow: "none",
    textTransform: "none",
    letterSpacing: "normal",
    wordBreak: "normal",
    wordSpacing: "normal",
    wordWrap: "normal",
    whiteSpace: "normal",
    lineBreak: "auto"
  },
  //Custom
  lessonTittle:{
    fontSize : "9pt",
    color : darkOrange,
    fontWeight : "bold"
  },
  lockIconWrapper:{
    position: "absolute",
    width : "100%",
    height : "5%",
    zIndex : 1,
    textAlign : "center"
  },
  lockIconMiddle:{
    position: "relative",
    paddingTop: "35px",
    paddingBottom : "35px",
    display: "table",
    height: "100%",
    width: "100%",
  },
  lockIconImage:{
    height: "75%",
    display: "table-cell",
    margin: "auto"
  },
  accionLinksSeccion:{
    width: "100%",
    textAlign: "right"
  },
  accionLinksButtons:{
    marginLeft : "5px"
  },
  title:{
    color: darkOrange,
    marginTop: "0px",
    marginBottom: "20px",
    textTransform: "uppercase",
    paddingLeft: '20px',
    fontWeight:'600'
},
    iconos:{
        width:'20px',
        height:'20px'
    },
    textLesson:{
        padding: '10px',
        border: '1px solid #ccc',
        display: 'flex',
    },
    lessonName:{
        width:'60%',
        margin:'0px 10px',
        color:orangeText,
        fontSize: '1.2rem',
        fontWeight: '500'
    },
    lessonNameInactive:{
        width:'60%',
        margin:'0px 10px',
        color:grayColor,
        fontSize: '1.2rem',
        fontWeight: '500'
    },
    iconBig:{
        width:'50px',
        height:'50px'
    },
    textLessonCenter:{
        textAlign: 'center',
        padding: '10px',
        border: '1px solid #ccc',

    },
    titleTextLesson:{
        color:orangeText,
        fontSize: '.6rem',
        fontWeight: 'bold',
    },
    divTwo:{
        display: 'flex',
        margin:'10px 0px',
    },
    video:{
        width:'100%',
        height:'40vh',
    },
    titleLesson:{
        color:orangeText,
        fontSize: '1.3rem',
        fontWeight: '600',
    },
    nameLesson:{
        fontSize: '1.3rem',
        fontWeight: '500',
    },
    lessonTitleBoxO:{
        padding: '10px',
        display: 'flex',
    },
    lessonTitleBox:{
        margin:'0px 10px',
        padding: '10px',
        display: 'flex',

    },
    textLessonObjetivo:{
        marginTop:'10px',
        padding: '10px',
        border: '1px solid #ccc',
        boxShadow: '0px 0px 9px #ccc',
    },
    objetivoLesson:{
        color:orangeText,
        fontSize: '1rem',
        fontWeight: '600',
    },
    caja:{
        padding: '0px 20px 20px 20px',
    },
    gameFrame:{
        width:'100% !important',
        height:'40vh !important',
    },
    circleProgress:{
        margin:'5px',
        fontWeight: '600',
        width:'60px',
    },
    divProgress:{
        display:'flex',
        justifyContent: 'space-between',
    },
    paper:{
        background:'#ffffff',
        width: '50%',
        padding:'35px',
    },
    modal:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    divQuestion:{
        display:'flex',
        marginBottom:'15px'
    },
    FormControlRadio:{
        display:'flex',
    },
    title:{
        textAlign: 'center',
        color:orangeText,
    },
    boton:{
        textAlign: 'center',
        backgroundColor:orangeText,
        color:'#FFFFFF',
        border:'none',
        padding: '10px',
        width: '100px',
        fontSize:'16px',
    },
    botonI:{
        textAlign: 'center',
        backgroundColor:grayColor,
        color:'#FFFFFF',
        border:'none',
        padding: '10px',
        width: '100px',
        fontSize:'16px',
    },
    radio:{
        color:orangeText,
    },
    titleQuestion:{
        fontWeight:'500',
        margin:'0px',
    },
    divScroll:{
        overflow: 'auto',
        height: '65vh'
    },
    divSeparadorL:{
        borderTop: '6px solid',
        borderColor: orangeText,
        width: '5%',
        display: 'table-cell',
        marginTop:'-1px',
        marginLeft:'-1px'
    },
    circleProgressDL:{
        fontWeight: '600',
        width:'50px',
        display: 'table-cell',
    },
    divProgressDL:{
        margin: '0px',
        display:'flex',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    divCirculos:{
        margin:'15px 0px'
    }

};
export default tasksStyle;
