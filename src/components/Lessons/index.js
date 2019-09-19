import React,{Component} from 'react';
import {
    Paper, Button, Radio,
    Divider, ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails,
    ExpansionPanelSummary, Icon, Tooltip, RadioGroup, FormControlLabel,
    Typography, withStyles, Modal, Fade, Backdrop, FormControl, FormLabel,
} from "@material-ui/core";
import {Col, Row} from "react-flexbox-grid";
import tasksStyle from "../../variables/styles/tasksStyle";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loading from "./../../components/Loading";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getLessons} from "./../../rdx/actions/coursesActions";
import CircularProgress from "./../../components/ProgressBar/CircularProgressbar";
import { orangeText } from "../../variables/styles";
import flag from '../../assets/images/icons/flag.svg'
import trophy from '../../assets/images/icons/trophy.svg'
import check from '../../assets/images/icons/check.svg'
import checkO from '../../assets/images/icons/checkO.svg'
import video from '../../assets/images/icons/video.svg'
import test from '../../assets/images/icons/test.svg'
import testG from '../../assets/images/icons/testG.svg'
import manzanas from '../../assets/images/icons/manzana-y-libros.svg'
import manzanasG from '../../assets/images/icons/manzana-y-librosG.svg'
import game from '../../assets/images/icons/game.svg'
import gameG from '../../assets/images/icons/gameG.svg'



class Lessons extends Component{
    constructor(){
        super();

        this.getLessons = this.getLessons.bind(this);
        this.state      = {
            lessons:false,
            videoURL:'',
            view:true,
            pre:false,
            content:'',
            name:'',
            open:false,
            complete:false,
        };
        this.percentage = [
            { value: 80, text:1 },
            { value: 50, text:2 },
            { value: 100, text:3 },
            { value: 20, text:4 },
            { value: 90, text:5 },
            { value: 30, text:6 },
            { value: 40, text:7 },
            { value: 15, text:8 },
            { value: 75, text:9 },
            { value: 65, text:10 },
        ]
        this.cuestionario={
            title:'Antes de comenzar, responde este breve cuestionario',
            questions:[
                {
                    question:'¿Eres feliz?',
                    options:['Si', 'No'],
                },{
                    question:'Del 1 al 10 que tan feliz te consideras',
                    options:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                },{
                    question:'¿Qué tanta importancia le das a tu felicidad?',
                    options:['Mucha', 'Poca', 'Nada'],
                },{
                    question:'¿Qué tan dispuesta estás para ser feliz?',
                    options:['Mucho', 'Poca', 'Nada'],
                },{
                    question:'¿Te gustaría ser feliz?',
                    options:['Si', 'No'],
                }
            ]
        }
    }
    componentDidMount(){
        this.props.getLessons(this.props.course.id);
        this.getLessons();
        let link = localStorage.getItem('linkGame');
        console.log('linkGame '+ link)
        console.log('linkGame '+ link.length)

        let view = true;
        let content = '';
        if(link && link != 'null' && link != 'false'){
             view = false;
             content = localStorage.getItem('linkGameUrl');
        }
        localStorage.setItem('linkGameUrl', null);
        localStorage.setItem('linkGame', false)
        this.setState({view, content})
    }
    componentWillReceiveProps(props){
        if(this.state.lessons.length <= 0 || this.props.course.id !== props.course.id){
            this.getLessons(props.lessons);
        }
    }

    handleClick(item){
        let view = 'true';
        let content = '';
        let name = '';
        if (item.type_name == 'video'){
            view = true;
            content = '';
            name = '';

        } else if (item.type_name == 'test'){

        }else if (item.type_name == 'todo'){

        }else if (item.type_name == 'game'){
            view = false;
            content = item.content;
            name = item.name;
        }
        this.setState({view, content, name})
    }

    getLessons(lessons){
        const {classes} = this.props;
        const { pre } = this.state;

        let less = [];
        let icon = '';
        let iconCheck = <img src={check} class={classes.iconos}/>;
        if(lessons){
            lessons.forEach((lesson,idx) => {
                if(lesson.view){
                    iconCheck = <img src={checkO} class={classes.iconos}/>;
                }else{
                    iconCheck = <img src={check} class={classes.iconos}/>;
                }
                if (pre){
                    if (lesson.type_name != 'video'){
                        icon = <img src={video} class={classes.iconos}/>
                        iconCheck = <img src={checkO} class={classes.iconos}/>;
                    } else if (lesson.type_name == 'test'){
                        icon = <img src={test} class={classes.iconos}/>
                    }else if (lesson.type_name == 'todo'){
                        icon = <img src={manzanas} class={classes.iconos}/>
                    }else if (lesson.type_name == 'game'){
                        icon = <img src={game} class={classes.iconos}/>
                    }
                }else{
                    let iconCheck = <img src={check} class={classes.iconos}/>;
                    if (lesson.type_name != 'video'){
                        icon = <img src={video} class={classes.iconos}/>
                        iconCheck = <img src={checkO} class={classes.iconos}/>;
                    } else if (lesson.type_name == 'test'){
                        icon = <img src={test} class={classes.iconos}/>
                    }else if (lesson.type_name == 'todo'){
                        icon = <img src={manzanasG} class={classes.iconos}/>
                    }else if (lesson.type_name == 'game'){
                        icon = <img src={gameG} class={classes.iconos}/>
                    }
                }
                less.push(
                    <Col xs={12} className={classes.textLesson} onClick={ () => this.handleClick(lesson)}>
                        {iconCheck}<Typography className={pre ? classes.lessonName : classes.lessonNameInactive}>{lesson.name}</Typography>{icon}
                    </Col>
                );
            });
        }

        this.setState({lessons:less});
    }
    close(){
        var video = document.getElementById('video');
        setTimeout(function(){
            var video = document.getElementById('video');
            video.play();}, 1000);
        this.setState({open:false, pre:true});
    }

    video(){
        const { pre } = this.state;
        if(!pre){
            setTimeout(function(){
                var video = document.getElementById('video');
                video.pause();}, 1000);
            this.setState({open:true});
        }else{
        }
    }

    check(idQ, idO){
        this.cuestionario.questions[idQ].answer = idO;
        this.validate();
    }

    validate(){
        var complete=true;
        this.cuestionario.questions.map((item)=>{
            if(!item.answer){
                complete=false
            }
        })
        this.setState({complete})
    }
    render(){
        const { classes, course } = this.props;
        const { view, content, name, open, complete } = this.state;
        let cuestionario = this.cuestionario;
        let divs=[];
        this.percentage.map((item, id) =>{
            divs.push(
                <div className={classes.circleProgressDL}>
                    <CircularProgress percent={item.value} text={id+1}/>
                </div>
            )
            if(id != 9){
                divs.push(
                    <hr className={classes.divSeparadorL}/>

                )
            }
        })

        return (
            !this.props.lessons ?
            <Loading/>:
            <Row>
                <Col xs={12} className={classes.lessonTitleBox}>
                    <Typography className={classes.titleLesson}>LECCIÓN {course.id}: </Typography>
                    <Typography className={classes.nameLesson}>{course.name}</Typography>
                </Col>

                <Col xs={8}>
                     {view ?
                        <video id='video' onClick={() => this.video()} className={classes.video} controls controlsList="nodownload"
                            src="http://tecnologiasgrupoluan.com/revueltastimes2/revueltas/public/uploads/videos/012b9ecacf897f3447d604ffb165203d.mp4">
                            Your browser does not support the video tag.
                        </video>
                        :
                        <iframe src={content} className={classes.gameFrame} title={name}>Game content</iframe>
                    }
                    <Col xs={12} className={classes.divCirculos}>
                        <div className={classes.divProgressDL}>
                            {divs}
                        </div>
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
                <div className={classes.modal}>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.paper}>
                                <h4 className={classes.title}>{cuestionario.title}</h4>
                                <div className={classes.divScroll}>
                                    {cuestionario.questions.map((item, id) =>{
                                        return(
                                            <div className={classes.divQuestion}>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend" className={classes.titleQuestion}>{id+1}. {item.question}</FormLabel>
                                                    <RadioGroup className={classes.FormControlRadio} row>
                                                        {item.options.map((option, idx) =>{
                                                            return(
                                                                <FormControlLabel value={option} label={option}
                                                                    control={
                                                                        <Radio
                                                                            onClick={() => this.check(id, idx)}
                                                                            className={classes.radio}
                                                                            disableRipple
                                                                            color='default'
                                                                        />
                                                                    }
                                                                />
                                                            )
                                                        })}
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className={classes.modal}>
                                    <button disabled={!complete} type="button" className={complete ? classes.boton : classes.botonI} onClick={()=>this.close()}>
                                        Continuar
                                    </button>
                                </div>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </Row>
        )
    }
    getLogros(){
        const {classes} = this.props;
        return(
            <Col xs={12} className={classes.textLessonCenter}>
                <Col xs={12} className={classes.divTwo}>
                    <Col xs={6}>
                        <img src={trophy} className={classes.iconBig}/>
                    </Col>
                    <Col xs={6}>
                        <img src={flag} className={classes.iconBig}/>
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
