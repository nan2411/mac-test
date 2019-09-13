import React from "react";
import { withStyles, Grid, Typography,IconButton } from "@material-ui/core";
import {translate} from "react-i18next";
import ExpandLessRounded from '@material-ui/icons/ExpandLessRounded'

//Helpers
import slideCardStyle from "../../variables/styles/slideCardStyle";
const dommyArray = [
  {key : 3, value: "Entrenar el sentido de la gratitud."},
  {key : 4, value: "Entrégate a los demás."},
  {key : 5, value: "Etrenar el sentido de la aceptación."},
  {key : 6, value: "Entrena el sentido profundo."},
  {key : 7, value: "Entrenar el perdón."},
  {key : 8, value: "Cultivando las relaciones."},
  {key : 9, value: "Las prácticas de la mente y del cuerpo."},
  {key : 10, value: "Hábitos de grandeza"},
  {key : 11, value: "Hábitos de grandeza"},
  {key : 12, value: "Hábitos de grandeza"}
]
class SlideCard extends React.Component {
  constructor(){
    super();
  }

  componentDidUpdate(prevProps){
    console.log(this.props)
  }

  render(){
    const {t, classes} = this.props;
    console.log(dommyArray);
    return(
      <React.Fragment>
        <div className={classes.contentSlideCard}>

            {
              dommyArray.map((itemList, idx)=>{
                return (<React.Fragment>
                  <Grid container>
                <Grid item xs={3} key={idx} className={classes.bookImgContent}>
                  <div className={classes.imgTextContent}>
                    <span className={classes.textOver}>{itemList.key}</span>
                    <img src="./assets/images/icons/openBook.svg" className={classes.bookImg}/>
                  </div>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{itemList.value}</Typography>
                </Grid>
                </Grid>
                </React.Fragment>)
              })
            }

        </div>
        <div className={classes.spaceActionButton}>
          <IconButton className={classes.actionButton}>
            <ExpandLessRounded/>
          </IconButton>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(slideCardStyle)(translate("translations")(SlideCard));
