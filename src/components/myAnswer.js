import React from 'react';

export const MyAnswer = (props) => {
    
    console.log(props);
    return (
        <textarea onChange={props.onKeyUp} value={props.value}></textarea>
    )
}