import React from 'react';
import { useInterval } from '../hooks/use-interval';
import Button from './button';
import Timer from './timer';

interface Props {
    defaultPomodoroTimer: number;
}

function PomodoroTimer(props: Props) {
    const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTimer);

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, 1000);

    return (
        <div className="pomodoro">
            <h2>Status: Focado</h2>
            <Timer mainTime={mainTime} />
            <Button text="teste" onClick={() => console.log(1)}></Button>
        </div>
    );
}

export default PomodoroTimer;
