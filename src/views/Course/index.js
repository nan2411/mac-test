import React,{Component} from 'react';
import Loading from "./../../components/Loading";
import Lessons from "./../../components/Lessons";
import {Col, Row} from "react-flexbox-grid";
import {connect} from "react-redux";
import {getCourse, setLessons} from "./../../rdx/actions/coursesActions";

class Course extends Component{

    componentDidMount(){

        this.props.getCourse(this.props.match.params.slug);
        this.props.setLessons(false);

    }

    render(){
        let course = this.props.course;
        return (course?
            <Row>
                <Col xs={12}>
                    <Lessons course={course}/>
                </Col>
            </Row>:<Loading/>

            /*<Row>
                <Col md={12}>
                    <p>{course.description}</p>
                </Col>
                <Col md={12}>
                    <Lessons course={course}/>
                </Col>
            </Row>:<Loading/>*/
        );
    }
}

const stateToProps      = ({course}) => ({course});
const dispatchToProps   = (dispatch)=>({
    getCourse: (slug)   => dispatch(getCourse(slug)),
    setLessons: (value)   => dispatch(setLessons(value))
});

const conn = connect(stateToProps,dispatchToProps);

export default conn(Course);
