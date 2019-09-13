import React from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const ProgressBar = (props) => {
    const {percent} = props;
     return(
      <div>
        {percent>=0 &&
        <Progress width={100}
          percent={percent}
          theme={{
            active: {
              symbol: percent + '%',
              trailColor: '#DD6618',
              color: '#e3e4e5'
            },
          }}
        />}
      </div>
     )
}

export default ProgressBar;
