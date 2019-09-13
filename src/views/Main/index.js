import React, { Component } from 'react';
import {Button} from "@material-ui/core";
import {Col, Grid, Row} from "react-flexbox-grid";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Link} from "react-router-dom";

class Main extends Component {

    render() {
        return (
            <Grid fluid>
                <Row middle="xs" center="xs"  className="center" style={{height:'100vh'}}>

                    <Col md={12} lg={10} >
                        <Carousel showThumbs={false} infiniteLoop emulateTouch showStatus={false} className="carousel-container" >
                            <div>
                                <video src={process.env.PUBLIC_URL+'/assets/videos/slider1.mp4'} className="video" autoPlay="true" controls="true"></video>
                                <p className="legend">Slider</p>
                            </div>
                            <div>
                                <img src={process.env.PUBLIC_URL+'/assets/images/slider2.jpg'} alt="slider2"/>

                                <p className="legend">Slider2</p>
                            </div>
                            <div>
                                <img src={process.env.PUBLIC_URL+'/assets/images/slider1.png'} alt="slider1"/>
                                <p className="legend">Slider3</p>
                            </div>
                        </Carousel>
                    </Col>
                    <Col md={12}>
                        <div className="App">
                            <Button component={Link} to={`${process.env.PUBLIC_URL}/login`} color="primary">
                                Iniciar
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Grid>

        );
    }
}

export default Main;
