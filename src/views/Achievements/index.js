import React,{Component} from 'react';
import Loading from "../../components/Loading";
import {Col, Row} from "react-flexbox-grid";
import {Avatar, Grid, Grow, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {getAchievements} from "../../rdx/actions/achievementActions";
import ItemGrid from "../../components/Grid/ItemGrid";
import RegularCard from "../../components/Cards/RegularCard";


class Achievements extends Component{

    componentDidMount(){
        this.props.getAchievements();
    }

    getAchievements(){
        let achievements    = [];


        this.props.achievements.forEach((achievement,idx)=>{
            achievements.push(
                <Col lg={2} md={3} xs={12} sm={12} key={idx}>

                    <Grow in={true} style={{ transformOrigin: '0 0 0' }}
                          {...({ timeout: 1000+(idx*200) })}>

                        <Grid container>

                            <ItemGrid xs={12} sm={12} md={12}>
                                <RegularCard
                                    avatar={<Avatar src={achievement.image} className={achievement.locked?'image-disabled':''}/>}
                                    headerColor={achievement.locked?'gray':'orange'}
                                    cardSubtitle={achievement.name}

                                    content={
                                        <Typography>
                                            {achievement.description}
                                        </Typography>
                                    }
                                />
                            </ItemGrid>
                        </Grid>
                    </Grow>
                </Col>
            );
        });

        return achievements;

    }

    render(){
        return (<Row>
            {this.props.achievements?this.getAchievements():<Loading/>}
        </Row>);
    }
}

const stateToProps      = ({achievements}) => ({achievements});
const dispatchToProps   = (dispatch)=>({//custom props
    getAchievements: () => dispatch(getAchievements())
});

const conn = connect(stateToProps,dispatchToProps);

export default conn(Achievements);