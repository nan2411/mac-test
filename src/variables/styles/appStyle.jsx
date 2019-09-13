// ##############################
// // // App styles
// #############################

import { drawerWidth, transition, container } from "./../../variables/styles.jsx";
const sidebarWidth = 73;
const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${sidebarWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: 'touch'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginTop: "0px",
    padding: "30px 15px",
    minHeight: "calc(100% - 123px)"
  },
  container,
  map: {
    marginTop: "70px"
  }
});

export default appStyle;
