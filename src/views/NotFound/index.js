import React,{Component} from 'react';
import {Col, Grid, Row} from "react-flexbox-grid";
import {Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

export default class NotFound extends Component{
    constructor(){
        super();
        document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL+'/assets/images/login-bg.jpg'})`;

    }

    render(){
        return(
            <Grid fluid>
                <Row middle="xs" center="xs" style={{height: "100vh"}} className="center">
                    <Col md={3}>
                        <h1 className="not-found-header">404</h1>

                        <Typography>La pagina que buscas no existe</Typography>
                        <Button component={Link} to={`${process.env.PUBLIC_URL}/login`}  color="primary">
                            Regresar
                        </Button>
                    </Col>
                </Row>
            </Grid>
        );
    }
}