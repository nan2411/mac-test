// ##############################
// // // Slide Card Styles
// #############################

import {
  ligthOrange,
  darkOrange,
  primaryGradient
} from "../../variables/styles";

const slideCardStyle = theme => ({
  contentSlideCard:{
    height: "400px",
    width: "100%",
    position: "relative",
    overflowY: "auto"
  },
  bookImgContent:{
    textAlign : "center"
  },
  bookImg:{
    height : 40,
    width : 40
  },
  imgTextContent:{
    position: "relative",
    textAlign: "center"
  },
  textOver: {
    color : "white",
    position: "absolute",
    top: "46%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: 500
  },
  spaceActionButton:{
    textAlign : "right"
  },
  actionButton:{
    color : darkOrange
  }

});

export default slideCardStyle;
