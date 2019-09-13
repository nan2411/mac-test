import React, {Component} from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {Col, Row} from "react-flexbox-grid";

export default class Loading extends Component{
    render(){
        return (<Row>
            <Col xs={12}>
                <Row center="xs">
                    <Col xs={6}>
                        <CircularProgress color="secondary" />
                    </Col>
                </Row>
            </Col>
        </Row>);
    }
}
