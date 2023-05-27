import React from 'react';
import { useInterval } from '../hooks/use-interval';

interface Props{
  defaultPomodoroTimer: number;
}
function PomodoroTimer(props: Props) {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTimer);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return <div>Olá mundo! {mainTime}</div>;
}

export default PomodoroTimer;
