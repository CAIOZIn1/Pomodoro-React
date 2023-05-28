import React from 'react';

interface Props {
    onclick: () => void;
    className?: string;
    text: string;
}

function Button(props: Props) {
    return (
        <button onClick={props.onclick} className={props.className}>
            {props.text}
        </button>
    );
}

export default Button;
