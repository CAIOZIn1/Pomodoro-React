import React from 'react';
import { secondsToMinutes } from '../utils/seconds-to-minutes';

interface Props {
    mainTime: number;
}

function Timer(props: Props) {
    return <div className="timer">{secondsToMinutes(props.mainTime)}</div>;
}

export default Timer;
