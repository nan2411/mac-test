import React,{Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {setAchievement} from "../../rdx/actions/defaultActions";
import {Col, Row} from "react-flexbox-grid";
class Achievement extends Component{
    constructor(){
        super();

        this.resetAchievement = this.resetAchievement.bind(this);
    }

    resetAchievement(){
        this.props.setAchievement(false);
    }

    render(){
        let achievement = this.props.achievement;

        return (
            <Dialog
                open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Nuevo logro desbloqueado!!'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Row center="xs">
                            <Col md={12}>
                                <img src={achievement.image} alt={achievement.name} className="achievement-success"/>
                            </Col>
                            <Col md={12}>
                                {achievement.name}
                            </Col>
                            <Col md={12}>
                                {achievement.description}
                            </Col>
                        </Row>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button component={Link} to={`${process.env.PUBLIC_URL}/logros`} autoFocus color={"secondary"} onClick={this.resetAchievement}>
                        Logros
                    </Button>
                    <Button autoFocus color={"secondary"} onClick={this.resetAchievement}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
const dispatchToProps   = (dispatch)=>({
    setAchievement: (value)   => dispatch(setAchievement(value))
});

const conn = connect(null,dispatchToProps);

export default withRouter(conn(Achievement));