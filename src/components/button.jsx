import React from 'react';

interface Props {
    onClick: () => void;
    className?: string;
    text: string;
}

function Button(props: Props) {
    return (
        <button onClick={props.onClick} className={props.className}>
            {props.text}
        </button>
    );
}

export default Button;
