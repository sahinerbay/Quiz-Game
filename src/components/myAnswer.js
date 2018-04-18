import React from 'react';

export const MyAnswer = (props) => {
    
    const handleChange = (e) => {
        const answer = e.target.value;
        props.onKeyUp(answer);
    }
    
    return (
        <textarea onKeyUp={handleChange} ></textarea>
    )
}