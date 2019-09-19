import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { orangeText } from "../../variables/styles";
import React,{Component} from 'react';

const CircularProgress = (props) => {
    const {percent, text} = props;
     return(
         <div>
        {/*<CircularProgressbar value={percent} text={`${text}%`}
            styles={buildStyles({
                textSize: '20px',
                textWeight: '600',
                pathTransition: 'none',
                pathColor: orangeText, //`rgba(62, 152, 199, ${percent / 100})`,
                textColor: orangeText,
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
            })}
        />*/}
        <CircularProgressbarWithChildren value={percent}
            styles={buildStyles({
                textSize: '20px',
                textWeight: '600',
                pathTransition: 'none',
                pathColor: orangeText,
                textColor: orangeText,
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
            })}>
            <div style={{ fontSize: 16, marginTop:'-20px', color:orangeText}}>
                <strong>{text}</strong>
            </div>
        </CircularProgressbarWithChildren>
        </div>
     )
}

export default CircularProgress;
