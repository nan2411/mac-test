import React, {Component} from 'react';
import {Col, Row} from "react-flexbox-grid";
import {
    Button, Card, CardActions, CardContent, CardMedia, Icon, LinearProgress, Tooltip,
    Typography, withStyles, Grow
} from "@material-ui/core";
import tasksStyle from '../../variables/styles/tasksStyle.jsx';

import Loading from "../../components/Loading/index";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getCourses, setCourse, setLesson, setLessons} from "../../rdx/actions/coursesActions";
import {translate} from "react-i18next";

class Courses extends Component{
    constructor(){
        super();
        this.state = {
          dinamicHeight : 0
        };
        this.getCourses = this.getCourses.bind(this);
    }

    componentDidMount(){
        window.addEventListener("resize", this.getWidthOfImage, false);
        this.props.getCourses();
        this.props.setCourse(false);
        this.props.setLessons(false);
        this.props.setLesson(false);
        this.getWidthOfImage();
    }

    componentWillUnmount(){
      window.removeEventListener('resize', this.getWidthOfImage, false);
    }

    getCourses(){
        let courses = [];
        const { classes,t } = this.props;

        this.props.courses.forEach((course,idx)=>{
            console.log(course)
            course.image='http://localhost:3000/assets/images/slider1.png';
            if(idx == 0){
                course.locked=false;
            }
            courses.push(

                <Col lg={3} md={3} xs={3} between='xs' key={idx} sm={12} className={classes.caja}>
                {
                    course.locked ?
                    this.obtainCurso(idx, course)
                    :
                    <Link disabled="true" to={{pathname:`${process.env.PUBLIC_URL}/curso/${course.slug}`,params:course}}>
                        {this.obtainCurso(idx, course)}
                    </Link>

                }
                </Col>
            );
        });

        return courses;
    }

    obtainCurso(idx, course){
        const { classes,t } = this.props;
        return(
            <Grow in={true} style={{ transformOrigin: '0 0 0', boxShadow: '0px 0px 9px #ccc'}}
                  {...({ timeout: 1000+(idx*200) })}>
                <Card className="achievement-card">
                    {/*course.is_free &&
                    <Tooltip title={t('free_course')+"!!"} placement="top"  classes={{tooltip:classes.tooltip}}>
                        <Icon className="big-icon is-free-image">card_giftcard</Icon>
                    </Tooltip>*/}

                    {/*course.viewed && <Tooltip title={t('viewed')} placement="top"  classes={{tooltip:classes.tooltip}}>
                        <Icon className="big-icon viewed-image">done_all</Icon>
                    </Tooltip>*/}


                      <div className={classes.lockIconWrapper} style={{height : this.state.dinamicHeight}}>
                        <div className={classes.lockIconMiddle}>
                            {(course.locked)?
                                <img src="./assets/images/icons/lock.svg" className={classes.lockIconImage}/>
                                :
                                <img src="./assets/images/icons/play.svg" className={classes.lockIconImage}/>
                            }
                        </div>
                      </div>

                    <CardMedia
                        image={course.image}
                        title={course.name}
                        className={`achievement-card-image ${course.locked?'image-disabled':''}`} />
                    <LinearProgress color="secondary" variant="determinate" value={(parseInt(course.advance,10)/parseInt(course.lessons,10))*100} />
                    <CardContent>

                    <Typography variant="headline" component="h5" style={{fontSize:'1rem', fontWeight: 'bold'}}>
                      <span className={classes.lessonTittle}> {t('lesson')} {idx + 1 }: </span>{course.name}{course.locked}
                      </Typography>
                      <Typography className="courses-description" component="p">
                          {course.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                        {/*<Button component={Link} to={{pathname:`${process.env.PUBLIC_URL}/curso/${course.slug}`,params:course}}  color="secondary" disabled={!course.locked?true:false}>{t('lessons')}</Button>*/}

                        <div className={classes.accionLinksSeccion}>
                          <a onClick={console.log('descarga')} className={classes.accionLinksButtons} href={course.locked ? null : true}>
                            <img src="./assets/images/icons/audio.svg" width="22" height="22"/>
                          </a>
                         {/*<a className={classes.accionLinksButtons}>
                            <img src="./assets/images/icons/downloadAudio.svg" width="22" height="22"/>
                          </a>*/}
                        </div>
                    </CardActions>
                </Card>
            </Grow>
        )
    }

    render(){
        const { classes,t } = this.props;
        return (
          <React.Fragment>
            <h3 className={classes.title}>{t('lessons')}</h3>
            {(this.props.courses)?
            <Row>
              {this.getCourses()}
            </Row>:<Loading/>}
          </React.Fragment>
        );
    }

    getWidthOfImage = ()=>{
      setTimeout(()=>{
        try{
          let elements = document.getElementsByClassName("achievement-card-image");
          let el = elements.item(0);
          let heightEl = el.clientHeight;
          this.setState({dinamicHeight: heightEl});
        }
        catch(err){
          console.error(err)
        }

      },350);
    }
}

const stateToProps      = ({courses}) => ({courses});
const dispatchToProps   = (dispatch)=>({//custom props
    getCourses: () => dispatch(getCourses()),
    setCourse: (value) => dispatch(setCourse(value)),
    setLessons: (value) => dispatch(setLessons(value)),
    setLesson: (value) => dispatch(setLesson(value)),
});

const conn = connect(stateToProps,dispatchToProps);

export default withStyles(tasksStyle)(conn(translate("translations")(Courses)));
