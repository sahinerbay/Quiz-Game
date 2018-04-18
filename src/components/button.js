import React from 'react';
import Classes from './../containers/app.scss';

export const Button = (props) => {

    const clickHandler = () => {
        props.onClick();
    }

    return (
        <button className={Classes.button} onClick = {clickHandler}>
            {props.children}
        </button>
    )
}