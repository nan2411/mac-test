import React, {Component} from 'react';
import {Col, Row} from "react-flexbox-grid";
import {Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogContent, Grid, withStyles} from "@material-ui/core";
import DiaryPages from "./DiaryPages";
import {connect} from "react-redux";
import {getDiary, updateDiary} from "../../rdx/actions/diaryActions";
import ReactDOM from "react-dom";
import {translate} from "react-i18next";
//Helpers
import diaryStyles from "../../variables/styles/diaryStyles";

//Custom components
import MasterDiary from "./MasterDiary"
import UserDiary from "./UserDiary";

class Diary extends Component{
    constructor(){
        super();
        this.state      = {
          user:false, diary:false, showPages:false, openTitle: false, openContent:false,
          colHeight : "auto"
        };
        this.showPages  = this.showPages.bind(this);
        this.closePages = this.closePages.bind(this);
        this.handleCloseContent = this.handleCloseContent.bind(this);
        this.handleCloseTitle   = this.handleCloseTitle.bind(this);
    }

    componentDidMount(){
        window.addEventListener("resize", this.getSizeOfWindow, false);
        this.props.getDiary();
        this.getSizeOfWindow();
    }

    showPages(){
        this.setState({showPages:true});
    }

    closePages(){
        this.setState({showPages:false});
    }

    componentWillReceiveProps(props){
        if(props.diary){
            this.setState({diary:props.diary});
        }
    }

    componentWillUnmount(){
      window.removeEventListener('resize', this.getSizeOfWindow, false);
    }

    render(){
        let diary = this.state.diary;
        const {t, classes} = this.props;

        return (
          <React.Fragment>
            <Grid container style={{ height: this.state.colHeight, position: "relative" }}>
              <Grid item  className={classes.userWrapContent}>
                <UserDiary/>
              </Grid>
             {/* <Grid item sm={12} md={6} className={classes.backGroundMasterSection}>
                <div className={classes.backgoundMasterDiary}></div>
                <MasterDiary/>
              </Grid>*/}
            </Grid>
          </React.Fragment>
        );
    }

    renderDiary(){
      let diary = this.state.diary;
      const {classes,t} = this.props;
      return(
        <Row middle="xs" center="xs" style={{height: "70vh"}} className="center">
            <Col md={6} className="diary">
                {!this.state.showPages?
                    <Card >
                        <CardHeader
                            title={diary.name}
                            subheader={t('diary_of',{name:this.props.user.nickname})}
                            className={`diary-header ${this.state.openTitle?'disabled':''}`}
                            onClick={(ev) => this.showTitle(ev)}

                        />

                        <CardContent className={`diary-description ${this.state.openContent?'disabled':''}`} onClick={(ev) => this.showContent(ev)} >
                            {diary.description}
                        </CardContent>

                        <CardActions className="right-content">
                            <Button size="small" color="secondary" className="open-diary-button" onClick={this.showPages}>
                                {t('open')}
                            </Button>
                        </CardActions>

                        <Dialog onClose={this.handleCloseTitle} open={this.state.openTitle}  >
                            <DialogContent className="modal-page-content name">
                                <input type="text" id="input-diary-name"
                                       className="input-diary"
                                       style={{diplay:'none'}}
                                       value={diary.name}
                                       onChange={(ev) => this.handlePageChange(ev,'name')}/>
                            </DialogContent>
                        </Dialog>

                        <Dialog onClose={this.handleCloseContent} open={this.state.openContent} >
                            <DialogContent className="modal-page-content content">
                                <input type="text" id="input-diary-content"
                              className="input-diary diary-content"
                              style={{display:'none'}}
                              value={diary.description}
                              onChange={(ev) => this.handlePageChange(ev,'description')}/>
                            </DialogContent>

                        </Dialog>
                    </Card>
                    :<DiaryPages/>}

                {this.state.showPages?<Button color="secondary" onClick={this.closePages}>Diario</Button>:''}
            </Col>
        </Row>
      );
    }
    handlePageChange(ev,type = 'description'){
        if(ev.target.value.trim() !== ''){
            let diary = this.state.diary;
            diary[type] = ev.target.value;

            this.setState({diary});
        }
    }

    componentWillUnmount() {
        this.props.updateDiary(this.state.diary);
    }

    showTitle(ev){
        let target = ReactDOM.findDOMNode(ev.target).getBoundingClientRect();
        this.setState({ openTitle: true},()=>{

            setTimeout(() => {
                let content = document.querySelector('.modal-page-content.name');
                ['top','left','width','height'].forEach((value) => {
                    let height = value === 'height'?6:0;
                    let top = value === 'top'?-3:0;
                    content.style[value]       = `${target[value]+height+top}px`;
                });

                let input = document.querySelector('.input-diary');
                input.style['height'] = `${target['height']}px`;
                input.style.display   = 'block';
            },100);
        });
    }

    showContent(ev,key){
        let target = ReactDOM.findDOMNode(ev.target).getBoundingClientRect();

        this.setState({ openContent: true},()=>{

            setTimeout(() => {
                let content = document.querySelector('.modal-page-content.content');
                ['top','left','width'].forEach((value) => {
                    let top = value === 'top'?-5:0;

                    content.style[value]       = `${target[value]+top}px`;
                });
                let input = document.querySelector('.input-diary.diary-content');
                input.style['minHeight'] = `${target['height']}px`;
                input.style.display   = 'block';
            },100);
        });
    }

    handleCloseTitle(){
        this.setState({ openTitle: false});
    };

    handleCloseContent() {
        this.setState({ openContent: false});
    }

    getSizeOfWindow = ()=>{
      const headerSpace = 64;
      const footerSpace = 100;
      const paddingSapce = 41;
      setTimeout(
          function() {
            try{
              let height = window.innerHeight - (headerSpace + footerSpace + paddingSapce);
              this.setState({colHeight:  String(height) + "px"});
            }
            catch(err){console.error(err)}
          }
          .bind(this),
          300
      );
    }
}

const stateToProps      = ({user,diary}) => ({user,diary});
const dispatchToProps   = (dispatch)=>({//custom props
    getDiary: () => dispatch(getDiary()),
    updateDiary: (diary) => dispatch(updateDiary(diary)),
});

const conn = connect(stateToProps,dispatchToProps);

export default withStyles(diaryStyles)(conn(translate("translations")(Diary)));
