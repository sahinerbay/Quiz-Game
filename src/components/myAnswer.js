import React from 'react';

export const MyAnswer = (props) => <textarea onChange={props.onKeyUp} value={props.value}></textarea>