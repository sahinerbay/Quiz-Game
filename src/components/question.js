import React from 'react';
import PropTypes from 'prop-types';

export const Question = (props) => {
    return (
        <div>
            <p className="question-points">The Question's worth {props.value} points</p>
            <p className="question-question">{props.query}</p>
        </div>
    )
};

Question.propTypes = {
    value: PropTypes.number.isRequired,
    query: PropTypes.string.isRequired,
};