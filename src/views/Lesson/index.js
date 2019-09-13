import React,{Component} from 'react';
import Loading from "./../../components/Loading";
import {Col, Row} from "react-flexbox-grid";
import {Button, Divider, Paper, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {getLesson, viewLesson} from "./../../rdx/actions/coursesActions";

class Lesson extends Component{
    constructor(){
        super();
        this.viewLesson = this.viewLesson.bind(this);
    }

    componentDidMount(){
        this.props.getLesson(this.props.match.params.course,this.props.match.params.lesson);
    }

    viewLesson(){
        this.props.viewLesson(this.props.lesson.id);
    }

    render(){
        let lesson = this.props.lesson;

        return (!lesson? <Loading/> :
            <Row>

                <Col md={12}>

                    <Paper elevation={4} className="paper-main">

                        <Typography component="p" className="paper-content">
                            {
                                lesson.type_name === 'game'?
                                    <iframe src={lesson.content} frameborder="0" className="gameFrame" title={lesson.name}>Game content</iframe>
                                    :
                                    <div >{lesson.content}</div>
                            }

                        </Typography>
                        <Divider/>
                        <Col md={12} className="paper-actions">
                            <Row end="xs" middle="xs">
                                <Col md={4} className="no-padding">
                                    {!lesson.viewed?<Button color="secondary" onClick={this.viewLesson}>Marcar como visto</Button>:''}
                                </Col>
                            </Row>
                        </Col>
                    </Paper>
                </Col>
            </Row>);
    }
}

const stateToProps      = ({lesson}) => ({lesson});
const dispatchToProps   = (dispatch)=>({
    getLesson: (course,lesson)   => dispatch(getLesson(course,lesson)),
    viewLesson: (lesson) => dispatch(viewLesson(lesson)),
});

const conn = connect(stateToProps,dispatchToProps);

export default conn(Lesson);