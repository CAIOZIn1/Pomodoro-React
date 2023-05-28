import React, { useState, useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';
import Button from './button';
import Timer from './timer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const initSong = require('../sounds/init-song.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const finishSong = require('../sounds/finish-song.mp3');

const audioStartWorking = new Audio(initSong);
const audioStopWorking = new Audio(finishSong);

interface Props {
    PomodoroTimer: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

function PomodoroTimer(props: Props) {
    const [mainTime, setMainTime] = useState(props.PomodoroTimer);
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);
    const [resting, setResting] = useState(false);

    useEffect(() => {
        if (working) document.body.classList.add('working');
        if (resting) document.body.classList.remove('working');
    }, [working]);

    useInterval(
        () => {
            setMainTime(mainTime - 1);
        },
        timeCounting ? 1000 : null,
    );

    const configureWork = () => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.PomodoroTimer);
        audioStartWorking.play();
    };

    const configureRest = (long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);

        if (long) setMainTime(props.longRestTime);
        else setMainTime(props.shortRestTime);

        audioStopWorking.play();
    };

    return (
        <div className="pomodoro">
            <h2>Status: Focado</h2>
            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button text="Iniciar" onClick={() => configureWork()}></Button>
                <Button
                    text="Descanso"
                    onClick={() => configureRest(false)}
                ></Button>
                <Button
                    className={!working && !resting ? 'hidden' : null}
                    text={timeCounting ? 'Pause' : 'Continuar'}
                    onClick={() => setTimeCounting(!timeCounting)}
                ></Button>
            </div>

            <div className="details">
                <p>Testando esse bagui</p>
                <p>Testando esse bagui</p>
                <p>Testando esse bagui</p>
            </div>
        </div>
    );
}

export default PomodoroTimer;
