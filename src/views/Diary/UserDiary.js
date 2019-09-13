import React, {Component} from 'react';
import {connect} from "react-redux";
import { getDiary, updateDiary} from "../../rdx/actions/diaryActions";
import {translate} from "react-i18next";
import { Avatar, Typography,  withStyles, IconButton, Grid, TextField, Button} from "@material-ui/core";

import Redo from '@material-ui/icons/RedoRounded';
import Delete from '@material-ui/icons/DeleteRounded';
import Clear from '@material-ui/icons/ClearRounded';

import diaryStyles from "../../variables/styles/diaryStyles";
var dateFormat = require('dateformat');

class UserDiary extends Component{
  constructor(s){
    super();
    this.state ={
      oUser : {},
      newDiary:{text:''}
    }
    this.getDiary = this.getDiary.bind(this);
  }

  componentDidMount(){
      let oUserData = localStorage.getItem('user');
      oUserData = JSON.parse(oUserData);
      this.props.getDiary();
      this.setState({ oUser : oUserData });
  }

  render(){
    const { classes, t} = this.props;
    const { oUser, newDiary } = this.state;

    return(
      <React.Fragment>
        <Grid container>
            <Grid container item  xs={12} className={classes.diary} style={{width: '100vw'}}>
              <Avatar alt="User Avatar" className={classes.mediumAvatar} src={oUser.avatar}/>
              <div className={classes.avatarTitle}>
                <Typography variant="subtitle1" >
                  {oUser.name} {oUser.last_name}
                </Typography>
                <div>
                  <Typography variant="caption" align="left" >
                    <img src="./assets/images/icons/Mesa de trabajoICON4.png" height="10" style={{marginRight: 5}}/>  3
                    <img src="./assets/images/icons/Mesa de trabajoiCON.png" height="10" style={{marginRight: 5, marginLeft:15}}/>  8
                  </Typography>
                </div>
              </div>
              <TextField
                id="standard-multiline-static"
                label={t('sloganDaily')}
                multiline
                rows="5"
                value={newDiary.text}
                onChange={(e) => this.changeText(e)}
                margin="normal"
                className={classes.textField}
                />
              <div className={classes.buttonsSecction}>
                <IconButton className={classes.noPadding + " " + classes.actionButtonGral} onClick={(e) => this.InitText(e)}>
                  <Delete/>
                </IconButton>
                {/*<IconButton className={classes.noPadding + " " + classes.arrowButton + " " + classes.actionButtonGral}>
                  <Redo/>
                </IconButton>*/}
                <Button  variant="contained" onClick={() => this.updateDiary()}
                    className={classes.btnGradient} disabled={!(newDiary.text.length > 0 && newDiary.text.trim().length > 0)}>
                  {t('add')}
                </Button>
              </div>
            </Grid>
            <Grid container>
                { (this.props.diary)? this.getDiary() :'' }
            </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  updateDiary(){
        const { newDiary } = this.state;
        var numeric=JSON.parse(localStorage.getItem('idsCkeckNumber'));
        var ckeck=JSON.parse(localStorage.getItem('idsCkeck'));
        var drag=JSON.parse(localStorage.getItem('idsDrag'));

        let data = {
            name: newDiary.text,
            description:newDiary.text,
        }
        this.props.updateDiary(data);
    }

  InitText(){
      var { newDiary } = this.state;
      newDiary.text = '';
      this.setState({newDiary});
  }

  changeText(event){
      var { newDiary } = this.state;
      newDiary.text = event.currentTarget.value;
      this.setState({newDiary});
  }

  delete(id){
      // var {diaries} = this.state;
      // diaries[id].delete = true;
      // this.setState({diaries})
  }

  getDiary(){
      const { classes} = this.props;
      var diario = Array.isArray(this.props.diary.isArray) ? this.props.diary :
       [this.props.diary];
      var todo = []
      diario.forEach((item, id)=>{
          todo.push(
              <div className={classes.boxMassage} id={id}>
                <div className={classes.closeActionMessage}>
                  <IconButton className={classes.noPadding + " " + classes.actionButtonGral} onClick={() => this.delete(id)}>
                    <Clear/>
                  </IconButton>
                </div>
                <div className={classes.bodyMessage}>
                  <span>{item.description}</span>
                </div>
                <div className={classes.footerMessage}>
                  {/*<IconButton className={classes.noPadding + " " + classes.arrowGrayButton}>
                    <Redo/>
                  </IconButton>*/}
                  <span>{ dateFormat(item.created_at, "dd/mm/yyyy") }</span>
                </div>
              </div>
          )
      })
      return todo;
  }
}

const stateToProps = ({diary}) => ({diary});
const dispatchToProps = (dispatch)=>({
    getDiary: () => dispatch(getDiary()),
    updateDiary: (data) => dispatch(updateDiary(data)),
});

const conn = connect(stateToProps, dispatchToProps);

export default withStyles(diaryStyles)(conn(translate("translations")(UserDiary)));
