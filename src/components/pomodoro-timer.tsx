import React, { useState, useEffect, useCallback } from 'react';
import { useInterval } from '../hooks/use-interval';
import Button from './button';
import Timer from './timer';
import { secondsToTime } from '../utils/seconds-to-time';

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
    const [cyclesQtdManager, setCyclesQtdManager] = useState(
        new Array(props.cycles - 1).fill(true),
    );

    const [completedCycles, setCompletedCycles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

    useInterval(
        () => {
            setMainTime(mainTime - 1);
            if (working) setFullWorkingTime(fullWorkingTime + 1);
        },
        timeCounting ? 1000 : null,
    );

    const configureWork = useCallback(() => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.PomodoroTimer);
        audioStartWorking.play();
    }, [setWorking, setWorking, setResting, setMainTime, props.PomodoroTimer]);

    const configureRest = useCallback(
        (long: boolean) => {
            setTimeCounting(true);
            setWorking(false);
            setResting(true);

            if (long) setMainTime(props.longRestTime);
            else setMainTime(props.shortRestTime);

            audioStopWorking.play();
        },
        [
            setTimeCounting,
            setWorking,
            setResting,
            setMainTime,
            props.longRestTime,
            props.shortRestTime,
        ],
    );

    useEffect(() => {
        if (working) document.body.classList.add('working');
        if (resting) document.body.classList.remove('working');

        if (mainTime > 0) return;

        if (working && cyclesQtdManager.length > 0) {
            configureRest(false);
            cyclesQtdManager.pop();
        } else if (working && cyclesQtdManager.length <= 0) {
            configureRest(false);
            new Array(props.cycles - 1).fill(true);
            setCompletedCycles(completedCycles + 1);
        }

        if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
        if (resting) configureWork();
    }, [
        working,
        resting,
        mainTime,
        cyclesQtdManager,
        numberOfPomodoros,
        completedCycles,
        configureRest,
        setCyclesQtdManager,
        configureWork,
        props.cycles,
    ]);

    return (
        <div className="pomodoro">
            <h2>Status: {working ? 'Focado' : 'Descanso'}</h2>
            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button text="Iniciar" onClick={() => configureWork()}></Button>
                <Button
                    text="Descanso"
                    onClick={() => configureRest(false)}
                ></Button>
                <Button
                    className={!working && !resting ? 'hidden' : ''}
                    text={timeCounting ? 'Pause' : 'Continuar'}
                    onClick={() => setTimeCounting(!timeCounting)}
                ></Button>
            </div>

            <div className="details">
                <p>Ciclos completos: {completedCycles}</p>
                <p>Tempo total: {secondsToTime(fullWorkingTime)}</p>
                <p>Número de pomodoros: {numberOfPomodoros}</p>
            </div>
        </div>
    );
}

export default PomodoroTimer;
