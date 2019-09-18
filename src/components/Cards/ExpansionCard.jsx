import React from "react";

import { withStyles, Card, CardContent, Typography,
    CardActions, Collapse, Avatar} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Col, Row} from "react-flexbox-grid";
import {Link} from "react-router-dom";


import {translate} from "react-i18next";
import expansionStyle from "../../variables/styles/expansionStyle";
import IconButton from "@material-ui/core/IconButton";
import ProgressBar from '../ProgressBar/ProgressBar';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';


class ExpansionCard extends React.Component{
    constructor(){
        super();
        this.state = {
            expanded:false,
            expandedLesson:false,
            expandedAchivmentn:false,
            expandedGame:false,
            course:{},
            lecciones:[
                {id: 1, name: "Presencia"},
                {id: 2, name: "Afirmaciones"},
                {id: 3, name: "Gratitud"},
                {id: 4, name: "Compasión"},
                {id: 5, name: "Aceptación"},
                {id: 6, name: "Sentido"},
                {id: 7, name: "Perdon"},
                {id: 8, name: "Relaciones"},
                {id: 9, name: "Mente y Cuerpo"},
                {id: 10, name: "Habitos de Grandeza"},
            ],
            juegos:[
                {id: 1, name: "Entrenar el sentido de la gratitud", startActive: 1, start:2},
                {id: 2, name: "Entrégate a los demás", startActive: 0, start:2},
                {id: 3, name: "Entrenar el sentido de la aceptación", startActive: 0, start:3},
                {id: 4, name: "Entrena el sentido profundo", startActive: 0, start:1},
                {id: 5, name: "Entrenar el perdón", startActive: 0, start:2},
                {id: 6, name: "Cultivando las relaciones", startActive:0, start:3},
                {id: 7, name: "Las practicas de la mente y del cuerpo", startActive: 0, start:2},
                {id: 8, name: "Habitos de grandeza", startActive: 0, start:2},
                {id: 9, name: "Mente y Cuerpo", startActive: 0, start:1},
                {id: 10, name: "Habitos de Grandeza", startActive: 0, start:1},
            ],
            logros:[
                {image:'/assets/images/icons/sentido.svg', title:'Sentido', status:true},
                {image:'/assets/images/icons/relaciones.svg', title:'Relaciones', status:true},
                {image:'/assets/images/icons/presencia.svg', title:'Presencia', status:false},
                {image:'/assets/images/icons/perdon.svg', title:'Perdón', status:false},
                {image:'/assets/images/icons/mente.svg', title:'Mente-Cuerpo', status:false},
                {image:'/assets/images/icons/habitos.svg', title:'Habitos de Grandeza', status:false},
                {image:'/assets/images/icons/gratitud.svg', title:'Gratitud', status:false},
                {image:'/assets/images/icons/compasion.svg', title:'Compasión', status:false},
                {image:'/assets/images/icons/afirmaciones.svg', title:'Afirmaciones', status:false},
                {image:'/assets/images/icons/aceptacion.svg', title:'Aceptación', status:false},
            ]
        }
    }
    componentDidMount(){
        let course={
            id: 1,
            slug: "presencia-dJg2N",
            name: "Presencia",
            advance: 2,
            description: "No reclames el pasado y no te preocupes por el futuro. Aprende a estar presente, para que tu vida no pase desapercibida, sé consciente de que tu vida es importante y que estás rodeado de personas y criaturas que amas. En este curso vamos a aprender a tomar el control de nuestra vida y a encontrar la alegría de estar presentes.",
            id: 1,
            image: "http://localhost:8000/storage/courses/YcXoQoJPyYaScxm5nSzNzQDXUZMqt2VgMcfK9Wyn.jpeg",
            is_free: true,
            lessons: 2,
            locked: true,
            name: "Presencia",
            slug: "presencia-dJg2N",
            viewed: true,
        }
        this.setState({course})

    }
    handleExpandClick(type) {
        let { expandedGame } = this.state;

        if (type=='lesson'){
            let { expandedLesson } = this.state;
            this.setState({expandedLesson: !expandedLesson});
        }else if (type=='game'){
            //let { expandedGame } = this.state;
            expandedGame =!expandedGame;
            this.setState({expandedGame: expandedGame});
        }else{
            let { expandedAchivmentn } = this.state;
            this.setState({expandedAchivmentn: !expandedAchivmentn});
        }
        if(expandedGame){
            localStorage.setItem('linkGame', true)
            localStorage.setItem('linkGameUrl', "https://playcanv.as/p/bWxOvull/")
        }else{
             localStorage.setItem('linkGame', false)
             localStorage.setItem('linkGameUrl', null)
        }

        // let { expanded } = this.state;
        // this.setState({expanded: !expanded});
    }
    render(){
        let { course } = this.state;
        let data1 = {
            title:'Lecciones',
            expanded:this.state.expandedLesson,
            type:'lesson',
            link:'Ver lecciones',
            icon:'/assets/images/icons/book.svg',
            linkURL:{pathname:`${process.env.PUBLIC_URL}/curso/${course.slug}`,params:course},
            data: {
                title:'Lección de la semana',
                name:'Bajarle al estres y entrenar la resilencia',
                description:'Entrenar el sentido de la felicidad',
                titleAchivment:'Lección anterior',
                percentAchivment:'80',
                id:'1' ,

            }
        }
        let data2 = {
            title:'Logros',
            expanded:this.state.expandedLesson,
            type:'achivmentn',
            link:'Ver logros',
            icon:'/assets/images/icons/trophy.svg',
            data: {
                title:'Ultimo logro',
                name:'Sentido',
                description:'Relaciones',
                titleAchivment:'Próximo logro',
                percentAchivment:'25',
                id:'1' ,
            }
        }
        let data3 = {
            title:'Juegos',
            expanded:this.state.expandedLesson,
            type:'game',
            link:'Ver proceso',
            content: "https://playcanv.as/p/bWxOvull/",
            icon:'/assets/images/icons/flag.svg',
            linkURL:{pathname:`${process.env.PUBLIC_URL}/curso/${course.slug}`,params:course},
            data: {
                title:'Ultimo juego completado',
                name:'Bajarle al estres y entrenar la resilencia',
                description:'Entrenar el sentido de la felicidad',
                titleAchivment:'Juego en curso',
                percentAchivment:'50',
                id:'1' ,
            }
        }

        return(
            <Row>
                <Col xs={12} sm={6} md={4}>
                    {this.item(data1)}
                </Col>
                <Col xs={12} sm={6} md={4}>
                    {this.item(data2)}
                </Col>
                <Col xs={12} sm={6} md={4}>
                    {this.item(data3)}
                </Col>
            </Row>
        )
    }

    item(item){
        let { classes } = this.props;
        let { course, lecciones} = this.state;
        let expanded=''
        if (item.type=='lesson'){
            expanded = this.state.expandedLesson;
        }else if (item.type=='game'){
            expanded = this.state.expandedGame;
        }else{
            expanded = this.state.expandedAchivmentn;
        }
        return (
            <Col>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.title}
                </Typography>
                <Card>
                  <CardContent>
                    {this.header(item.data, item.icon)}
                  </CardContent>
                  <CardActions disableSpacing>
                      <Col xs={8}>
                        <Typography className={classes.actionLesson}>{item.data.description}</Typography>
                      </Col>
                      <Col xs={4}>
                        { !expanded ?
                            <IconButton
                              onClick={() => this.handleExpandClick(item.type)}
                              aria-expanded={expanded}
                              aria-label="show more"
                            >
                            <Typography className={classes.link}>
                              {item.link}
                              </Typography>
                            </IconButton>
                            :
                            item.linkURL ?
                            <Link to={item.linkURL}>
                                <Typography className={classes.link}>
                                  Ir a la lección
                                </Typography>
                            </Link>
                            : (item.type == 'game') ?
                            <Link to={item.linkURL}>
                                <Typography className={classes.link}>
                                  Ir al juego
                                </Typography>
                            </Link>
                            : ''
                        }
                    </Col>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {
                        (item.type=='lesson') ? this.lecciones(lecciones) :
                        (item.type=='game') ? this.juegos(lecciones) : this.logros(lecciones)
                        }
                      <Col xsOffset={10} xs={2} className={classes.divIconExpand}>
                          <IconButton
                              onClick={() => this.handleExpandClick(item.type)}
                              aria-expanded={expanded}
                              aria-label="show more"
                              className={classes.divExpand}
                          >
                              <ExpandLessIcon className={classes.expandLessIcon} />
                          </IconButton>
                      </Col>
                    </CardContent>
                  </Collapse>
                </Card>
            </Col>
        )
    }

    juegos(){
        let { classes } = this.props;
        let { juegos } = this.state;
        return(
            juegos.map((item, id) =>{
                let estrellas=[];
                for (let i = 0; i < item.startActive; i++) {
                    estrellas.push(
                        <img alt="start" src="/assets/images/icons/start.svg" className={classes.iconosStart}/>
                    )
                }
                for (let i = 0; i < (item.start - item.startActive); i++) {
                    estrellas.push(
                        <img alt="startI" src="/assets/images/icons/startIn.svg" className={classes.iconosStart}/>
                    )
                }

                return(
                    <Row className={classes.div2}>
                        <Col xs={1} className={classes.divIconosExpand} >
                            <img alt="book" src="/assets/images/icons/flagI.svg" className={classes.iconosJuego}/>
                        </Col>
                        <Col xs={11} className={classes.divStart}>
                            <Typography className={classes.cardDescriptionExpand}>{item.name}</Typography>
                            <Col xs={12} >
                                {estrellas}
                            </Col>
                        </Col>
                    </Row>
                )

            })
        )
    }

    logros(){
        let { classes } = this.props;
        let { logros } = this.state;
        let items = logros.map((item, id) => {
                return(
                    <Col xs={3} className={item.status ? classes.iconoLogroDiv: classes.iconoLogroDivInactive}>
                        <img alt="icon" src={item.image} className={classes.iconoLogro}/>{item.title}
                    </Col>
                )
            })
        return(
            <Row>
                {items}
            </Row>
        )
    }

    lecciones(lecciones){
        let { classes } = this.props;
        return(
            lecciones.map((lesson, id) =>{
                return(
                    <Row className={classes.div2}>
                        <Col xs={2} className={classes.divIconosExpand} >
                            <img alt="book" src="/assets/images/icons/openBook.svg" className={classes.iconos}/>
                        </Col>
                        <Col xs={10} >
                            <Typography className={classes.cardDescriptionExpand}>{lesson.name}</Typography>
                        </Col>
                    </Row>
                )

            })
        )
    }

    header(data, icon){
        let { classes } = this.props;
        return(
            <Row>
                <Row className={classes.div1}>
                    <Col xs={3} className={classes.divIconos} >
                        <img alt="icon" src={icon} className={classes.iconos}/>
                    </Col>
                    <Col xs={9} >
                        <Typography className={classes.cardCategory}>{data.title}</Typography>
                        <Typography className={classes.cardDescription}>{data.name}</Typography>
                    </Col>
                </Row>
                <Col xs={12} className={classes.divLesson}>
                    <Col xs={7}>
                      <Typography component="p" className={classes.cardCategory}>
                        {data.titleAchivment}
                      </Typography>
                    </Col>
                    <Col item xs={5}>
                      <ProgressBar percent={data.percentAchivment}/>
                    </Col>
                </Col>
            </Row>
        )
    }
}
export default withStyles(expansionStyle)(translate("translations")(ExpansionCard));
