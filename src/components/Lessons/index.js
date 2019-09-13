import React,{Component} from 'react';
import {
    Paper,
    Button,
    Divider, ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary, Icon, Tooltip,
    Typography, withStyles,
} from "@material-ui/core";
import {Col, Row} from "react-flexbox-grid";
import tasksStyle from "../../variables/styles/tasksStyle";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loading from "./../../components/Loading";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getLessons} from "./../../rdx/actions/coursesActions";

class Lessons extends Component{
    constructor(){
        super();

        this.getLessons = this.getLessons.bind(this);
        this.state      = {
            lessons:false,
            videoURL:''
        };
    }
    componentDidMount(){
        this.props.getLessons(this.props.course.id);
        this.getLessons();
    }
    componentWillReceiveProps(props){
        if(this.state.lessons.length <= 0 || this.props.course.id !== props.course.id){
            this.getLessons(props.lessons);
        }
    }

    getLessons(lessons){
        const {classes} = this.props;
        let less = [];
        let icon = '';
        let iconCheck = <img src='/assets/images/icons/check.svg' class={classes.iconos}/>;
        if(lessons){
            lessons.forEach((lesson,idx) => {
                if (lesson.type_name != 'video'){
                    icon = <img src='/assets/images/icons/video.svg' class={classes.iconos}/>
                } else if (lesson.type_name == 'test'){
                    icon = <img src='/assets/images/icons/test.svg' class={classes.iconos}/>
                }else if (lesson.type_name == 'todo'){
                    icon = <img src='/assets/images/icons/manzana-y-libros.svg' class={classes.iconos}/>
                }else if (lesson.type_name == 'game'){
                    icon = <img src='/assets/images/icons/game.svg' class={classes.iconos}/>
                }
                if (lesson.viewed){
                    iconCheck = <img src='/assets/images/icons/checkO.svg' class={classes.iconos}/>;
                }

                less.push(
                    <Col xs={12} className={classes.textLesson}>
                        {iconCheck}<Typography className={!lesson.viewed ? classes.lessonName : classes.lessonNameInactive}>{lesson.name}</Typography>{icon}
                    </Col>
                );
            });
        }

        this.setState({lessons:less});
    }

    render(){
        const {classes, course} = this.props;
        console.log(this.props)

        return (
            !this.props.lessons ?
            <Loading/>:
            <Row>
                <Col xs={12} className={classes.lessonTitleBox}>
                    <Typography className={classes.titleLesson}>LECCIÓN {course.id}: </Typography>
                    <Typography className={classes.nameLesson}>{course.name}</Typography>
                </Col>

                <Col xs={8}>
                    <video className={classes.video} controls controlsList="nodownload"
                        src="http://tecnologiasgrupoluan.com/revueltastimes2/revueltas/public/uploads/videos/012b9ecacf897f3447d604ffb165203d.mp4">
                        Your browser does not support the video tag.
                    </video>
                    <Col xs={12}>
                     1-2-3-4-5-6-7-8-9-10
                    </Col>
                    <Col xs={12} className={classes.textLessonObjetivo}>
                        <Col xs={12} className={classes.lessonTitleBoxO}>
                            <Typography className={classes.objetivoLesson}>Objetivo: </Typography>
                        </Col>
                        <Col xs={12} >
                        {course.description}
                        </Col>
                    </Col>
                </Col>
                <Col xs={4}>
                    {this.state.lessons}
                    {this.getLogros()}
                </Col>
            </Row>
        )
    }
    getLogros(){
        const {classes} = this.props;
        return(
            <Col xs={12} className={classes.textLessonCenter}>
                <Col xs={12} className={classes.divTwo}>
                    <Col xs={6}>
                        <img src="/assets/images/icons/trophy.svg" className={classes.iconBig}/>
                    </Col>
                    <Col xs={6}>
                        <img src="/assets/images/icons/flag.svg" className={classes.iconBig}/>
                    </Col>
                </Col>
                <Col xs={12} className={classes.divTwo}>
                    <Col xs={6}>
                        <Typography className={classes.titleTextLesson}>Logro de la lección</Typography>
                        <Typography>Sentido</Typography>
                    </Col>
                    <Col xs={6}>
                        <Typography className={classes.titleTextLesson}>¿Cómo obtenerlo?</Typography>
                        <Typography>Completando la lección</Typography>
                    </Col>
                </Col>
                <Col xs={12} className={classes.divTwo}>
                    <Col xs={6}>
                        <Typography className={classes.titleTextLesson}>Actividad de la lección</Typography>
                        <Typography>Entrenar el sentido de la gratitud</Typography>
                    </Col>
                    <Col xs={6}>
                        <Typography className={classes.titleTextLesson}>Instrucciones</Typography>
                        <Typography>Completando las actividades de la lección</Typography>
                    </Col>
                </Col>
            </Col>

        )
    }
}

const stateToProps      = ({lessons}) => ({lessons});
const dispatchToProps   = (dispatch)=>({
    getLessons: (course)    => dispatch(getLessons(course)),
});

const conn = connect(stateToProps,dispatchToProps);


export default withStyles(tasksStyle)(conn(Lessons));
