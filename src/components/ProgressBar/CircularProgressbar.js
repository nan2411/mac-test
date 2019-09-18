import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { orangeText } from "../../variables/styles";
import React,{Component} from 'react';

const CircularProgress = (props) => {
    const {percent, text} = props;
     return(
        <CircularProgressbar value={percent} text={text+' '}
            styles={buildStyles({
                textSize: '30px',
                textWeight: '600',
                pathTransition: 'none',
                pathColor: orangeText, //`rgba(62, 152, 199, ${percent / 100})`,
                textColor: orangeText,
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
            })}
        />
     )
}

export default CircularProgress;
