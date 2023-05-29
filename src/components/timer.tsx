import React from 'react';
import { secondsTime } from '../utils/seconds-to-time';

interface Props {
    mainTime: number;
}

function Timer(props: Props) {
    return <div className="timer">{secondsTime(props.mainTime)}</div>;
}

export default Timer;
