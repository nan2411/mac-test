import React, {Component} from 'react';
import {Col, Row} from "react-flexbox-grid";
import {Button, Card, CardContent, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {translate} from "react-i18next";
//
class Settings extends Component{

    constructor(){
        super();
        this.state = {bgColor:'#666',menuColor:'#666',imageBg:''}
    }



    setBgMenuImage(e){
        let target = e.target;
    }

    setBgImage(e){
        let target = e.target;
    }

    render(){
        const {t} = this.props;
        return (
            <Row className="big-margin-top" >
                <Col xs={12}>
                    <Row center="xs">
                        <Col md={4} className="default-margin-top">
                            <Card>
                                <CardContent>
                                    <Typography variant="headline" component="h3">
                                        {t('images')}
                                    </Typography>
                                    <Button color="secondary" variant="contained"
                                            component="label" fullWidth className="default-margin-top">
                                        {t('set_background_menu')}
                                        <input type="file" name="bg-image" className="hidden" accept="image/*" onChange={(e)=> this.setBgMenuImage(e)}/>
                                    </Button>

                                    <Button color="secondary" variant="contained"
                                            component="label" fullWidth className="default-margin-top">
                                        {t('set_background_image')}
                                        <input type="file" name="bg-image" className="hidden" accept="image/*" onChange={(e)=> this.setBgImage(e)}/>
                                    </Button>
                                </CardContent>
                            </Card>
                        </Col>
                    </Row>
                </Col>

            </Row>);
    }
}

const stateToProps      = ({menuColor,headerColor}) => ({menuColor,headerColor});

const dispatchToProps   = (dispatch)=>({

});

const conn = connect(stateToProps,dispatchToProps);

export default conn(translate("translations")(Settings));
